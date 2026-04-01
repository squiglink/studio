<script setup lang="ts">
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import Form from "@/components/Form.vue";
import { brandsServer } from "@/utils/server/brands";
import { modelsServer } from "@/utils/server/models";
import type { ServerCreateModel } from "@/utils/server/models";
import NetworkError from "@/components/NetworkError.vue";

const router = useRouter();
const loading = ref(false);
const fetchFailed = ref(false);

const initialModelFormState: Model = {
  name: "",
  brandId: "",
  errors: [],
};

const newModelForm = ref<Model>(initialModelFormState);

const brands = ref([] as { name: string; value: string }[]);

const fetchBrands = async () => {
  try {
    loading.value = true;
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
  } catch (error) {
    console.error(error);
    fetchFailed.value = true;
  } finally {
    loading.value = false;
  }
};

const convertToServerModel = (form: Model): ServerCreateModel => ({
  name: form.name,
  brand_id: form.brandId,
});

const createModel = async () => {
  loading.value = true;
  try {
    const serverModel: ServerCreateModel = convertToServerModel(newModelForm.value);
    const createdModel = await modelsServer.create(serverModel);
    toast.success("Model created successfully!");
    router.push({
      name: "editModel",
      params: { id: createdModel.id },
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBrands();
});
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
        {{ loading ? "Saving..." : "Save" }}
      </fwb-button>
    </template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <div v-else class="w-full max-w-2xl">
        <Form v-model="newModelForm.errors" @submit="createModel">
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
