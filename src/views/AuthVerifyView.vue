<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { authorizationApi } from '@/utils/api/authorization'
import { useAuthorizationStore } from '@/stores/authorization'

import BlankLayout from '@/layouts/BlankLayout.vue'
import Loader from '@/components/Loader.vue'

const authorizationStore = useAuthorizationStore()
const route = useRoute()
const router = useRouter()

onBeforeMount(async () => {
  if (authorizationStore.accessToken) {
    router.push({ name: 'home' })
    return
  }

  console.log(`ROUTE QUERY: ${JSON.stringify(route.query)}`)
  const token = route.query.token as string

  if (!token) {
    router.push({ name: 'login' })
    return
  }

  const response = await authorizationApi.verify(token)
  if (!response) {
    router.push({ name: 'login' })
    return
  }

  console.log(`response: ${JSON.stringify(response)}`)

  authorizationStore.setAccessToken(response.accessToken)
  authorizationStore.setRefreshToken(response.refreshToken)

  router.push({ name: 'home' })
})
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
