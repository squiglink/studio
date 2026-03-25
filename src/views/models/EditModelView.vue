<script setup lang="ts">
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import Form from "@/components/Form.vue";
import SideModal from "@/components/SideModal.vue";
import Separator from "@/components/Separator.vue";
import Dropzone from "@/components/Dropzone.vue";
import { databasesServer } from "@/utils/server/databases";
import { brandsServer } from "@/utils/server/brands";
import { modelsServer } from "@/utils/server/models";
import { measurementsServer } from "@/utils/server/measurements";
import type { ServerMeasurement } from "@/utils/server/measurements";
import { evaluationsServer } from "@/utils/server/evaluations";
import type { ServerEvaluation } from "@/utils/server/evaluations";
import { useAuthenticationStore } from "@/stores/authentication";
import NetworkError from "@/components/NetworkError.vue";

const authenticationStore = useAuthenticationStore();

const route = useRoute();
const router = useRouter();
const modelId = route.params.id as string;

const addMeasurementModalShown = ref(false);
const addEvaluationModalShown = ref(false);
const loading = ref(false);
const saving = ref(false);
const fetchFailed = ref(false);

const openAddMeasurementModal = () => {
  addMeasurementModalShown.value = true;
};

const closeAddMeasurementModal = () => {
  addMeasurementModalShown.value = false;
};

const openAddEvaluationModal = () => {
  if (existingEvaluation.value) {
    newEvaluation.value.reviewScore = existingEvaluation.value.review_score;
    newEvaluation.value.reviewUrl = existingEvaluation.value.review_url;
    newEvaluation.value.shopUrl = existingEvaluation.value.shop_url;
  } else {
    newEvaluation.value = { ...initialEvaluationFormState };
  }
  addEvaluationModalShown.value = true;
};

const closeAddEvaluationModal = () => {
  addEvaluationModalShown.value = false;
};

const initialModelFormState: Model = {
  name: "",
  brandId: "",
  errors: [],
};

const initialMeasurementFormState: Measurement = {
  label: "",
  type: "",
  databaseId: "",
  leftChannel: [],
  rightChannel: [],
  errors: [],
};

const initialEvaluationFormState: Evaluation = {
  reviewUrl: null,
  reviewScore: null,
  shopUrl: null,
  errors: [],
};

const editModelForm = ref<Model>({ ...initialModelFormState });
const newMeasurement = ref<Measurement>({
  ...initialMeasurementFormState,
  leftChannel: [],
  rightChannel: [],
});
const newEvaluation = ref<Evaluation>({ ...initialEvaluationFormState });

const measurements = ref<ServerMeasurement[]>([]);
const existingEvaluation = ref<ServerEvaluation | null>(null);

const measurementTypes = [
  { name: "Frequency response", value: "frequency_response" },
  { name: "Harmonic distortion", value: "harmonic_distortion" },
  { name: "Impedance", value: "impedance" },
  { name: "Sound isolation", value: "sound_isolation" },
];

const measurementTypeLabel = (kind: string) => {
  return measurementTypes.find((t) => t.value === kind)?.name ?? kind;
};

const databases = ref([] as { name: string; value: string }[]);
const brands = ref([] as { name: string; value: string }[]);

const fetchBrands = async () => {
  const response = await brandsServer.all(1, "");
  brands.value.push(...response.page.map((brand) => ({ name: brand.name, value: brand.id })));

  if (response.page_count > 1) {
    for (let i = 2; i <= response.page_count; i++) {
      const pageResponse = await brandsServer.all(i, "");
      brands.value.push(
        ...pageResponse.page.map((brand) => ({ name: brand.name, value: brand.id })),
      );
    }
  }
};

const fetchDatabases = async () => {
  const response = await databasesServer.all(1, "");
  databases.value.push(
    ...response.page.map((database) => ({
      name: `${database.kind} (${database.path})`,
      value: database.id,
    })),
  );

  if (response.page_count > 1) {
    for (let i = 2; i <= response.page_count; i++) {
      const pageResponse = await databasesServer.all(i, "");
      databases.value.push(
        ...pageResponse.page.map((database) => ({
          name: `${database.kind} (${database.path})`,
          value: database.id,
        })),
      );
    }
  }
};

const fetchModel = async () => {
  const firstResponse = await modelsServer.all(1, "");
  const found = firstResponse.page.find((m) => m.id === modelId);
  if (found) {
    editModelForm.value.name = found.name;
    editModelForm.value.brandId = found.brand.id;
    return;
  }

  for (let i = 2; i <= firstResponse.page_count; i++) {
    const pageResponse = await modelsServer.all(i, "");
    const found = pageResponse.page.find((m) => m.id === modelId);
    if (found) {
      editModelForm.value.name = found.name;
      editModelForm.value.brandId = found.brand.id;
      return;
    }
  }

  fetchFailed.value = true;
};

const fetchEvaluation = async () => {
  try {
    const evaluation = await evaluationsServer.get(authenticationStore.userId, modelId);
    existingEvaluation.value = evaluation;
    newEvaluation.value.reviewScore = evaluation.review_score;
    newEvaluation.value.reviewUrl = evaluation.review_url;
    newEvaluation.value.shopUrl = evaluation.shop_url;
  } catch (error: any) {
    if (error.response?.status !== 404) {
      throw error;
    }
  }
};

const fetchMeasurements = async () => {
  for (const db of databases.value) {
    const dbMeasurements = await measurementsServer.all(db.value, modelId);
    measurements.value.push(...dbMeasurements);
  }
};

const saveMeasurement = async () => {
  saving.value = true;
  try {
    let leftChannelText: string | undefined;
    let rightChannelText: string | undefined;

    if (newMeasurement.value.leftChannel.length > 0) {
      leftChannelText = await newMeasurement.value.leftChannel[0].text();
    }
    if (newMeasurement.value.rightChannel.length > 0) {
      rightChannelText = await newMeasurement.value.rightChannel[0].text();
    }

    const created = await measurementsServer.create({
      model_id: modelId,
      database_id: newMeasurement.value.databaseId,
      kind: newMeasurement.value.type,
      label: newMeasurement.value.label,
      left_channel: leftChannelText,
      right_channel: rightChannelText,
    });

    measurements.value.push(created);
    toast.success("Measurement created successfully!");

    newMeasurement.value = {
      ...initialMeasurementFormState,
      leftChannel: [],
      rightChannel: [],
    };
    closeAddMeasurementModal();
  } catch (error) {
    console.error(error);
    toast.error("Failed to create measurement.");
  } finally {
    saving.value = false;
  }
};

const deleteMeasurement = async (id: string) => {
  try {
    await measurementsServer.remove(id);
    measurements.value = measurements.value.filter((m) => m.id !== id);
    toast.success("Measurement deleted successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete measurement.");
  }
};

const saveEvaluation = async () => {
  saving.value = true;
  try {
    if (existingEvaluation.value) {
      const updated = await evaluationsServer.update(existingEvaluation.value.id, {
        review_score: newEvaluation.value.reviewScore,
        review_url: newEvaluation.value.reviewUrl,
        shop_url: newEvaluation.value.shopUrl,
      });
      existingEvaluation.value = updated;
      toast.success("Evaluation updated successfully!");
      closeAddEvaluationModal();
    } else {
      const created = await evaluationsServer.create({
        model_id: modelId,
        review_score: newEvaluation.value.reviewScore,
        review_url: newEvaluation.value.reviewUrl,
        shop_url: newEvaluation.value.shopUrl,
      });
      existingEvaluation.value = created;
      toast.success("Evaluation created successfully!");
      closeAddEvaluationModal();
    }
  } catch (error: any) {
    if (error.response?.status === 409) {
      toast.error("An evaluation already exists for this model.");
    } else {
      console.error(error);
      toast.error("Failed to save evaluation.");
    }
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    await Promise.all([fetchBrands(), fetchDatabases(), fetchModel()]);
    await Promise.all([fetchMeasurements(), fetchEvaluation()]);
  } catch (error) {
    console.error(error);
    fetchFailed.value = true;
  } finally {
    loading.value = false;
  }
});
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
        Back
      </fwb-button>
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
              disabled
            />
            <fwb-input
              label="Model name"
              name="name"
              placeholder="required"
              size="md"
              v-model="editModelForm.name"
              disabled
            />

            <div>
              <div class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Measurements
              </div>
              <fwb-card class="p-4 !max-w-full">
                <div
                  v-for="measurement in measurements"
                  :key="measurement.id"
                  class="flex justify-between items-center p-3 bg-gray-800 rounded-lg mb-2"
                >
                  <div>
                    <span class="text-sm font-medium text-white">{{ measurement.label }}</span>
                    <span class="text-xs text-gray-400 ml-2">
                      ({{ measurementTypeLabel(measurement.kind) }})
                    </span>
                  </div>
                  <fwb-button color="red" size="xs" @click="deleteMeasurement(measurement.id)">
                    Delete
                  </fwb-button>
                </div>
                <div class="flex justify-end" :class="{ 'mt-2': measurements.length > 0 }">
                  <fwb-button color="default" size="sm" @click="openAddMeasurementModal">
                    Add new measurement
                    <template #suffix>
                      <Icon icon="flowbite:plus-outline" width="16" height="16" />
                    </template>
                  </fwb-button>
                </div>
              </fwb-card>
            </div>

            <div>
              <div class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Evaluation
              </div>
              <fwb-card class="p-4 !max-w-full">
                <div class="flex justify-end mb-6">
                  <fwb-button color="default" size="sm" @click="openAddEvaluationModal">
                    {{ existingEvaluation ? "Update evaluation" : "Add evaluation" }}
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
                    :model-value="existingEvaluation?.review_score"
                    disabled
                  />
                  <fwb-input
                    label="Review URL"
                    name="reviewUrl"
                    placeholder="optional"
                    size="md"
                    :model-value="existingEvaluation?.review_url"
                    disabled
                  />
                  <fwb-input
                    label="Shop URL"
                    name="shopUrl"
                    placeholder="optional"
                    size="md"
                    :model-value="existingEvaluation?.shop_url"
                    disabled
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
              <fwb-select
                v-model="newMeasurement.databaseId"
                :options="databases"
                label="Database"
                placeholder="required"
              />

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
              <fwb-button color="default" size="md" @click="saveMeasurement" :disabled="saving">
                {{ saving ? "Saving..." : "Save" }}
              </fwb-button>
            </template>
          </Form>
        </template>
      </SideModal>

      <SideModal v-model="addEvaluationModalShown">
        <template #header-text>
          {{ existingEvaluation ? "Update evaluation" : "Add evaluation" }}
        </template>

        <template #content>
          <Form v-model="newEvaluation.errors">
            <template #content>
              <fwb-input
                label="Review score"
                name="reviewScore"
                placeholder="optional"
                size="md"
                type="number"
                v-model="newEvaluation.reviewScore"
              />
              <fwb-input
                label="Review link"
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
            </template>

            <template #footer>
              <fwb-button color="alternative" size="md" @click="closeAddEvaluationModal">
                Cancel
              </fwb-button>
              <fwb-button color="default" size="md" @click="saveEvaluation" :disabled="saving">
                {{ saving ? "Saving..." : "Save" }}
              </fwb-button>
            </template>
          </Form>
        </template>
      </SideModal>
    </template>
  </MainLayout>
</template>
