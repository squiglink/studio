<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { databasesApi } from '@/utils/api/databases'

import type { APIDatabase, APIDatabases } from '@/utils/api/databases'

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'
import NetworkError from '@/components/NetworkError.vue'

const route = useRoute()

const tableColumns = [
  { name: 'Kind', key: 'kind', path: '/databases/' },
  { name: 'Path', key: 'path' },
  { name: 'Created', key: 'createdAt' },
  { name: 'Last modified', key: 'updatedAt' },
]

const databases = ref([] as APIDatabase[])
const page = computed(() => (route.query.page ? Number(route.query.page) : 1))
const pageCount = ref(1)
const loading = ref(false)
const fetchFailed = ref(false)

const fetchDatabases = async () => {
  loading.value = true
  try {
    const response = await databasesApi.all(page.value)
    databases.value = response.page
    pageCount.value = response.page_count
  } catch (error) {
    fetchFailed.value = true
    loading.value = false
  } finally {
    loading.value = false
  }
}

watch([page], () => {
  fetchDatabases()
})

onMounted(() => {
  fetchDatabases()
})
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Databases</template>

    <template #content>
      <Loader v-if="loading" />
      <NetworkError v-else-if="fetchFailed" />
      <Table
        v-else
        v-model="databases"
        v-model:current-page="page"
        search-url="/databases"
        :columns="tableColumns"
        :data="databases"
        :page-count="pageCount"
      />
    </template>
  </MainLayout>
</template>
