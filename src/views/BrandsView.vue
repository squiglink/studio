<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import { objectToCamel } from 'ts-case-convert'

const tableColumns = [
  { name: 'Brand', key: 'name', path: '/brands/' },
  { name: 'Models', key: 'modelCount' },
  { name: 'Created At', key: 'createdAt' },
  { name: 'Last modified', key: 'updatedAt' },
]

const apiPayload = [
  {
    id: 1,
    name: '7Hz',
    model_count: 5,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 2,
    name: '64 Audio',
    model_count: 10,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 3,
    name: 'Aful Acoustics',
    model_count: 5,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 4,
    name: 'Apple',
    model_count: 2,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 5,
    name: 'Campfire Audio',
    model_count: 4,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 6,
    name: 'Dunu',
    model_count: 21,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
]

const brandArray = apiPayload.map((item) => objectToCamel(item)) as BrandWithModelCount[]
</script>

<template>
  <MainLayout>
    <template #header-text>Brands</template>

    <template #content>
      <Table :columns="tableColumns" :data="brandArray" />
    </template>
  </MainLayout>
</template>
