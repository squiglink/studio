<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthenticationStore } from "../stores/authentication";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg";

const emit = defineEmits<{ close: [] }>();
const props = defineProps<{ isOpen?: boolean }>();

const authenticationStore = useAuthenticationStore();
const router = useRouter();
const userStore = useUserStore();

const labLink = computed(() => {
  const base = import.meta.env.VITE_BASE_LAB_URL as string;
  const url = new URL(base);
  return `${url.protocol}//${userStore.username}.${url.host}`;
});

// TODO: Remove later.
onMounted(() => {
  if (!userStore.role) userStore.fetch();
});

const logout = () => {
  authenticationStore.clear();
  userStore.clear();
  router.push("/login");
};
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 z-30 bg-black/50 sm:hidden"
    @click="emit('close')"
  />
  <fwb-sidebar
    id="main-sidebar"
    :class="[
      'w-72 fixed top-0 left-0 z-40 border-solid border-r border-gray-700 transition-transform sm:translate-x-0',
      props.isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
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
      <fwb-sidebar-item class="py-1" :link="labLink" tag="a" target="_blank">
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
