<script setup lang="ts">
import { FwbSidebar, FwbSidebarItem, FwbSidebarLogo, FwbSidebarItemGroup } from 'flowbite-vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <fwb-sidebar class="relative border-solid border-r border-gray-700">
    <fwb-sidebar-logo name="Squiglink Studio" logo="/src/assets/logo.svg" tag="router-link" />
    <fwb-sidebar-item to="/databases">
      <template #icon>
        <Icon icon="flowbite:layers-solid" width="24" height="24" class="text-gray-400" />
      </template>
      <template #default>Databases</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item to="/brands">
      <template #icon>
        <Icon icon="flowbite:grid-solid" width="24" height="24" class="text-gray-400" />
      </template>
      <template #default>Brands</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item to="/models">
      <template #icon>
        <Icon icon="flowbite:headphones-solid" width="24" height="24" class="text-gray-400" />
      </template>
      <template #default>Models</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item-group border>
      <fwb-sidebar-item class="py-1">
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

      <fwb-sidebar-item class="py-1">
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
