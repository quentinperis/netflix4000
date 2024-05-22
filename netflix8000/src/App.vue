<script setup>
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";
import { useAuthStore } from "./stores/auth";
import { computed } from "vue";

const authStore = useAuthStore();
const route = useRoute();

// Quand le user est connecté : vérifier s'il existe un token lors du chargement de la page
const token = localStorage.getItem("token");
if (token) {
  // Configurer les en-têtes axios avec le token
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // Vérifier l'état de connexion de l'utilisateur
  authStore.checkAuthStatus();
}

// Propriété calculée pour déterminer la visibilité du pied de footer
const showFooter = computed(() => route.name !== 'home' && route.name !== 'notFound');


</script>

<template>
  <div class="app-container">
    <Navbar />
    <div class="content-container">
      <RouterView />
    </div>
    <Footer v-show="showFooter" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
  position: relative;
}
</style>