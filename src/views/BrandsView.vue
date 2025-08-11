<script setup lang="ts">
import { brandsApi } from '@/utils/api/brands'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import type { APIBrand } from '@/utils/api/brands'

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import NetworkError from '@/components/NetworkError.vue'
import SideModal from '@/components/SideModal.vue'
import Form from '@/components/Form.vue'

const route = useRoute()

const tableColumns = [
  { name: 'Brand', key: 'name', path: '/brands/' },
  { name: 'Models', key: 'model_count' },
  { name: 'Created', key: 'created_at' },
  { name: 'Last modified', key: 'updated_at' },
]

const initialBrandFormState: Brand = {
  name: '',
  errors: [],
}

const brands = ref([] as APIBrand[])
const pageCount = ref(1)
const page = computed(() => (route.query.page ? Number(route.query.page) : 1))
const searchQuery = computed(() => (route.query.query ? String(route.query.query) : ''))
const loading = ref(false)
const fetchFailed = ref(false)
const createModalShown = ref(false)
const newBrandForm = ref<Brand>(initialBrandFormState)

const fetchBrands = async () => {
  loading.value = true
  try {
    const response = await brandsApi.all(page.value, searchQuery.value)
    brands.value = response.page
    pageCount.value = response.page_count
  } catch (error) {
    fetchFailed.value = true
    loading.value = false
  } finally {
    loading.value = false
  }
}

const convertToAPIBrand = (form: Brand): APIBrand => ({
  name: form.name,
})

const createBrand = async () => {
  loading.value = true
  try {
    const apiBrand: APIBrand = convertToAPIBrand(newBrandForm.value)
    await brandsApi.create(apiBrand)

    newBrandForm.value = initialBrandFormState
    createModalShown.value = false
    fetchBrands()
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const openCreateModal = () => {
  createModalShown.value = true
}

const closeCreateModal = () => {
  createModalShown.value = false
}

watch([page, searchQuery], () => {
  fetchBrands()
})

onMounted(() => {
  fetchBrands()
})
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Brands</template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <Table
        v-else
        v-model="brands"
        v-model:current-page="page"
        v-model:loading="loading"
        :enable-search="true"
        :columns="tableColumns"
        :selectable-rows="false"
        :page-count="pageCount"
      >
        <template #actions>
          <fwb-button color="default" size="md" @click="openCreateModal">
            Add new brand
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="16" height="16" />
            </template>
          </fwb-button>
        </template>
      </Table>

      <SideModal v-model="createModalShown">
        <template #header-text>Add new brand</template>

        <template #content>
          <Form v-model="newBrandForm.errors">
            <template #content>
              <fwb-input
                label="Name"
                label-class="text-white"
                placeholder="(required)"
                size="md"
                v-model="newBrandForm.name"
                required
              />
            </template>

            <template #footer>
              <fwb-button color="alternative" size="md" @click="closeCreateModal">
                Cancel
              </fwb-button>
              <fwb-button color="default" size="md" @click="createBrand">Save</fwb-button>
            </template>
          </Form>
        </template>
      </SideModal>
    </template>
  </MainLayout>
</template>
