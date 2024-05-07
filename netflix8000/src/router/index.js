import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    {
      path: '/netflix',
      name: 'netflix',
      component: () => import('../views/NetflixView.vue')
    }
  ]
});
  // router.beforeEach((to, from, next) => {
  //   if (to.meta.requiresAuth) {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       // User is authenticated, proceed to the route
  //       next();
  //     } else {
  //       // User is not authenticated, redirect to login
  //       next('/login');
  //     }
  //   } else {
  //     // Non-protected route, allow access
  //     next();
  //   }
  // });

export default router
