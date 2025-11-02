<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

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

const newModelForm = ref<Model>(initialModelFormState)
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

const createModel = async () => {
  // loading.value = true
  // try {
  //   const apiModel: APIModel = convertToAPIModel(newModelForm.value)
  //   await modelsApi.create(apiModel)
  // }
}

onMounted(() => {
  fetchBrands()
  fetchDatabases()
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
      <fwb-button color="default" size="md" @click="createModel">Save</fwb-button>
    </template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <div v-else class="grid grid-cols-4">
        <Form v-model="newModelForm.errors" class="col-span-3">
          <template #content>
            <fwb-select v-model="newModelForm.brandId" :options="brands" label="Brand" />
            <fwb-input
              label="Name"
              name="name"
              placeholder="(required)"
              size="md"
              v-model="newModelForm.name"
              required
            />
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
              <fwb-button color="default" size="md">Save</fwb-button>
            </template>
          </Form>
        </template>
      </SideModal>
    </template>
  </MainLayout>
</template>
