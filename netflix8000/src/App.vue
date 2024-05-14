<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();


const checkAuthentication = async () => {
  const token = localStorage.getItem("token");
  if (token) {

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
    // Vérifier l'état de connexion de l'utilisateur
    await authStore.checkAuthStatus();
  } 
};

checkAuthentication();

</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />  
</template>

<style scoped>

</style>
