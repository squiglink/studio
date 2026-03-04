<script setup lang="ts">
import BlankLayout from "@/layouts/BlankLayout.vue";
</script>

<template>
  <BlankLayout>
    <div class="flex h-full flex-col gap-6 items-center justify-center text-white">
      <h1 class="text-3xl">Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>

      <router-link to="/" class="text-blue-500">Go back to the home page</router-link>
    </div>
  </BlankLayout>
</template>
