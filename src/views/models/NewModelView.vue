<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import Form from '@/components/Form.vue'
import { brandsApi } from '@/utils/api/brands'
import { modelsApi } from '@/utils/api/models'
import type { APICreateModel } from '@/utils/api/models'
import NetworkError from '@/components/NetworkError.vue'

const router = useRouter()
const loading = ref(false)
const fetchFailed = ref(false)

const initialModelFormState: Model = {
  name: '',
  brandId: '',
  errors: [],
}

const newModelForm = ref<Model>(initialModelFormState)

const brands = ref([] as { name: string; value: string }[])

const fetchBrands = async () => {
  try {
    loading.value = true
    const response = await brandsApi.all(1, '')
    brands.value.push(...response.page.map((brand) => ({ name: brand.name, value: brand.id })))

    if (response.page_count > 1) {
      for (let i = 2; i <= response.page_count; i++) {
        const pageResponse = await brandsApi.all(i, '')
        brands.value.push(
          ...pageResponse.page.map((brand) => ({ name: brand.name, value: brand.id })),
        )
      }
    }
  } catch (error) {
    console.error(error)
    fetchFailed.value = true
  } finally {
    loading.value = false
  }
}

const convertToAPIModel = (form: Model): APICreateModel => ({
  name: form.name,
  brand_id: form.brandId,
})

const createModel = async () => {
  // TODO: Handle errors?
  loading.value = true
  try {
    const apiModel: APICreateModel = convertToAPIModel(newModelForm.value)
    await modelsApi.create(apiModel)
    router.push({ name: 'models' })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBrands()
})
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Add new model</template>
    <template #header-buttons v-if="!fetchFailed">
      <fwb-button
        color="alternative"
        size="md"
        tag="router-link"
        :href="{ name: 'models' }"
        class="flex justify-center"
      >
        Cancel
      </fwb-button>
      <fwb-button color="default" size="md" @click="createModel" :disabled="loading">
        {{ loading ? 'Saving...' : 'Save' }}
      </fwb-button>
    </template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <div v-else class="w-full max-w-2xl">
        <Form v-model="newModelForm.errors">
          <template #content>
            <fwb-select
              v-model="newModelForm.brandId"
              :options="brands"
              label="Brand"
              placeholder="required"
            />
            <fwb-input
              label="Model name"
              name="name"
              placeholder="required"
              size="md"
              v-model="newModelForm.name"
              required
            />

            <div class="opacity-50 pointer-events-none">
              <div class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Measurements
              </div>
              <fwb-card class="flex justify-end p-4 !max-w-full">
                <fwb-button color="default" size="sm" disabled>
                  Add new measurement
                  <template #suffix>
                    <Icon icon="flowbite:plus-outline" width="16" height="16" />
                  </template>
                </fwb-button>
              </fwb-card>
            </div>

            <div class="opacity-50 pointer-events-none">
              <div class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Evaluation
              </div>
              <fwb-card class="p-4 !max-w-full">
                <div class="flex justify-end mb-6">
                  <fwb-button color="default" size="sm" disabled>
                    Add evaluation
                    <template #suffix>
                      <Icon icon="flowbite:plus-outline" width="16" height="16" />
                    </template>
                  </fwb-button>
                </div>

                <div class="space-y-6">
                  <fwb-input
                    label="Review score"
                    name="reviewScore"
                    placeholder="optional"
                    size="md"
                    type="number"
                    disabled
                  />
                  <fwb-input
                    label="Review URL"
                    name="reviewUrl"
                    placeholder="optional"
                    size="md"
                    disabled
                  />
                  <fwb-input
                    label="Shop URL"
                    name="shopUrl"
                    placeholder="optional"
                    size="md"
                    disabled
                  />
                </div>
              </fwb-card>
            </div>
          </template>
        </Form>
      </div>
    </template>
  </MainLayout>
</template>
