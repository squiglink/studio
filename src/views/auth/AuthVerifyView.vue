<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { authorizationServer } from "@/utils/server/authorization";
import { useAuthorizationStore } from "@/stores/authorization";

import BlankLayout from "@/layouts/BlankLayout.vue";
import Loader from "@/components/Loader.vue";

const authorizationStore = useAuthorizationStore();
const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  if (authorizationStore.accessToken) {
    router.replace({ name: "home" });
    return;
  }

  const token = route.query.token as string;

  if (!token) {
    router.replace({ name: "login" });
    return;
  }

  const response = await authorizationServer.verify(token);
  if (!response) {
    router.replace({ name: "login" });
    return;
  }

  authorizationStore.setAccessToken(response.access_token);
  authorizationStore.setRefreshToken(response.refresh_token);

  router.replace({ name: "home" });
});
</script>

<template>
  <BlankLayout>
    <div class="flex h-full flex-col gap-6 items-center justify-center text-white">
      <fwb-card
        variant="none"
        class="p-8 block bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 max-w-md w-full"
      >
        <div class="flex flex-col gap-4 items-center">
          <p class="text-lg font-semibold">Please wait... We're logging you in.</p>
          <Loader />
        </div>
      </fwb-card>
    </div>
  </BlankLayout>
</template>
