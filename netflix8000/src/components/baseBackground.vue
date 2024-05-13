<script setup>
</script>

<template>
  <div class="back">
    <img
      class="background-image"
      src="/image/background-netflix.jpg"
      alt="Image background"
    />
    <div class="shadow"></div>
  </div>

  <div class="overlay">
    
      <slot></slot>
    </div>

</template>

<style scoped>


#background {
  z-index: -1;
  width: 100%;
  height: 100vh; /* Utilise la hauteur de la fenêtre */
  position: relative; /* Ajoutez position relative */
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

.overlay {
  top: 0;
  position: absolute;
  height: 100vh; /* Utilise la hauteur de la fenêtre */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden ;
}
</style>

