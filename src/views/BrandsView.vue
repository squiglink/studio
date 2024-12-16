<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'

const tableColumns = [
  { name: 'Brand', key: 'brand', path: '/brands/' },
  { name: 'Models', key: 'model_count' },
  { name: 'Created At', key: 'created_at' },
  { name: 'Last modified', key: 'updated_at' },
]

const apiPayload = [
  {
    id: 1,
    brand: '7Hz',
    model_count: 5,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 2,
    brand: '64 Audio',
    model_count: 10,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 3,
    brand: 'Aful Acoustics',
    model_count: 5,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 4,
    brand: 'Apple',
    model_count: 2,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 5,
    brand: 'Campfire Audio',
    model_count: 4,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 6,
    brand: 'Dunu',
    model_count: 21,
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
]
</script>

<template>
  <MainLayout>
    <template #header-text>Brands</template>

    <template #content>
      <Table :columns="tableColumns" :data="apiPayload" />
    </template>
  </MainLayout>
</template>
