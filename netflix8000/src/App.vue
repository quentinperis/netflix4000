<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

// Vérifier s'il existe un token d'authentification lors du chargement de la page
const token = localStorage.getItem("token");
if (token) {
  // Configurer les en-têtes axios avec le token
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 
  // Vérifier l'état de connexion de l'utilisateur
  authStore.checkAuthStatus();
} 


</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped>

</style>
