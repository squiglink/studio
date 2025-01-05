<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <fwb-button color="alternative" data-drawer-target="main-sidebar" data-drawer-toggle="main-sidebar" aria-controls="main-sidebar"
              class="inline-flex items-center p-2 mt-2 ms-3 rounded-lg sm:hidden">
    <Icon icon="flowbite:bars-from-left-outline" width="24" height="24" />
  </fwb-button>

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
