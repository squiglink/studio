<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'

const tableColumns = [
  { name: 'Model', key: 'model', path: '/models/' },
  { name: 'Brand', key: 'brand.name' },
  { name: 'Created At', key: 'created_at' },
  { name: 'Last modified', key: 'updated_at' },
]

const apiPayload = [
  {
    id: 1,
    model: 'Dioko',
    brand: {
      name: '7Hz',
      id: 1,
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 2,
    model: 'U4s',
    brand: {
      name: '64 Audio',
      id: 2,
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 3,
    model: 'Performer 5+2',
    brand: {
      name: 'Aful Acoustics',
      id: 3,
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 4,
    model: 'AirPods Pro',
    brand: {
      name: 'Apple',
      id: 4,
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 5,
    model: 'Andromeda',
    brand: {
      name: 'Campfire Audio',
      id: 5,
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 6,
    model: 'Moon Rover',
    brand: {
      name: 'Campfire Audio',
      id: 5,
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 7,
    model: 'Zen Pro',
    brand: {
      name: 'Dunu',
      id: 6,
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
]
</script>

<template>
  <MainLayout>
    <template #header-text>Models</template>

    <template #content>
      <Table :columns="tableColumns" :data="apiPayload" />
    </template>
  </MainLayout>
</template>
