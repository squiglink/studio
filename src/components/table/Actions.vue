<template>
  <div class="flex lg:flex-row sm:flex-col gap-3 justify-between p-4 bg-gray-800 rounded-t-lg">
    <slot name="search" />

    <div class="flex flex gap-4">
      <slot name="actions" />
    </div>
  </div>
</template>
