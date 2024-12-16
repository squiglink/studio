<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'

const tableColumns = [
  { name: 'Type', key: 'type', path: '/databases/' },
  { name: 'Path', key: 'path' },
  { name: 'Created At', key: 'created_at' },
  { name: 'Last modified', key: 'updated_at' },
]

const apiPayload = [
  {
    id: 1,
    type: 'IEMs',
    path: '/',
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 2,
    type: 'Headphones',
    path: '/headphones/',
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 3,
    type: 'Earbuds',
    path: '/earbuds/',
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
]
</script>

<template>
  <MainLayout>
    <template #header-text>Databases</template>

    <template #content>
      <Table :columns="tableColumns" :data="apiPayload" />
    </template>
  </MainLayout>
</template>
