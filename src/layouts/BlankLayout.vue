<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div class="dark bg-gray-900 h-full w-full">
    <slot />
  </div>
</template>
