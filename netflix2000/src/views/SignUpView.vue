<script setup>
import baseBackground from '@/components/baseBackground.vue';
</script>

<template>
<baseBackground>
<div class="modal"> 
  <p>Sign Up</p>
  <input type="text">
  <input type="text">
  <input type="text">
  <button></button>
</div>
</baseBackground>
</template>

<style scoped>
baseBackgroud {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  height: 500px;
  width: 300px;
  z-index: 1;
  background-color: hsla(0, 0%, 11%, 0.767);
}
</style>