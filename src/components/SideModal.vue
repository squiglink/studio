<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const modalShown = defineModel<boolean>();

const closeModal = () => {
  modalShown.value = false;
};

const onClick = (mouseEvent: MouseEvent) => {
  if (mouseEvent.target === document.querySelector("#modal-container")) closeModal();
};

const onKeydown = (keyboardEvent: KeyboardEvent) => {
  if (keyboardEvent.key === "Escape") closeModal();
};

onMounted(() => {
  window.addEventListener("click", onClick);
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("click", onClick);
  window.removeEventListener("keydown", onKeydown);
});
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
