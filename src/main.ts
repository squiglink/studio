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
  FwbSpinner,
  FwbAlert,
  FwbInput,
} from 'flowbite-vue'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

const components = {
  Icon,
  FwbSidebar,
  FwbSidebarItem,
  FwbSidebarLogo,
  FwbSidebarItemGroup,
  FwbButton,
  FwbA,
  FwbAlert,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbSpinner,
  FwbInput,
}

Object.entries(components).forEach(([name, component]) => {
  app.component(name, component)
})

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  // ...
} as ToastContainerOptions)

app.mount('#app')
