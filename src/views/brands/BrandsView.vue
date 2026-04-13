<script setup lang="ts">
import { brandsServer } from "@/utils/server/brands";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";

import type { ServerBrand } from "@/utils/server/brands";

import MainLayout from "@/layouts/MainLayout.vue";
import Table from "@/components/Table.vue";
import NetworkError from "@/components/NetworkError.vue";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();

const tableColumns = computed<TableColumn[]>(() => [
  {
    name: "Brand",
    key: "name",
    ...(userStore.role === "root" ? { path: "/brands/", pathSuffix: "/edit" } : {}),
  },
  { name: "Models", key: "model_count" },
  { name: "Created", key: "created_at" },
  { name: "Last modified", key: "updated_at" },
]);

const brands = ref([] as ServerBrand[]);
const pageCount = ref(1);
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));
const searchQuery = computed(() => (route.query.query ? String(route.query.query) : ""));
const loading = ref(false);
const fetchFailed = ref(false);

const fetchBrands = async () => {
  loading.value = true;
  try {
    const response = await brandsServer.all(page.value, searchQuery.value);
    brands.value = response.page;
    pageCount.value = response.page_count;
  } catch {
    fetchFailed.value = true;
  } finally {
    loading.value = false;
  }
};

watch([page, searchQuery], () => {
  fetchBrands();
});

onMounted(() => {
  fetchBrands();
});
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Brands</template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <Table
        v-else
        v-model="brands"
        v-model:current-page="page"
        v-model:loading="loading"
        :enable-search="true"
        :columns="tableColumns"
        :selectable-rows="false"
        :page-count="pageCount"
      >
        <template #actions>
          <fwb-button color="default" size="md" tag="router-link" :href="{ name: 'newBrand' }">
            Add new brand
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="16" height="16" />
            </template>
          </fwb-button>
        </template>
      </Table>
    </template>
  </MainLayout>
</template>
