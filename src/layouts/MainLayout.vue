<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div class="dark:text-white bg-gray-900">
    <Sidebar />

    <div class="sm:ml-72 h-screen overflow-x-auto p-4 lg:p-6 flex flex-col gap-4">
      <div class="flex gap-4 items-center content-center">
        <fwb-button
          color="alternative"
          data-drawer-target="main-sidebar"
          data-drawer-toggle="main-sidebar"
          aria-controls="main-sidebar"
          class="inline-flex items-center p-2 rounded-lg sm:hidden"
        >
          <Icon icon="flowbite:bars-from-left-outline" width="24" height="24" />
        </fwb-button>
        <div class="w-full flex items-center justify-between">
          <h1 class="text-3xl text-white flex-3">
            <slot name="header-text" />
          </h1>

          <div class="w-full grid grid-cols-2 gap-3 flex-1">
            <slot name="header-buttons" />
          </div>
        </div>
      </div>

      <slot name="content" />
    </div>
  </div>
</template>
