<script setup lang="ts">
import { ref } from 'vue';
import { apiClient, type APIPage } from '@/utils/ApiClient';

const props = defineProps<{
  searchUrl: string;
}>();

const search = ref('');
const runningTimeout = ref<number>();
const tableRows = defineModel();

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  search.value = value;
  window.clearTimeout(runningTimeout.value);

  const timeout = window.setTimeout(() => {
    handleSearch();
  }, 300);

  runningTimeout.value = timeout;
}

const handleSearch = async () => {
  const response = (await apiClient.get(props.searchUrl, { params: { query: search.value}})).data as APIPage<unknown>;
  tableRows.value = response.page;
};
</script>

<template>
  <fwb-input v-model="search" placeholder="Search" class="w-full lg:w-80 w-fit" :oninput="handleInput">
    <template #prefix>
      <Icon icon="flowbite:search-outline" width="24" height="24" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </template>
  </fwb-input>
</template>
