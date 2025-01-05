<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <button data-drawer-target="main-sidebar" data-drawer-toggle="main-sidebar" aria-controls="main-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
  </button>

  <fwb-sidebar id="main-sidebar" class="w-72 fixed top-0 left-0 z-40 border-solid border-r border-gray-700 transition-transform -translate-x-full sm:translate-x-0">
    <fwb-sidebar-logo name="Squiglink Studio" logo="/src/assets/logo.svg" tag="router-link" />

    <fwb-sidebar-item
      to="/databases"
      :class="{ 'bg-gray-700': $route.path === '/databases' || $route.path === '/' }"
    >
      <template #icon>
        <Icon icon="flowbite:layers-solid" width="24" height="24" class="text-gray-400" />
      </template>

      <template #default>Databases</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item to="/brands" :class="{ 'bg-gray-700': $route.path === '/brands' }">
      <template #icon>
        <Icon icon="flowbite:grid-solid" width="24" height="24" class="text-gray-400" />
      </template>

      <template #default>Brands</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item to="/models" :class="{ 'bg-gray-700': $route.path === '/models' }">
      <template #icon>
        <Icon icon="flowbite:headphones-solid" width="24" height="24" class="text-gray-400" />
      </template>

      <template #default>Models</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item-group border>
      <fwb-sidebar-item class="py-1" link="/" tag="a" target="_blank">
        <template #icon>
          <Icon
            icon="flowbite:arrow-up-right-from-square-outline"
            width="24"
            height="24"
            class="text-gray-400"
          />
        </template>

        <template #default>Open my database</template>
      </fwb-sidebar-item>

      <fwb-sidebar-item
        class="py-1"
        link="https://squiglink.github.io/documentation/"
        tag="a"
        target="_blank"
      >
        <template #icon>
          <Icon icon="flowbite:file-lines-outline" width="24" height="24" class="text-gray-400" />
        </template>

        <template #default>Documentation</template>
      </fwb-sidebar-item>

      <fwb-sidebar-item class="py-1">
        <template #icon>
          <Icon
            icon="flowbite:arrow-left-to-bracket-outline"
            width="24"
            height="24"
            class="text-gray-400"
          />
        </template>

        <template #default>Log out</template>
      </fwb-sidebar-item>
    </fwb-sidebar-item-group>
  </fwb-sidebar>
</template>
