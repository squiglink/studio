<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { authenticationServer } from "@/utils/server/authentication";
import { useAuthenticationStore } from "@/stores/authentication";
import { useUserStore } from "@/stores/user";

import BlankLayout from "@/layouts/BlankLayout.vue";
import Loader from "@/components/Loader.vue";

const authenticationStore = useAuthenticationStore();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onBeforeMount(async () => {
  if (authenticationStore.accessToken) {
    router.replace({ name: "home" });
    return;
  }

  const token = route.query.token as string;

  if (!token) {
    router.replace({ name: "login" });
    return;
  }

  const response = await authenticationServer.verify(token);
  if (!response) {
    router.replace({ name: "login" });
    return;
  }

  authenticationStore.setAccessToken(response.access_token);
  authenticationStore.setRefreshToken(response.refresh_token);
  authenticationStore.setUserId(response.user_id);

  await userStore.fetch();

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
