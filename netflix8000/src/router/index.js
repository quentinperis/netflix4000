import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import { useAuthStore } from "@/stores/auth";
import { instance as axios } from "@/api/axios"; 
import { useModalsStore } from "@/stores/modals";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/netflix",
      name: "netflix",
      component: () => import("../views/NetflixView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: PageNotFoundView,
    },
  ],
});

// Fonction exécutée avant chaque navigation
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  // l'utilisateur est connecté && ❗️ Éviter les boucles de redirection infinies
  if (authStore.isLoggedIn && to.name === "home") {
    return { name: "netflix" }; //  Redirection de l'utilisateur connecté à la page Netflix
  }
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const modalStore = useModalsStore();
      const authStore = useAuthStore();
      if (error.response.data.message === "Session expired") {
        modalStore.reconnection = true;
        localStorage.removeItem("token");
        authStore.logout();
        router.push("/");
      } 
    }
    return Promise.reject(error);
  }
);

export default router;
