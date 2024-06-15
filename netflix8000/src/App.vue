<script setup>
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";
import { useAuthStore } from "./stores/auth";
import { computed } from "vue";
import { useRecaptchaProvider } from 'vue-recaptcha'


// Create a global head instance

useRecaptchaProvider()
const authStore = useAuthStore();
const route = useRoute();

// Vérifier s'il existe un token d'authentification lors du chargement de la page
const token = localStorage.getItem("token");
if (token) {
  // Configurer les en-têtes axios avec le token
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 
  // Vérifier l'état de connexion de l'utilisateur
  authStore.checkAuthStatus();
} 

// Propriété calculée pour déterminer la visibilité du pied de footer
const showFooter = computed(() => route.name !== 'notFound');
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer v-show="showFooter"/>  
</template>

<style scoped>

</style>
