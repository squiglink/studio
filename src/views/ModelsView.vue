<script setup lang="ts">
import { objectToCamel } from 'ts-case-convert'
import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'

const apiPayload = [
  {
    id: 1,
    name: 'Dioko',
    brand: {
      name: '7Hz',
      id: 1,
      created_at: '2021-10-01',
      updated_at: '2021-10-01',
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 2,
    name: 'U4s',
    brand: {
      name: '64 Audio',
      id: 2,
      created_at: '2021-10-01',
      updated_at: '2021-10-01',
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 3,
    name: 'Performer 5+2',
    brand: {
      name: 'Aful Acoustics',
      id: 3,
      created_at: '2021-10-01',
      updated_at: '2021-10-01',
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 4,
    name: 'AirPods Pro',
    brand: {
      name: 'Apple',
      id: 4,
      created_at: '2021-10-01',
      updated_at: '2021-10-01',
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 5,
    name: 'Andromeda',
    brand: {
      name: 'Campfire Audio',
      id: 5,
      created_at: '2021-10-01',
      updated_at: '2021-10-01',
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 6,
    name: 'Moon Rover',
    brand: {
      name: 'Campfire Audio',
      id: 5,
      created_at: '2021-10-01',
      updated_at: '2021-10-01',
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
  {
    id: 7,
    name: 'Zen Pro',
    brand: {
      name: 'Dunu',
      id: 6,
      created_at: '2021-10-01',
      updated_at: '2021-10-01',
    },
    created_at: '2021-10-01',
    updated_at: '2021-10-01',
  },
]

const tableColumns = [
  { name: 'Name', key: 'name', path: '/models/' },
  { name: 'Brand', key: 'brandName' },
  { name: 'Created At', key: 'createdAt' },
  { name: 'Last modified', key: 'updatedAt' },
]

const modelArray = apiPayload.map((item) => objectToCamel(item)) as Model[]

const tableValues = modelArray.map((model) => {
  return {
    id: model.id,
    name: model.name,
    brandName: model.brand.name,
    brandId: model.brand.id,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  }
})
</script>

<template>
  <MainLayout>
    <template #header-text>Models</template>

    <template #content>
      <Table :columns="tableColumns" :data="tableValues">
        <template #actions>
          <fwb-button color="red" size="xs">
            Delete selected
            <template #suffix>
              <Icon icon="flowbite:minus-outline" width="24" height="24" />
            </template>
          </fwb-button>
          <fwb-button color="default" size="xs">
            Add new model
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="24" height="24" />
            </template>
          </fwb-button>
        </template>
      </Table>
    </template>
  </MainLayout>
</template>
