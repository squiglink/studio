<script setup lang="ts">
import { useAuthenticationStore } from "../stores/authentication";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg";

const authenticationStore = useAuthenticationStore();
const router = useRouter();

const logout = () => {
  authenticationStore.clearTokens();
  router.push("/login");
};
</script>

<template>
  <fwb-sidebar
    id="main-sidebar"
    class="w-72 fixed top-0 left-0 z-40 border-solid border-r border-gray-700 transition-transform -translate-x-full sm:translate-x-0"
  >
    <fwb-sidebar-logo
      name="Squiglink Studio"
      :logo="logo"
      tag="router-link"
      :to="{ name: 'home' }"
    />

    <fwb-sidebar-item
      tag="router-link"
      :to="{ name: 'databases' }"
      :class="{ 'bg-gray-700': $route.path === '/databases' || $route.path === '/' }"
    >
      <template #icon>
        <Icon icon="flowbite:layers-solid" width="24" height="24" class="text-gray-400" />
      </template>

      <template #default>Databases</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item
      tag="router-link"
      :to="{ name: 'brands' }"
      :class="{ 'bg-gray-700': $route.path === '/brands' }"
    >
      <template #icon>
        <Icon icon="flowbite:grid-solid" width="24" height="24" class="text-gray-400" />
      </template>

      <template #default>Brands</template>
    </fwb-sidebar-item>

    <fwb-sidebar-item
      tag="router-link"
      :to="{ name: 'models' }"
      :class="{ 'bg-gray-700': $route.path === '/models' }"
    >
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
        link="http://documentation.squig.link/"
        tag="a"
        target="_blank"
      >
        <template #icon>
          <Icon icon="flowbite:file-lines-outline" width="24" height="24" class="text-gray-400" />
        </template>

        <template #default>Documentation</template>
      </fwb-sidebar-item>

      <fwb-sidebar-item class="py-1" @click="logout">
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
