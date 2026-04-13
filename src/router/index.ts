import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import("../views/auth/AuthVerifyView.vue"),
      name: "authVerify",
      path: "/auth/verify",
    },
    {
      component: () => import("../views/auth/LoginView.vue"),
      name: "login",
      path: "/login",
    },
    {
      component: () => import("../views/brands/BrandsView.vue"),
      name: "brands",
      path: "/brands",
    },
    {
      component: () => import("../views/brands/EditBrandView.vue"),
      name: "editBrand",
      path: "/brands/:id/edit",
    },
    {
      component: () => import("../views/brands/NewBrandView.vue"),
      name: "newBrand",
      path: "/brands/new",
    },
    {
      component: () => import("../views/databases/DatabasesView.vue"),
      name: "databases",
      path: "/databases",
    },
    {
      component: () => import("../views/databases/DatabasesView.vue"),
      name: "home",
      path: "/",
    },
    {
      component: () => import("../views/databases/EditDatabaseView.vue"),
      name: "editDatabase",
      path: "/databases/:id/edit",
    },
    {
      component: () => import("../views/databases/NewDatabaseView.vue"),
      name: "newDatabase",
      path: "/databases/new",
    },
    {
      component: () => import("../views/models/EditModelView.vue"),
      name: "editModel",
      path: "/models/:id/edit",
    },
    {
      component: () => import("../views/models/ModelsView.vue"),
      name: "models",
      path: "/models",
    },
    {
      component: () => import("../views/models/NewModelView.vue"),
      name: "newModel",
      path: "/models/new",
    },
    {
      component: () => import("../views/PageNotFoundView.vue"),
      path: "/:pathMatch(.*)*",
    },
  ],
});

export default router;
