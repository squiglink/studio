<script setup lang="ts">
import Form from "@/components/Form.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import NetworkError from "@/components/NetworkError.vue";
import { brandsServer } from "@/utils/server/brands";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const brandId = route.params.id as string;

const fetchFailed = ref(false);
const loading = ref(false);
const editBrandForm = ref<Brand>({ name: "", errors: [] });

const updateBrand = async () => {
  loading.value = true;
  try {
    await brandsServer.edit(brandId, { name: editBrandForm.value.name });
    toast.success("Successfully updated the brand.");
    router.push({ name: "brands" });
  } catch (error) {
    console.error(error);
    toast.error("Failed to update the brand.");
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    const brand = await brandsServer.get(brandId);
    editBrandForm.value.name = brand.name;
  } catch (error) {
    console.error(error);
    fetchFailed.value = true;
  }
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
