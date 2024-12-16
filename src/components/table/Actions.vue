<template>
  <div class="flex justify-between p-4 bg-gray-800 rounded-t-lg">
    <slot name="search" />

    <div class="flex flex gap-4">
      <slot name="actions" />
    </div>
  </div>
</template>
