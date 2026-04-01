<script setup lang="ts">
const errors = defineModel<string[]>({ required: true });
defineEmits(["submit"]);
</script>

<template>
  <form class="flex flex-col gap-4" @keydown.enter.prevent="$emit('submit')">
    <fwb-alert v-if="errors.length > 0" type="danger">
      <span class="font-medium">Ensure that these requirements are met:</span>
      <ul class="mt-1.5 ml-4 list-disc list-inside">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </fwb-alert>

    <div class="flex flex-col gap-3">
      <slot name="content" />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <slot name="footer" />
    </div>
  </form>
</template>
