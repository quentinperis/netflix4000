<template>
  <div id="background">
    <img class="responsive-image" src="/image/background-netflix.jpg" alt="Image background" />
    <img class="logo" src="/image/Logonetflix.png" alt="Image logo" />
    <div class="overlay">
      Contenu du calque transparent
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  left: 0;
  height: 100%;
}

.logo {
  position: fixed;
  margin-top: 25px;
  margin-left: 25px;
  height: 51px;
  width: 150px;
  z-index: 1;
  cursor: pointer;
}

#background {
  position: relative;
  min-height: 100vh;
}

.responsive-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.76234243697479) 19%, rgba(0, 0, 0, 0) 56%, rgba(0, 0, 0, 0.7175245098039216) 80%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.overlay button {
  background-color: white;
  /* Fond blanc pour le bouton */
  color: black;
  /* Texte noir pour le bouton */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>