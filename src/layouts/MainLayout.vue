<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex">
    <Sidebar />

    <div class="p-4">
      <h1 class="text-3xl text-white"><slot name="header" /></h1>
    </div>
  </div>
</template>
