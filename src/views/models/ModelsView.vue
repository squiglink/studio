<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { modelsServer } from "@/utils/server/models";

import type { ServerModel } from "@/utils/server/models";

import MainLayout from "@/layouts/MainLayout.vue";
import Table from "@/components/Table.vue";
import NetworkError from "@/components/NetworkError.vue";

const route = useRoute();

const tableColumns = [
  { name: "Name", key: "name", path: "/models/", pathSuffix: "/edit" },
  { name: "Brand", nestedKey: ["brand", "name"] },
  { name: "Created", key: "created_at" },
  { name: "Last modified", key: "updated_at" },
];

const models = ref([] as ServerModel[]);
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));
const searchQuery = computed(() => (route.query.query ? String(route.query.query) : ""));
const pageCount = ref(1);
const loading = ref(false);
const fetchFailed = ref(false);

const fetchModels = async () => {
  loading.value = true;
  try {
    const response = await modelsServer.all(page.value, searchQuery.value);
    models.value = response.page;
    pageCount.value = response.page_count;
  } catch {
    fetchFailed.value = true;
  } finally {
    loading.value = false;
  }
};

watch([page, searchQuery], () => {
  fetchModels();
});

onMounted(() => {
  fetchModels();
});
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Models</template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <Table
        v-else
        v-model="models"
        v-model:current-page="page"
        v-model:loading="loading"
        :enable-search="true"
        :columns="tableColumns"
        :selectable-rows="false"
        :page-count="pageCount"
      >
        <template #actions>
          <fwb-button color="default" size="md" tag="router-link" :href="{ name: 'newModel' }">
            Add new model
            <template #suffix>
              <Icon icon="flowbite:plus-outline" width="16" height="16" />
            </template>
          </fwb-button>
        </template>
      </Table>
    </template>
  </MainLayout>
</template>
