<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { databasesApi } from '@/utils/api/databases'

import type { APIDatabase } from '@/utils/api/databases'

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'

const tableColumns = [
  { name: 'Kind', key: 'kind', path: '/databases/' },
  { name: 'Path', key: 'path' },
  // { name: 'Created At', key: 'createdAt' },
  // { name: 'Last modified', key: 'updatedAt' },
]

let databases = ref([] as APIDatabase[]);
let page = ref(1);
let pageCount = ref(1);

const fetchBrands = async () => {
  databases.value = (await databasesApi.all(page.value)).page;
  pageCount.value = (await databasesApi.all(page.value)).page_count;
}

onMounted(() => {
  fetchBrands();
})
</script>

<template>
  <MainLayout>
    <template #header-text>Databases</template>

    <template #content>
      <Table :columns="tableColumns" :data="databases" />
    </template>
  </MainLayout>
</template>
