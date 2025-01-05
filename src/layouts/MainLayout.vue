<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="dark bg-gray-900">
    <Sidebar />

    <div class="sm:ml-72 h-screen overflow-x-auto p-4 flex flex-col gap-6">
      <h1 class="text-3xl text-white">
        <slot name="header-text" />
      </h1>

      <slot name="content" />
    </div>
  </div>
</template>
