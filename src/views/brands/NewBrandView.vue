<script setup lang="ts">
import { brandsServer } from "@/utils/server/brands";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

import type { ServerBrandPayload } from "@/utils/server/brands";

import MainLayout from "@/layouts/MainLayout.vue";
import Form from "@/components/Form.vue";

const router = useRouter();

const initialBrandFormState: Brand = {
  name: "",
  errors: [],
};

const loading = ref(false);
const newBrandForm = ref<Brand>(initialBrandFormState);

const convertToServerBrand = (form: Brand): ServerBrandPayload => ({
  name: form.name,
});

const createBrand = async () => {
  loading.value = true;
  try {
    const serverBrand: ServerBrandPayload = convertToServerBrand(newBrandForm.value);
    await brandsServer.create(serverBrand);

    toast.success("Successfully created the brand.");

    router.push({ name: "brands" });
  } catch (error) {
    console.error(error);
    toast.error("Failed to create the brand.");

    loading.value = false;
  }
};
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
