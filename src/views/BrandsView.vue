<script setup lang="ts">
import { brandsApi } from '@/utils/api/brands'
import { ref, onMounted } from 'vue'

import type { APIBrand, APIBrands } from '@/utils/api/brands'

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'
import NetworkError from '@/components/NetworkError.vue'

const tableColumns = [
  { name: 'Brand', key: 'name', path: '/brands/' },
  { name: 'Models', key: 'model_count' },
  { name: 'Created At', key: 'createdAt' },
  { name: 'Last modified', key: 'updatedAt' },
]

const brands = ref([] as APIBrand[])
const page = ref(1)
const pageCount = ref(1)
const loading = ref(false)
const fetchFailed = ref(false)

const fetchBrands = async () => {
  loading.value = true
  const response = await brandsApi.all(page.value).catch(() => {
    fetchFailed.value = true
    loading.value = false

    return <APIBrands>{
      page: [],
      page_count: 0,
    }
  })

  brands.value = response.page
  pageCount.value = response.page_count
  loading.value = false
}

onMounted(() => {
  fetchBrands()
})
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Brands</template>

    <template #content>
      <Loader v-if="loading" />
      <NetworkError v-else-if="fetchFailed"/>
      <Table v-else :columns="tableColumns" :data="brands" :selectable-rows="false">
        <template #actions>
          <fwb-button color="red" size="xs">
            Delete selected
            <template #suffix>
              <Icon icon="flowbite:minus-outline" width="24" height="24" />
            </template>
          </fwb-button>
          <fwb-button color="default" size="xs">
            Add new brand
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="24" height="24" />
            </template>
          </fwb-button>
        </template>
      </Table>
    </template>
  </MainLayout>
</template>
