<template>
  <fwb-table>
    <fwb-table-head>
      <fwb-table-head-cell
        v-for="(column, index) in columns"
        :class="index === 0 ? 'grow' : 'grow-0'"
      >
        {{ column.name }}
      </fwb-table-head-cell>
    </fwb-table-head>

    <fwb-table-body>
      <fwb-table-row v-for="(item, index) in data" :class="index === 0 ? 'grow' : 'grow-0'">
        <fwb-table-cell class="last:!text-left" v-for="column in columns">
          {{ getNestedValue(item, column.key) }}
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
}

const props = defineProps<{
  columns: Column[]
  data: any[]
}>()

function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj)
}
</script>
