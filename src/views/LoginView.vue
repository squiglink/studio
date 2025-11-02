<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { authorizationApi } from '@/utils/api/authorization'
import { useAuthorizationStore } from '@/stores/authorization'

import BlankLayout from '@/layouts/BlankLayout.vue'
import Loader from '@/components/Loader.vue'

const authorizationStore = useAuthorizationStore()
const router = useRouter()

const turnstileEnabled = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_ENABLED === 'true'
const loginState = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

onBeforeMount(() => {
  if (authorizationStore.accessToken) {
    router.push({ name: 'home' })
  }
})

const email = ref('')
const turnstileToken = ref('')

const login = async () => {
  loginState.value = 'loading'
  const result = await authorizationApi.login(email.value, turnstileToken.value)
  if (result) {
    loginState.value = 'success'
  } else {
    loginState.value = 'error'
  }
}

onMounted(() => {
  if (turnstileEnabled) {
    window.turnstile.render('#turnstile-container', {
      sitekey: import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY,
      callback: function (token: string) {
        turnstileToken.value = token
      },
    })
  }
})
</script>

<template>
  <BlankLayout>
    <div class="flex h-full flex-col gap-6 items-center justify-center text-white">
      <fwb-card
        variant="none"
        class="p-8 block bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 max-w-md w-full"
      >
        <div class="flex flex-col gap-4" v-if="loginState === 'idle'">
          <p class="text-xl font-semibold">Welcome back, squiggler</p>
          <div class="flex flex-col gap-2 w-full">
            <label for="email">Email address</label>
            <fwb-input id="email" type="email" v-model="email" />
          </div>
          <div class="w-full flex items-center justify-center" v-if="turnstileEnabled">
            <div id="turnstile-container"></div>
          </div>
          <fwb-button color="default" size="lg" class="justify-center" @click="login">
            Email me a magic link
            <template #suffix>
              <Icon icon="flowbite:wand-magic-sparkles-solid" width="24" height="24" />
            </template>
          </fwb-button>
        </div>
        <div class="flex flex-col gap-4 items-center" v-if="loginState === 'loading'">
          <p>Sending magic link...</p>
          <Loader />
        </div>
        <div class="flex flex-col gap-4 items-center" v-if="loginState === 'success'">
          <Icon icon="flowbite:check-circle-solid" width="64" height="64" />
          <p class="text-lg font-semibold">Magic link sent</p>
          <p>Please check your email for a link to login</p>
        </div>
        <div class="flex flex-col gap-4 items-center" v-if="loginState === 'error'">
          <Icon icon="flowbite:exclamation-circle-solid" width="64" height="64" />
          <p class="text-lg font-semibold">Could not send magic link</p>
          <fwb-button color="default" size="lg" class="justify-center" @click="loginState = 'idle'">
            Back to login
          </fwb-button>
        </div>
      </fwb-card>
    </div>
  </BlankLayout>
</template>
