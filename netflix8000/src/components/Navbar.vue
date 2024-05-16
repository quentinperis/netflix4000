<script setup>
import Home from "@/components/Home.vue";
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";
import Reconnection from "@/components/Reconnection.vue";
import router from "@/router";
import axios from "axios";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useModalsStore } from "@/stores/modals";

const authStore = useAuthStore();
const modalStore = useModalsStore();

const handleSignIn = () => {
  modalStore.handleShowSignIn();
  // Remonter en haut de la page après l'affichage de la modal
  window.scrollTo(0, 0);
}

const handleShowHome = () => {
  modalStore.handleCloseModals();
  // Remonter en haut de la page après l'affichage de la modal
  window.scrollTo(0, 0);
}

// DECONNECTION
const handleLogout = () => {
  localStorage.removeItem("token");
  modalStore.handleCloseModals();
  window.scrollTo(0, 0);
  authStore.logout();
  router.push("/");
};

axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Session expired') {
          modalStore.reconnection = true;
          authStore.logout();
          router.push("/");
        } else {
          modalStore.errorMessage = true;
        }
      }
      return Promise.reject(error);
    }
  );


</script>

<template>
  <div>
    <div >
      <RouterLink :to="!authStore.isLoggedIn ? '/' : '/netflix'">
        <img class="logo" src="/image/Logonetflix.png" alt="Image logo" @click="handleShowHome" />
      </RouterLink>
    </div>
  </div>

  <div class="overlay">
    <template v-if="authStore.isLoggedIn">
      <!-- Si l'utilisateur est connecté, afficher le bouton de déconnexion -->
      <div class="user-dashboard">
        <span class="username">{{ authStore.username }}</span>
        <button class="btn" @click="handleLogout">Logout</button>
      </div>
    </template>

    <template v-else>
      <!-- Ajout de la condition pour cacher le composant Reconnection -->
      <Home class="modal" v-if="modalStore.showInput && !modalStore.reconnection" />
      <div class="dashboard-sign-in">

        <button id="signin-button" class="btn" @click="handleSignIn"
          v-if="modalStore.showInput && !modalStore.reconnection">
          Sign In
        </button>

      </div>
      <Reconnection v-if="modalStore.reconnection"/>
      <SignIn v-if="modalStore.showSignIn && !modalStore.reconnection"/>
      <SignUp v-if="modalStore.showSignUp && !modalStore.reconnection"/>
    </template>
  </div>
</template>

<style scoped>
.user-dashboard {
  display: flex;
  color: white;
  justify-content: end;
  align-items: center;
  z-index: 3;
  position: relative;
  width: 100%;
  margin-top: 25px;
  padding-right: 75px;
}

.dashboard-sign-in {
  height: 40px;
  width: 70px;
  display: flex;
  color: white;
  z-index: 3;
  top: 25px;
  right: 75px;
  position: absolute;
}

.btn {
  height: 40px;
  width: 70px;
  background-color: #de0510;
  color: white;
  padding: 7px 13px;
  z-index: 3;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn:hover {
  background-color: #c11119;
}

.logo {
  position: absolute;
  margin-top: 25px;
  margin-left: 75px;
  height: 51px;
  width: 150px;
  z-index: 3;
  cursor: pointer;
}

.modal {
  z-index: 2;
}


.overlay {
  position: absolute;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.user-dashboard span {
  padding: 10px 30px 10px;
}

a {
  color: white;
  text-decoration: none;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.9);
}

.username {
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.9);
}
</style>
