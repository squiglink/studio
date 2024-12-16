<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'
import { objectToCamel } from 'ts-case-convert'

const tableColumns = [
  { name: 'Type', key: 'type', path: '/databases/' },
  { name: 'Path', key: 'path' },
  { name: 'Created At', key: 'createdAt' },
  { name: 'Last modified', key: 'updatedAt' },
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

const databaseArray = apiPayload.map((item) => objectToCamel(item)) as Database[]
</script>

<template>
  <MainLayout>
    <template #header-text>Databases</template>

    <template #content>
      <Table :columns="tableColumns" :data="databaseArray" />
    </template>
  </MainLayout>
</template>
