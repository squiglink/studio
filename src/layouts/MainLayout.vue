<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="dark bg-gray-900 flex">
    <Sidebar class="shrink-0" />

    <div class="w-full overflow-x-auto p-4 flex flex-col gap-6">
      <h1 class="text-3xl text-white">
        <slot name="header-text" />
      </h1>

      <slot name="content" />
    </div>
  </div>
</template>
