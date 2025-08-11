import './assets/main.css'
import '@fontsource/inter'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Icon } from '@iconify/vue'
import {
  FwbA,
  FwbAlert,
  FwbButton,
  FwbButtonGroup,
  FwbCard,
  FwbInput,
  FwbSidebar,
  FwbSidebarItem,
  FwbSidebarItemGroup,
  FwbSidebarLogo,
  FwbSpinner,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

const components = {
  FwbA,
  FwbAlert,
  FwbButton,
  FwbButtonGroup,
  FwbCard,
  FwbInput,
  FwbSidebar,
  FwbSidebarItem,
  FwbSidebarItemGroup,
  FwbSidebarLogo,
  FwbSpinner,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  Icon,
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
