<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import NetworkError from "@/components/NetworkError.vue";
import Table from "@/components/Table.vue";
import type { ServerDatabase } from "@/utils/server/databases";
import { databasesServer } from "@/utils/server/databases";
import { onMounted, ref, computed, watch } from "vue";
import { useAuthenticationStore } from "@/stores/authentication";
import { useRoute } from "vue-router";

const authenticationStore = useAuthenticationStore();
const databases = ref([] as ServerDatabase[]);
const fetchFailed = ref(false);
const loading = ref(false);
const page = computed(() => (route.query.page ? Number(route.query.page) : 1));
const pageCount = ref(1);
const route = useRoute();
const searchQuery = computed(() => (route.query.query ? String(route.query.query) : ""));
const tableColumns = [
  { name: "Kind", key: "kind", path: "/databases/" },
  { name: "Path", key: "path" },
  { name: "Created", key: "created_at" },
  { name: "Last modified", key: "updated_at" },
];

const fetchDatabases = async () => {
  loading.value = true;
  try {
    const response = await databasesServer.all(
      page.value,
      searchQuery.value,
      authenticationStore.userId,
    );
    databases.value = response.page;
    pageCount.value = response.page_count;
  } catch {
    fetchFailed.value = true;
  } finally {
    loading.value = false;
  }
};

watch([page, searchQuery], () => {
  fetchDatabases();
});

onMounted(() => {
  fetchDatabases();
});
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Databases</template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <Table
        v-else
        v-model:current-page="page"
        v-model:loading="loading"
        v-model="databases"
        :columns="tableColumns"
        :enable-search="true"
        :page-count="pageCount"
      />
    </template>
  </MainLayout>
</template>
