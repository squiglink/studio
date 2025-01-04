<script setup lang="ts">
import { brandsApi } from '@/utils/api/brands';
import type { APIBrand } from '@/utils/api/brands';
import { ref, onMounted  } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue'
import Table from '@/components/Table.vue'

const tableColumns = [
  { name: 'Brand', key: 'name', path: '/brands/' },
  { name: 'Models', key: 'model_count' },
  // { name: 'Created At', key: 'createdAt' },
  // { name: 'Last modified', key: 'updatedAt' },
]

let brands = ref([] as APIBrand[]);
let page = ref(1);
let pageCount = ref(1);

const fetchBrands = async () => {
  brands.value = (await brandsApi.all(page.value)).page;
  pageCount.value = (await brandsApi.all(page.value)).page_count;
}

onMounted(() => {
  fetchBrands();
})
</script>

<template>
  <MainLayout>
    <template #header-text>Brands</template>

    <template #content>
      <Table :columns="tableColumns" :data="brands" :selectable-rows="true">
        <template #actions>
          <fwb-button color="red" size="xs">
            Delete selected
            <template #suffix>
              <Icon icon="flowbite:minus-outline" width="24" height="24" />
            </template>
          </fwb-button>
          <fwb-button color="default" size="xs">
            Add new brand
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="24" height="24" />
            </template>
          </fwb-button>
        </template>
      </Table>
    </template>
  </MainLayout>
</template>
