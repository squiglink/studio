<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { modelsApi } from '@/utils/api/models'
import { brandsApi } from '@/utils/api/brands'

import type { APIModel } from '@/utils/api/models'

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import NetworkError from '@/components/NetworkError.vue'
import SideModal from '@/components/SideModal.vue'
import Form from '@/components/Form.vue'

const route = useRoute()

const tableColumns = [
  { name: 'Name', key: 'name', path: '/models/' },
  { name: 'Brand', nestedKey: ['brand', 'name'] },
  { name: 'Created', key: 'created_at' },
  { name: 'Last modified', key: 'updated_at' },
]

const models = ref([] as APIModel[])
const page = computed(() => (route.query.page ? Number(route.query.page) : 1))
const searchQuery = computed(() => (route.query.query ? String(route.query.query) : ''))
const pageCount = ref(1)
const loading = ref(false)
const fetchFailed = ref(false)
const createModalShown = ref(false)
const brands = ref([{ value: 1, name: '123' }])
const newModel = ref<Model>({
  name: '',
  brandId: 0,
  evaluation: {
    shopUrl: null,
    reviewUrl: null,
    reviewScore: null,
    measurements: [],
  },
  errors: [],
})

const fetchModels = async () => {
  loading.value = true
  try {
    const response = await modelsApi.all(page.value, searchQuery.value)
    models.value = response.page
    pageCount.value = response.page_count
  } catch (error) {
    fetchFailed.value = true
    loading.value = false
  } finally {
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
  fetchModels()
})

onMounted(() => {
  fetchModels()
})
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Models</template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <Table
        v-else
        v-model="models"
        v-model:current-page="page"
        v-model:loading="loading"
        :enable-search="true"
        :columns="tableColumns"
        :selectable-rows="false"
        :page-count="pageCount"
      >
        <template #actions>
          <!-- <fwb-button color="red" size="xs">
            Delete selected
            <template #suffix>
              <Icon icon="flowbite:minus-outline" width="24" height="24" />
            </template>
          </fwb-button> -->
          <fwb-button color="default" size="md" @click="openCreateModal">
            Add new model
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="16" height="16" />
            </template>
          </fwb-button>
        </template>
      </Table>

      <SideModal v-model="createModalShown">
        <template #header-text>Add new model</template>

        <template #content>
          <Form v-model="newModel.errors">
            <template #content>
              <fwb-heading tag="h6" class="font-normal">Model</fwb-heading>
              <fwb-input label="Name" placeholder="(required)" size="md" v-model="newModel.name" />
              <fwb-select v-model="newModel.brandId" :options="brands" label="Brand" />

              <fwb-heading tag="h6" class="font-normal">Evaluation</fwb-heading>
              <fwb-input
                label="Review URL"
                placeholder="(optional)"
                size="md"
                v-model="newModel.evaluation.reviewUrl"
              />
              <fwb-input
                label="Review score"
                placeholder="(optional)"
                size="md"
                v-model="newModel.evaluation.reviewScore"
              />
              <fwb-input
                label="Shop URL"
                placeholder="(optional)"
                size="md"
                v-model="newModel.evaluation.shopUrl"
              />
            </template>

            <template #footer>
              <fwb-button color="alternative" size="md" @click="closeCreateModal"
                >Cancel</fwb-button
              >
              <fwb-button color="default" size="md">Save</fwb-button>
            </template>
          </Form>
        </template>
      </SideModal>
    </template>
  </MainLayout>
</template>
