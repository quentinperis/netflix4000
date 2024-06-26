<script setup>
import router from "@/router";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useModalsStore } from "@/stores/modals";
import { computed } from "vue";


const authStore = useAuthStore();
const modalStore = useModalsStore();
const route = useRoute();

const handleSignIn = () => {
  modalStore.handleShowSignIn();
  // Remonter en haut de la page après l'affichage de la modal
  window.scrollTo(0, 0);
};

const handleShowHome = () => {
  modalStore.handleCloseModals();
  // Remonter en haut de la page après l'affichage de la modal
  window.scrollTo(0, 0);
};

// DECONNECTION
const handleLogout = () => {
  localStorage.removeItem("token");
  modalStore.handleCloseModals();
  window.scrollTo(0, 0);
  authStore.logout();
  router.push("/");
};

// Propriété calculée pour déterminer la visibilité des éléments
const showAuthButtons = computed(() => route.name !== 'notFound');
</script>


<template>
  <div class="overlay" id="shadow">
    <div>
      <div>
        <RouterLink :to="!authStore.isLoggedIn ? '/' : '/netflix'">
          <img class="logo" src="/image/Logonetflix.png" alt="Image logo" @click="handleShowHome" />
        </RouterLink>
      </div>
    </div>

    <template v-if="showAuthButtons">
      <template v-if="authStore.isLoggedIn">
        <div class="user-dashboard">
          <span class="username">{{ authStore.username }}</span>
          <button class="btn" @click="handleLogout">Logout</button>
        </div>
      </template>

      <template v-else>
        <div class="dashboard-sign-in">
          <button id="signin-button" class="btn" @click="handleSignIn"
            v-if="modalStore.showInput && !modalStore.reconnection">
            Sign In
          </button>
        </div>
      </template>
    </template>
  </div>
</template>


<style scoped>
.overlay {
  position: absolute;
  width: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 15%;
}

.logo {
  height: 51px;
  width: 150px;
  z-index: 3;
  cursor: pointer;
  margin-top: .5rem;
}

.btn {
  background-color: #de0510;
  color: white;
  padding: 8px 17px;
  border: none;
  font-size: 1em;
  font-weight: 700;
  border-radius: 3px;
  cursor: pointer;
}

.btn:hover {
  background-color: #c11119;
}

.user-dashboard {
  color: white;
  z-index: 3;
}

.user-dashboard span {
  padding: 10px 30px 10px;
}


@media screen and (max-width: 1280px) {
  .overlay {
  padding: 1rem 5%;
}
}

@media (max-width: 768px) {
  .logo {
    height: 31px;
    width: 100px;
  }
  .overlay {
  padding: 1rem 5%;
}

}
</style>
