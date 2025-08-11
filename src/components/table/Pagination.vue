<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  pageCount: number
}>()

const router = useRouter()
const route = useRoute()

const currentPage = defineModel<number>({ required: true })

const handlePageChange = (page: number) => {
  router.push({ query: { page: page.toString(), query: route.query.query } })
}
</script>

<template>
  <fwb-pagination
    hide-labels
    show-icons
    enable-first-last
    large
    v-model="currentPage"
    :slice-length="3"
    :total-pages="pageCount"
    @page-changed="handlePageChange"
  />
</template>
