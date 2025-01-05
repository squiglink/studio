<script setup lang="ts">
import { ref } from 'vue'
import TableActions from './table/Actions.vue'
import TableSearch from './table/Search.vue'

const props = defineProps<{
  columns: TableColumn[]
  data: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  selectableRows?: boolean
}>()

const selectedRows = ref([])
</script>

<template>
  <div>
    <TableActions>
      <template #search>
        <TableSearch />
      </template>

      <template #actions>
        <slot name="actions" />
      </template>
    </TableActions>

    <fwb-table hoverable class="rounded-lg !rounded-t-none">
      <fwb-table-head>
        <fwb-table-head-cell v-if="selectableRows"> # </fwb-table-head-cell>

        <fwb-table-head-cell v-for="column in columns" :key="column.name">
          {{ column.name }}
        </fwb-table-head-cell>
      </fwb-table-head>

      <fwb-table-body>
        <fwb-table-row v-for="(item, index) in data" :key="item.id">
          <fwb-table-cell v-if="selectableRows" class="w-4 p-4">
            <input
              v-model="selectedRows"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded \ focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 \ dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              :value="item.id"
              :id="`checkbox-table-${index}`"
            />
          </fwb-table-cell>

          <fwb-table-cell
            class="last:!text-left"
            v-for="(column, columnIndex) in columns"
            :key="column.name"
            :class="columnIndex === 0 ? 'w-1/2' : ''"
          >
            <fwb-a v-if="columnIndex === 0" :href="`${column.path}${item.id}`">
              {{ item[column.key] }}
            </fwb-a>
            <div v-else>
              {{ item[column.key] }}
            </div>
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
  </div>
</template>
