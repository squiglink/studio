<script setup lang="ts">
import { brandsServer } from "@/utils/server/brands";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";

import type { ServerBrandPayload } from "@/utils/server/brands";

import MainLayout from "@/layouts/MainLayout.vue";
import Form from "@/components/Form.vue";
import NetworkError from "@/components/NetworkError.vue";

const router = useRouter();
const route = useRoute();

const initialBrandFormState: Brand = {
  name: "",
  errors: [],
};

const loading = ref(false);
const fetchFailed = ref(false);
const editBrandForm = ref<Brand>(initialBrandFormState);

const convertToServerBrand = (form: Brand): ServerBrandPayload => ({
  name: form.name,
});

const updateBrand = async () => {
  loading.value = true;
  try {
    const serverBrand: ServerBrandPayload = convertToServerBrand(editBrandForm.value);
    await brandsServer.edit(route.params.id as string, serverBrand);

    toast.success("Brand updated successfully!");

    router.push({ name: "brands" });
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
};

onMounted(async () => {
  // TODO: Get the brand based from the ID.
});
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Edit brand</template>
    <template #header-buttons v-if="!fetchFailed">
      <fwb-button
        color="alternative"
        size="md"
        tag="router-link"
        :href="{ name: 'brands' }"
        class="flex justify-center"
      >
        Cancel
      </fwb-button>
      <fwb-button color="default" size="md" @click="updateBrand">Save</fwb-button>
    </template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <Form v-else v-model="editBrandForm.errors" class="w-1/4">
        <template #content>
          <fwb-input
            label="Name"
            placeholder="(required)"
            size="md"
            v-model="editBrandForm.name"
            required
          />
        </template>
      </Form>
    </template>
  </MainLayout>
</template>
