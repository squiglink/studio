import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/databases/DatabasesView.vue'),
    },
    {
      path: '/databases',
      name: 'databases',
      component: () => import('../views/databases/DatabasesView.vue'),
    },
    {
      path: '/brands',
      name: 'brands',
      component: () => import('../views/brands/BrandsView.vue'),
    },
    {
      path: '/brands/new',
      name: 'newBrand',
      component: () => import('../views/brands/NewBrandView.vue'),
    },
    {
      path: '/brands/:id/edit',
      name: 'editBrand',
      component: () => import('../views/brands/EditBrandView.vue'),
    },
    {
      path: '/models',
      name: 'models',
      component: () => import('../views/models/ModelsView.vue'),
    },
    {
      path: '/models/new',
      name: 'newModel',
      component: () => import('../views/models/NewModelView.vue'),
    },
    {
      path: '/models/:id/edit',
      name: 'editModel',
      component: () => import('../views/models/EditModelView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/auth/verify',
      name: 'authVerify',
      component: () => import('../views/auth/AuthVerifyView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/PageNotFoundView.vue'),
    },
  ],
})

export default router
