<script setup lang="ts">
import { brandsServer } from '@/utils/server/brands'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

import type { ServerBrand } from '@/utils/server/brands'

import MainLayout from '@/layouts/MainLayout.vue'
import Form from '@/components/Form.vue'

const router = useRouter()

const initialBrandFormState: Brand = {
  name: '',
  errors: [],
}

const loading = ref(false)
const newBrandForm = ref<Brand>(initialBrandFormState)

const convertToServerBrand = (form: Brand): ServerBrand => ({
  name: form.name,
})

const createBrand = async () => {
  loading.value = true
  try {
    const serverBrand: ServerBrand = convertToServerBrand(newBrandForm.value)
    await brandsServer.create(serverBrand)

    toast.success('Brand created successfully!')

    router.push({ name: 'brands' })
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}
</script>

<template>
  <MainLayout>
    <template #header-text>Add new brand</template>
    <template #header-buttons>
      <fwb-button
        color="alternative"
        size="md"
        tag="router-link"
        :href="{ name: 'brands' }"
        class="flex justify-center"
      >
        Cancel
      </fwb-button>
      <fwb-button color="default" size="md" @click="createBrand">Save</fwb-button>
    </template>

    <template #content>
      <Form v-model="newBrandForm.errors" class="w-1/4">
        <template #content>
          <fwb-input
            label="Name"
            placeholder="(required)"
            size="md"
            v-model="newBrandForm.name"
            required
          />
        </template>
      </Form>
    </template>
  </MainLayout>
</template>
