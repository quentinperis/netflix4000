<script setup>
import { useModalsStore } from "@/stores/modals";
const modalStore = useModalsStore();

</script>

<template>
  <div id="ready">
    <div class="container">
      <input type="email" placeholder="Email address" class="email-input" />
      <div>
        <button class="get-started-button" @click="modalStore.handleShowSignUp">GET STARTED &gt;</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#ready {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  justify-content: space-between;
}

input {
  border: 1px solid grey;
  border-radius: 5px;
  background-color: hsla(0, 0%, 20%, 0.397);
  color: white;
  padding: 10px;
  width: 100%;
  height: 100%;
}

input::placeholder {
  color: hsla(0, 0%, 75%, 0.938);
}

button {
  margin-left: 7px;
  width: 150px;
  height: 100%;
  border: none;
  background-color: #de0e10;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>
