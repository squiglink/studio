<script setup lang="ts">
import { onMounted } from 'vue'

const modalShown = defineModel<boolean>()

const closeModal = () => {
  modalShown.value = false
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  })

  window.addEventListener('click', (e) => {
    if (e.target === document.querySelector('#modal-container')) {
      closeModal()
    }
  })
})
</script>

<template>
  <div
    v-if="modalShown"
    id="modal-container"
    class="lg:bg-gray-600/80 absolute top-0 left-0 w-full h-full z-50"
  >
    <div
      class="w-full lg:w-[596px] bg-gray-900 h-full p-4 flex flex-col gap-3"
      :class="{ 'animate-left-slide-in': modalShown }"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-base text-gray-400 font-semibold uppercase"><slot name="header-text" /></h2>

        <span @click="closeModal" class="cursor-pointer">
          <Icon
            icon="flowbite:x-outline"
            width="24"
            height="24"
            class="text-gray-400 hover:text-gray-300"
          />
        </span>
      </div>

      <div class="overflow-y-auto basis-full">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
