<script setup>
import Home from "@/components/Home.vue";
import Reconnection from "@/components/Reconnection.vue";
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";
import { onMounted } from "vue";

import { useModalsStore } from "@/stores/modals";


const modalStore = useModalsStore();

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="back">

      <div class="overlay">
      <Home
        class="modal"
        v-if="modalStore.showInput && !modalStore.reconnection"
      />
      <Reconnection v-if="modalStore.reconnection" />
      <SignIn v-if="modalStore.showSignIn && !modalStore.reconnection" />
      <SignUp v-if="modalStore.showSignUp && !modalStore.reconnection" />
    </div>

    <img
      class="background-image"
      src="/image/background-netflix.jpg"
      alt="Image background"
    />
  
    <div class="shadow"></div>
  </div>
</template>

<style scoped>
.back {
  background-color: black;
  width: 100%;
  height: 100dvh;
}


.overlay {
  position: absolute;
  width: 100%;
  z-index: 2;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}


.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.shadow {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.76234243697479) 19%,
    rgba(0, 0, 0, 0) 56%,
    rgba(0, 0, 0, 0.7175245098039216) 80%
  );
}

.modal {
  z-index: 2;
}
</style>
