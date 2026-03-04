<template>
  <div class="flex flex-col gap-2 justify-center items-center h-full w-full">
    <fwb-spinner size="12" />
    <p class="text-sm text-gray-400">
      <slot name="text" />
    </p>
  </div>
</template>
