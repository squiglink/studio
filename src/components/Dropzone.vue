<script setup lang="ts">
import { ref } from "vue";

const files = defineModel<File[]>();
const fileInputKey = ref(0);

const removeFile = (file: File) => {
  files.value = files.value?.filter((f) => f !== file);
  // Reset the file input to clear its internal state
  fileInputKey.value++;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <fwb-file-input :key="fileInputKey" v-model="files" dropzone multiple> </fwb-file-input>
    <div v-if="files && files.length !== 0" class="p-2 flex flex-col gap-4">
      <div class="flex justify-between items-center" v-for="(file, index) in files" :key="index">
        <div class="flex items-center gap-2">
          <Icon icon="flowbite:file-outline" width="16" height="16" class="text-gray-400" />
          <span>{{ file.name }}</span>
        </div>
        <Icon
          icon="flowbite:x-outline"
          width="16"
          height="16"
          class="text-gray-400 cursor-pointer"
          @click="removeFile(file)"
        />
      </div>
    </div>
  </div>
</template>
