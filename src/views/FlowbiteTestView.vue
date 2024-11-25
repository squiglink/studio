<script setup lang="ts">
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
</script>

<template>
  <div class="about">
    <fwb-dropdown text="Click me" placement="top">
      <fwb-list-group>
        <fwb-list-group-item>Item #1</fwb-list-group-item>
        <fwb-list-group-item>Item #2</fwb-list-group-item>
        <fwb-list-group-item>Item #3</fwb-list-group-item>
      </fwb-list-group>
    </fwb-dropdown>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
