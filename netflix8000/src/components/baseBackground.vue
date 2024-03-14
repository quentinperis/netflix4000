<script>
import { RouterLink } from "vue-router";
</script>

<template>
  <div id="background">
    <img
      class="background-image"
      src="/image/background-netflix.jpg"
      alt="Image background"
    />
    <RouterLink to="/">
      <img class="logo" src="/image/Logonetflix.png" alt="Image logo" />
    </RouterLink>  
    <div class="shadow"></div>
  </div>

  <div class="overlay">
    <slot></slot>
  </div>
</template>

<style scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
#background {
  z-index: -1;
  width: 100dvw;
  height: 100dvh;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
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
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
