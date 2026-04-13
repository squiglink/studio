<script setup lang="ts">
import Form from "@/components/Form.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import type { ServerDatabasePayload } from "@/utils/server/databases";
import { databasesServer } from "@/utils/server/databases";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();

const kinds = [
  { name: "Earbuds", value: "earbuds" },
  { name: "Headphones", value: "headphones" },
  { name: "IEMs", value: "iems" },
];

const loading = ref(false);
const newDatabaseForm = ref<Database>({ kind: "", path: "", errors: [] });

const createDatabase = async () => {
  loading.value = true;
  try {
    const payload: ServerDatabasePayload = {
      kind: newDatabaseForm.value.kind,
      path: newDatabaseForm.value.path,
    };
    await databasesServer.create(payload);

    toast.success("Successfully created the database.");

    router.push({ name: "databases" });
  } catch (error) {
    console.error(error);
    toast.error("Failed to create the database.");

    loading.value = false;
  }
};
</script>

<template>
  <MainLayout>
    <template #header-text>Add new database</template>
    <template #header-buttons>
      <fwb-button
        color="alternative"
        size="md"
        tag="router-link"
        :href="{ name: 'databases' }"
        class="flex justify-center"
      >
        Cancel
      </fwb-button>
      <fwb-button color="default" size="md" @click="createDatabase" :disabled="loading">
        {{ loading ? "Saving..." : "Save" }}
      </fwb-button>
    </template>

    <template #content>
      <Form v-model="newDatabaseForm.errors" class="w-1/4">
        <template #content>
          <fwb-select
            v-model="newDatabaseForm.kind"
            :options="kinds"
            label="Kind"
            placeholder="(required)"
          />
          <fwb-input
            label="Path"
            placeholder="(required)"
            size="md"
            v-model="newDatabaseForm.path"
            required
          />
        </template>
      </Form>
    </template>
  </MainLayout>
</template>
