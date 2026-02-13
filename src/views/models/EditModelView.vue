<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter, useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import Form from '@/components/Form.vue'
import SideModal from '@/components/SideModal.vue'
import Separator from '@/components/Separator.vue'
import Dropzone from '@/components/Dropzone.vue'
import { databasesApi } from '@/utils/api/databases'
import { brandsApi } from '@/utils/api/brands'
import { modelsApi } from '@/utils/api/models'
import type { APIModel } from '@/utils/api/models'
import NetworkError from '@/components/NetworkError.vue'

const route = useRoute()
const router = useRouter()

const addMeasurementModalShown = ref(false)
const loading = ref(false)
const fetchFailed = ref(false)

const openAddMeasurementModal = () => {
  addMeasurementModalShown.value = true
}

const closeAddMeasurementModal = () => {
  addMeasurementModalShown.value = false
}

const initialModelFormState: Model = {
  name: '',
  brandId: '',
  errors: [],
}

const initialMeasurementFormState: Measurement = {
  label: '',
  type: '',
  databaseId: '',
  leftChannel: [],
  rightChannel: [],
  errors: [],
}

const initialEvaluationFormState: Evaluation = {
  reviewUrl: null,
  reviewScore: null,
  shopUrl: null,
  errors: [],
}

const editModelForm = ref<Model>(initialModelFormState)
const newMeasurement = ref<Measurement>(initialMeasurementFormState)
const newEvaluation = ref<Evaluation>(initialEvaluationFormState)

const measurementTypes = [
  { name: 'Frequency response', value: 'frequency_response' },
  { name: 'Harmonic distortion', value: 'harmonic_distortion' },
  { name: 'Impedance', value: 'impedance' },
  { name: 'Sound isolation', value: 'sound_isolation' },
]

const databases = ref([] as { name: string; value: string }[])
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

const fetchDatabases = async () => {
  try {
    loading.value = true
    const response = await databasesApi.all(1, '')
    databases.value.push(
      ...response.page.map((database) => ({
        name: `${database.kind} (${database.path})`,
        value: database.id,
      })),
    )

    if (response.page_count > 1) {
      for (let i = 2; i <= response.page_count; i++) {
        const pageResponse = await databasesApi.all(i, '')
        databases.value.push(
          ...pageResponse.page.map((database) => ({
            name: `${database.kind} (${database.path})`,
            value: database.id,
          })),
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

const convertToAPIModel = (form: Model): APIModel => ({
  name: form.name,
  brandId: form.brandId,
})

const updateModel = async () => {
  // loading.value = true
  // try {
  //   const apiModel: APIModel = convertToAPIModel(editModelForm.value)
  //   await modelsApi.update(route.params.id as string, apiModel)
  // }
}

const saveMeasurement = () => {
  // Implement measurement saving logic
  closeAddMeasurementModal()
}

onMounted(() => {
  fetchBrands()
  fetchDatabases()
  // TODO: Fetch the model data based on route.params.id
})
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Edit model</template>
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
      <fwb-button color="default" size="md" @click="updateModel">Save</fwb-button>
    </template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <div v-else class="w-full max-w-2xl">
        <Form v-model="editModelForm.errors">
          <template #content>
            <fwb-select
              v-model="editModelForm.brandId"
              :options="brands"
              label="Brand"
              placeholder="required"
            />
            <fwb-input
              label="Model name"
              name="name"
              placeholder="required"
              size="md"
              v-model="editModelForm.name"
              required
            />

            <div>
              <div class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Measurements
              </div>
              <fwb-card class="flex justify-end p-4 !max-w-full">
                <fwb-button color="default" size="sm" @click="openAddMeasurementModal">
                  Add new measurement
                  <template #suffix>
                    <Icon icon="flowbite:plus-outline" width="16" height="16" />
                  </template>
                </fwb-button>
              </fwb-card>
            </div>

            <div>
              <div class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Evaluation
              </div>
              <fwb-card class="p-4 !max-w-full">
                <div class="flex justify-end mb-6">
                  <fwb-button color="default" size="sm">
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
                    v-model="newEvaluation.reviewScore"
                  />
                  <fwb-input
                    label="Review URL"
                    name="reviewUrl"
                    placeholder="optional"
                    size="md"
                    v-model="newEvaluation.reviewUrl"
                  />
                  <fwb-input
                    label="Shop URL"
                    name="shopUrl"
                    placeholder="optional"
                    size="md"
                    v-model="newEvaluation.shopUrl"
                  />
                </div>
              </fwb-card>
            </div>
          </template>
        </Form>
      </div>

      <SideModal v-model="addMeasurementModalShown">
        <template #header-text>Add new measurement</template>

        <template #content>
          <Form v-model="newMeasurement.errors">
            <template #content>
              <fwb-input
                label="Label"
                placeholder="Sample 1"
                size="md"
                v-model="newMeasurement.label"
              />
              <fwb-select v-model="newMeasurement.type" :options="measurementTypes" label="Type" />

              <Separator />

              <fwb-heading tag="h6" class="font-normal">Left channel</fwb-heading>
              <Dropzone v-model="newMeasurement.leftChannel" />

              <Separator />

              <fwb-heading tag="h6" class="font-normal">Right channel</fwb-heading>
              <Dropzone v-model="newMeasurement.rightChannel" />
            </template>

            <template #footer>
              <fwb-button color="alternative" size="md" @click="closeAddMeasurementModal">
                Cancel
              </fwb-button>
              <fwb-button color="default" size="md" @click="saveMeasurement">Save</fwb-button>
            </template>
          </Form>
        </template>
      </SideModal>
    </template>
  </MainLayout>
</template>
