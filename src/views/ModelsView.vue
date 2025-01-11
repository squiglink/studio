<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { modelsApi } from '@/utils/api/models'

import type { APIModel, APIModels } from '@/utils/api/models'

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'
import NetworkError from '@/components/NetworkError.vue'

const tableColumns = [
  { name: 'Name', key: 'name', path: '/models/' },
  { name: 'Brand', nestedKey: ['brand', 'name'] },
  { name: 'Created', key: 'createdAt' },
  { name: 'Last modified', key: 'updatedAt' },
]

const models = ref([] as APIModel[])
const page = ref(1)
const pageCount = ref(1)
const loading = ref(false)
const fetchFailed = ref(false)

const fetchModels = async () => {
  loading.value = true
  const response = await modelsApi.all(page.value).catch(() => {
    fetchFailed.value = true
    loading.value = false

    return <APIModels>{
      page: [],
      page_count: 0,
    }
  })

  models.value = response.page
  pageCount.value = response.page_count
  loading.value = false
}

onMounted(() => {
  console.log('fetching models')
  fetchModels()
})
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Models</template>

    <template #content>
      <Loader v-if="loading" />
      <NetworkError v-else-if="fetchFailed"/>
      <Table v-else v-model="models" search-url="/models" :columns="tableColumns" :selectable-rows="false">
        <template #actions>
          <!-- <fwb-button color="red" size="xs">
            Delete selected
            <template #suffix>
              <Icon icon="flowbite:minus-outline" width="24" height="24" />
            </template>
          </fwb-button> -->
          <fwb-button color="default" size="md">
            Add new model
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="16" height="16" />
            </template>
          </fwb-button>
        </template>
      </Table>
    </template>
  </MainLayout>
</template>
