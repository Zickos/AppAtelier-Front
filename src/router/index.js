import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },

  {
    path: "/404",
    name: "404",
    component: () => import("../views/404View.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/planninggeneral",
    name: "planninggeneral",
    component: () => import("../views/PlanningGeneralView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/planningpersonnel",
    name: "planningpersonnel",
    component: () => import("../views/PlanningPersonnelView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/planningtv",
    name: "planningtv",
    component: () => import("../views/PlanningTvView.vue"),
    meta: { requiresAuth: true },
  },
  
  {
    path: "/vehiclelist",
    name: "vehiclelist",
    component: () => import("../views/VehicleListView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/userlist",
    name: "userlist",
    component: () => import("../views/UserListView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/gestionplanningmecano",
    name: "gestionplanningmecano",
    component: () => import("../views/GestionPlanningMecanoView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/gestionplanningmagasin",
    name: "gestionplanningmagasin",
    component: () => import("../views/GestionPlanningMagasinView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/gestionvehicle",
    name: "gestionvehicle",
    component: () => import("../views/GestionVehicleView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/gestionretrofit",
    name: "gestionretrofit",
    component: () => import("../views/GestionRetrofitView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/gestiondemande",
    name: "gestiondemande",
    component: () => import("../views/GestionDemandeView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ⛔ Navigation Guard pour protéger les routes
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // Non connecté → redirection login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next({ name: "login" });
  }

  // Connecté mais pas admin → redirection home
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next({ name: "home" });
  }

  // Tout est OK → on continue
  next();
});

export default router;
