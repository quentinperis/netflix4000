import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NavigationPageEntre from '@/views/NavigationPageEntre.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    { path: '/joker', name: 'Joker', component: JokerView  },
    {
      path: '/NavigationPageEntre',
      name: 'NavigationPageEntre',
      component: () => import('../views/NavigationPageEntre.vue')
    }
  ]
})

export default router

