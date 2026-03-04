<script setup lang="ts">
import { ref } from 'vue'
import TableActions from './table/Actions.vue'
import TableSearch from './table/Search.vue'
import TablePagination from './table/Pagination.vue'
import Loader from './Loader.vue'

const props = defineProps<{
  columns: TableColumn[]
  selectableRows?: boolean
  enableSearch?: boolean
  pageCount: number
}>()

const tableRows = defineModel<object[]>()
const currentPage = defineModel<number>('currentPage', { required: true })
const loading = defineModel<boolean>('loading', { required: true })
const selectedRows = ref([])
</script>

<template>
  <div>
    <TableActions>
      <template #search v-if="enableSearch">
        <TableSearch />
      </template>

      <template #actions>
        <slot name="actions" />
      </template>
    </TableActions>

    <div class="p-4 bg-gray-800 rounded-b-lg" v-if="loading">
      <Loader>
        <template #text>
          <slot name="text">Fetching data...</slot>
        </template>
      </Loader>
    </div>

    <div v-else>
      <fwb-table hoverable class="rounded-lg !rounded-t-none">
        <fwb-table-head>
          <fwb-table-head-cell v-if="selectableRows"> # </fwb-table-head-cell>

          <fwb-table-head-cell v-for="column in columns" :key="column.name">
            {{ column.name }}
          </fwb-table-head-cell>
        </fwb-table-head>

        <fwb-table-body>
          <fwb-table-row v-for="(item, index) in tableRows" :key="item['id' as keyof typeof item]">
            <fwb-table-cell v-if="selectableRows" class="w-4 p-4">
              <input
                v-model="selectedRows"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded \ focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 \ dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                :value="item['id' as keyof typeof item]"
                :id="`checkbox-table-${index}`"
              />
            </fwb-table-cell>

            <fwb-table-cell
              class="last:!text-left"
              v-for="(column, columnIndex) in columns"
              :key="column.name"
              :class="columnIndex === 0 ? 'w-1/2' : ''"
            >
              <fwb-a
                v-if="columnIndex === 0"
                :href="`${column.path}${item['id' as keyof typeof item]}${column.pathSuffix || ''}`"
              >
                {{ item[column.key as keyof typeof item] }}
              </fwb-a>
              <div v-else-if="column.key === 'created_at' || column.key === 'updated_at'">
                {{
                  new Date(item[column.key as keyof typeof item])
                    .toISOString()
                    .replace('T', ' ')
                    .substring(0, 16)
                }}
              </div>
              <div v-else>
                {{
                  column.nestedKey
                    ? column.nestedKey.reduce(
                        (resultObj, key) => resultObj[key as keyof typeof resultObj],
                        item,
                      )
                    : item[column.key as keyof typeof item]
                }}
              </div>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>

      <div class="flex justify-center p-4" v-if="pageCount > 1">
        <TablePagination v-model="currentPage" :page-count="pageCount" />
      </div>
    </div>
  </div>
</template>
