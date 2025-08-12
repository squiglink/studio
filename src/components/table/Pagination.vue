<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWindowSize } from '@/composables/useWindowSize'

const props = defineProps<{
  pageCount: number
}>()

const router = useRouter()
const route = useRoute()

const currentPage = defineModel<number>({ required: true })

const handlePageChange = (page: number) => {
  router.push({ query: { page: page.toString(), query: route.query.query } })
}

const { width } = useWindowSize()
const isLarge = computed(() => width.value > 768)
</script>

<template>
  <fwb-pagination
    hide-labels
    show-icons
    enable-first-last
    :large="isLarge"
    v-model="currentPage"
    :slice-length="isLarge ? 3 : 2"
    :total-pages="pageCount"
    @page-changed="handlePageChange"
  />
</template>
