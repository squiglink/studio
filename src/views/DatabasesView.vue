<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { databasesApi } from '@/utils/api/databases'

import type { APIDatabase, APIDatabases } from '@/utils/api/databases'

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'

const tableColumns = [
  { name: 'Kind', key: 'kind', path: '/databases/' },
  { name: 'Path', key: 'path' },
  { name: 'Created At', key: 'createdAt' },
  { name: 'Last modified', key: 'updatedAt' },
]

const databases = ref([] as APIDatabase[])
const page = ref(1)
const pageCount = ref(1)
const loading = ref(false)
const fetchFailed = ref(false)

const fetchBrands = async () => {
  loading.value = true
  const response = await databasesApi.all(page.value).catch(() => {
    fetchFailed.value = true
    loading.value = false

    return <APIDatabases>{
      page: [],
      page_count: 0,
    }
  })

  databases.value = response.page
  pageCount.value = response.page_count
  loading.value = false
}

onMounted(() => {
  fetchBrands()
})
</script>

<template>
  <MainLayout>
    <template #header-text>Databases</template>

    <template #content>
      <Loader v-if="loading" />
      <div v-else-if="fetchFailed" class="flex text-white justify-center items-center p-4">
        Failed to load databases
      </div>
      <Table v-else :columns="tableColumns" :data="databases" />
    </template>
  </MainLayout>
</template>
