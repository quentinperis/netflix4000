import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'

const routes = [
  {path: "/", component: HomeView},
  {path: "/signin", component: SignIn},
  {path: "/signup", component: SignUp},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

