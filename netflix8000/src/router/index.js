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

    }
  ]
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (
    authStore.isLoggedIn && to.name !== 'netflix'
    // проверка, что пользователь авторизован && ❗️ Избежать бесконечного перенаправления
  ) {
    // перенаправить пользователя на страницу входа
    return { name: 'netflix' }
  }
})


export default router
