import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/netflix',
      name: 'netflix',
      component: () => import('../views/NetflixView.vue'),
      meta: { requiresAuth: true } 
      // Indiquer que cette page nécessite une authentification
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!authStore.isLoggedIn) {
//       next({ name: "home" });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router
