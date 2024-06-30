<script setup>
import Home from "@/components/homePageComponents/Home.vue";
import Reconnection from "@/components/modalsAuthComponents/Reconnection.vue";
import SignUp from "@/components/modalsAuthComponents/SignUp.vue";
import SignIn from "@/components/modalsAuthComponents/SignIn.vue";
import { onMounted } from "vue";
import { useModalsStore } from "@/stores/modals";

const modalStore = useModalsStore();
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <main class="container">
    <section class="back">
      <div class="overlay">
        <Home class="modal" v-if="modalStore.showInput && !modalStore.reconnection" />
        <Reconnection v-if="modalStore.reconnection" />
        <SignIn v-if="modalStore.showSignIn && !modalStore.reconnection" />
        <SignUp v-if="modalStore.showSignUp && !modalStore.reconnection" />
      </div>
      <img class="background-image" src="/image/background-netflix.jpg" alt="netflix" />
      <div class="shadow"></div>
    </section>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.back {
  background-color: black;
  width: 100%;
  position: relative;
  flex: 1;
  /* Take up available space */
  display: flex;
  flex-direction: column;
}

.overlay {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  width: 100%;
  min-height: 100vh;
  object-fit: cover;
}

.shadow {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.63) 19%,
      rgba(0, 0, 0, 0.24) 56%,
      rgba(0, 0, 0, 0.715) 80%);
}

.modal {
  z-index: 3;
}
</style>
