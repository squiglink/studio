import './assets/main.css'
import '@fontsource/inter'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Icon } from '@iconify/vue'
import {
  FwbSidebar,
  FwbSidebarItem,
  FwbSidebarLogo,
  FwbSidebarItemGroup,
  FwbButton,
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'

const app = createApp(App)

app
  .component('Icon', Icon)
  .component('FwbSidebar', FwbSidebar)
  .component('FwbSidebarItem', FwbSidebarItem)
  .component('FwbSidebarLogo', FwbSidebarLogo)
  .component('FwbSidebarItemGroup', FwbSidebarItemGroup)
  .component('FwbButton', FwbButton)
  .component('FwbA', FwbA)
  .component('FwbTable', FwbTable)
  .component('FwbTableBody', FwbTableBody)
  .component('FwbTableCell', FwbTableCell)
  .component('FwbTableHead', FwbTableHead)
  .component('FwbTableHeadCell', FwbTableHeadCell)
  .component('FwbTableRow', FwbTableRow)

app.use(createPinia())
app.use(router)

app.mount('#app')
