<script>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="back">
    <img
      class="background-image"
      src="/image/background-netflix.jpg"
      alt="Image background"
    />
    <div class="shadow">
      <RouterLink to="/">
        <img class="logo" src="/image/Logonetflix.png" alt="Image logo" />
      </RouterLink>
    </div>
  </div>

  <div class="overlay">
    <slot></slot>
  </div>
</template>

<style scoped>
.back {
  background-color: aqua;
  width: 100%;
  height: 100dvh;
}

.logo {
  position: absolute;
  top: 25px;
  left: 75px;
  height: 51px;
  width: 150px;
  cursor: pointer;
  z-index: 2;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
