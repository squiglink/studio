<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div class="dark bg-gray-900">
    <Sidebar />

    <div class="sm:ml-72 h-screen overflow-x-auto p-4 lg:p-6 flex flex-col gap-4">
      <div class="flex gap-4 items-center content-center">
        <fwb-button color="alternative" data-drawer-target="main-sidebar"
                    data-drawer-toggle="main-sidebar" aria-controls="main-sidebar"
                    class="inline-flex items-center p-2 rounded-lg sm:hidden">
          <Icon icon="flowbite:bars-from-left-outline" width="24" height="24" />
        </fwb-button>
        <h1 class="text-3xl text-white">
          <slot name="header-text" />
        </h1>
      </div>

      <slot name="content" />
    </div>
  </div>
</template>
