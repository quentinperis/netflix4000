<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import home from "@/components/home.vue";
import signUp from "@/components/signUp.vue";
import SignIn from "@/components/SignIn.vue";
import { useAuthStore } from "@/stores/auth";
import Reconnection from "@/components/Reconnection.vue";
import router from "@/router";
import axios from "axios";

const authStore = useAuthStore();

const showSignUp = ref(false);
const showSignIn = ref(false);
const showInput = ref(true);
const reconnection = ref(false);

// SWITCHER ENTRE LES COMPOSANTS SignIn et SignUp
const handleShowSignUp = () => {
  showSignUp.value = true;
  showSignIn.value = false;
  showInput.value = false;
};
const handleShowSignIn = () => {
  showSignIn.value = true;
  showSignUp.value = false;
  showInput.value = false;
};

// POUR FERMER MODAL

const handleCloseModals = () => {
  reconnection.value = false;
  showSignIn.value = false;
  showSignUp.value = false;
  showInput.value = true;
};

// DECONNECTION
const handleLogout = () => {
  localStorage.removeItem("token");
  reconnection.value = false;
  showSignIn.value = false;
  showSignUp.value = false;
  showInput.value = true;
  authStore.logout();
  router.push("/");
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      reconnection.value = true;

      router.push("/");

      authStore.logout();
    }
    return Promise.reject(error);
  }
);
</script>

<template>
  <div>
    <RouterLink to="/">
      <img
        class="logo"
        src="/image/Logonetflix.png"
        alt="Image logo"
        @click="handleCloseModals"
      />
    </RouterLink>
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
      <home
        class="modal"
        v-if="showInput && !reconnection"
        @showSignUp="handleShowSignUp"
      />
      <div class="dashboard-sign-in">
        <button
          id="signin-button"
          class="btn"
          @click="handleShowSignIn"
          v-if="showInput && !reconnection"
        >
          Sign In
        </button>
      </div>
      <Reconnection v-if="reconnection" @="handleCloseModals" />
      <SignIn v-if="showSignIn && !reconnection" @="handleCloseModals" />
      <signUp v-if="showSignUp" @="handleCloseModals" />
    </template>
  </div>
</template>

<style scoped>
.user-dashboard {
  display: flex;
  align-items: center;
  color: white;
  z-index: 1;
  position: absolute;
  top: 25px;
  right: 75px;
}

.dashboard-sign-in {
  height: 40px;
  width: 70px;
  display: flex;
  color: white;
  z-index: 1;
  top: 25px;
  right: 75px;
  position: absolute;
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

.btn {
  height: 40px;
  width: 70px;
  background-color: #de0510;
  color: white;
  padding: 7px 13px;
  z-index: 1;
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
  z-index: 1;
  cursor: pointer;
}

.modal {
  z-index: 2;
}

.overlay {
  position: absolute;
  width: 100%;
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

}
</style>
