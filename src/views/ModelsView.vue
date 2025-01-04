<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { modelsApi } from '@/utils/api/models';

import type { APIModel } from '@/utils/api/models';
import type { Model } from '@/types/Model';

import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'

const tableColumns = [
  { name: 'Name', key: 'name', path: '/models/' },
  { name: 'Brand', key: 'brandName' },
  // { name: 'Created At', key: 'createdAt' },
  // { name: 'Last modified', key: 'updatedAt' },
]

let models = ref([] as Model[]);
let page = ref(1);
let pageCount = ref(1);

const fetchModels = async () => {
  let response = (await modelsApi.all(page.value));
  models.value = response.page.map((model: APIModel) => <Model>{
    id: model.id,
    name: model.name,
    brandName: model.brand.name,
  });
  pageCount.value = response.page_count;
}


onMounted(() => {
  fetchModels();
})
</script>

<template>
  <MainLayout>
    <template #header-text>Models</template>

    <template #content>
      <Table :columns="tableColumns" :data="models" :selectable-rows="true">
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
