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

const components = {
  Icon,
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
  FwbTableRow
}

Object.entries(components).forEach(([name, component]) => {
  app.component(name, component)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
