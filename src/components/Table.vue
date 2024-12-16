<template>
  <fwb-table hoverable>
    <fwb-table-head>
      <fwb-table-head-cell v-for="column in columns">
        {{ column.name }}
      </fwb-table-head-cell>
    </fwb-table-head>

    <fwb-table-body>
      <fwb-table-row v-for="item in data">
        <fwb-table-cell
          class="last:!text-left"
          v-for="(column, columnIndex) in columns"
          :class="columnIndex === 0 ? 'w-1/2' : ''"
        >
          <fwb-a v-if="columnIndex === 0" :href="`${column.path}${item.id}`">
            {{ getNestedValue(item, column.key) }}
          </fwb-a>
          <div v-else>
            {{ getNestedValue(item, column.key) }}
          </div>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>

<script setup lang="ts">
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'

interface Column {
  name: string
  key: string
  path?: string
}

const props = defineProps<{
  columns: Column[]
  data: any[]
}>()

function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj)
}
</script>
