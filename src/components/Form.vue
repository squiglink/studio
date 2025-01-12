<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex flex-col gap-3 basis-full">
      <slot name="content" />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <slot name="footer" />
    </div>
  </div>
</template>
