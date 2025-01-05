<template>
  <div class="flex flex-col lg:flex-row gap-3 justify-between p-4 bg-gray-800 rounded-t-lg items-center">
    <slot name="search" />

    <div class="flex gap-4">
      <slot name="actions" />
    </div>
  </div>
</template>
