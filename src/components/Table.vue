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
            {{ item[column.key] }}
          </fwb-a>
          <div v-else>
            {{ item[column.key] }}
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

const props = defineProps<{
  columns: TableColumn[]
  data: any[]
}>()
</script>
