import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/singin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/singup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    }
  ]
})

export default router
