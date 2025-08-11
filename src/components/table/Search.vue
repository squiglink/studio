<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = ref(route.query.query ? String(route.query.query) : '')
const runningTimeout = ref<number>()

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  search.value = value
  window.clearTimeout(runningTimeout.value)

  const timeout = window.setTimeout(() => {
    handleSearch()
  }, 300)

  runningTimeout.value = timeout
}

const handleSearch = async () => {
  router.push({ query: { page: 1, query: search.value } })
}
</script>

<template>
  <fwb-input
    v-model="search"
    placeholder="Search"
    class="w-full lg:w-80 w-fit"
    :oninput="handleInput"
  >
    <template #prefix>
      <Icon
        icon="flowbite:search-outline"
        width="24"
        height="24"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
      />
    </template>
  </fwb-input>
</template>
