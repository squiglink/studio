<script setup lang="ts">
import Form from "@/components/Form.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import NetworkError from "@/components/NetworkError.vue";
import { databasesServer } from "@/utils/server/databases";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const databaseId = route.params.id as string;

const kinds = [
  { name: "Earbuds", value: "earbuds" },
  { name: "Headphones", value: "headphones" },
  { name: "IEMs", value: "iems" },
];

const fetchFailed = ref(false);
const saving = ref(false);
const editDatabaseForm = ref<Database>({ kind: "", path: "", errors: [] });

const updateDatabase = async () => {
  saving.value = true;
  try {
    await databasesServer.update(databaseId, {
      kind: editDatabaseForm.value.kind,
      path: editDatabaseForm.value.path,
    });
    toast.success("Successfully updated the database.");
    router.push({ name: "databases" });
  } catch (error) {
    console.error(error);
    toast.error("Failed to update the database.");
    saving.value = false;
  }
};

onMounted(async () => {
  try {
    const database = await databasesServer.get(databaseId);
    editDatabaseForm.value.kind = database.kind;
    editDatabaseForm.value.path = database.path;
  } catch (error) {
    console.error(error);
    fetchFailed.value = true;
  }
});
</script>

<template>
  <MainLayout>
    <template #header-text v-if="!fetchFailed">Edit database</template>
    <template #header-buttons v-if="!fetchFailed">
      <fwb-button
        color="alternative"
        size="md"
        tag="router-link"
        :href="{ name: 'databases' }"
        class="flex justify-center"
      >
        Cancel
      </fwb-button>
      <fwb-button color="default" size="md" @click="updateDatabase" :disabled="saving">
        {{ saving ? "Saving..." : "Save" }}
      </fwb-button>
    </template>

    <template #content>
      <NetworkError v-if="fetchFailed" />
      <Form v-else v-model="editDatabaseForm.errors" class="w-1/4">
        <template #content>
          <fwb-select
            v-model="editDatabaseForm.kind"
            :options="kinds"
            label="Kind"
            placeholder="(required)"
          />
          <fwb-input
            label="Path"
            placeholder="(required)"
            size="md"
            v-model="editDatabaseForm.path"
            required
          />
        </template>
      </Form>
    </template>
  </MainLayout>
</template>
