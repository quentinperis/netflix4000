<script setup>
import movies from '../components/movies.vue'
</script>

<template>
  <div class="container">
    <header>
      <div class="logo">
        <router-link to="/"><img src="/image/Logonetflix.png" alt="Votre logo Netflix"></router-link>
      </div>
    </header>
    <div class="jokerbackground">
      <div class="content-wrapper">
        <div class="content">
          <h1 class="jokertitle">Watch Joker Now</h1>
          <p class="joker-synopsis">Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him.</p>
          <button class="watch-button">Play</button>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <movies/>
</template>

<style scoped>
body::-webkit-scrollbar { width: 0 !important }


.container {
  height: 70vh;
  width: 100%;
}

h1, p {
  text-shadow: 1px 1px black ;
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999; /* Assure que le navigateur reste au-dessus du contenu */
}

.logo {
  margin-left: 60px;
  margin-top: 30px /* Espacement à gauche */
}

.logo img {
  height: 40px;
}

nav {
  background-color: transparent; /* Fond transparent */
  margin-right: 20px; /* Espacement à droite */
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-left: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.jokerbackground {
  background-image: url('../../public/image/4317036.webp');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh; /* Hauteur de l'écran */
  z-index: -1; /* Pour placer l'arrière-plan derrière le contenu */
}

.content-wrapper {
  max-width: 80%;
  text-align: left;
}

.content {
  background-color: rgba(0, 0, 0, 0.0001);
  padding: 20px;
  border-radius: 10px;
  margin-top: 20%;
  margin-left: 5%;
}

.jokertitle {
  color: white;
  font-size: 4rem;
}

.joker-synopsis {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.watch-button {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.films-link {
  position: absolute;
  left: 30%;
  top: 5%;
}

@media (max-width: 768px) {
  .films-link {
    position: absolute;
    left: 40%;
    top: 5%;/* Ajuster pour le navigateur fixe */
  }
}

@media (max-width: 500px) {
  .films-link {
    position: absolute;
    left: 30%;
    top: 5%;/* Ajuster pour le navigateur fixe */
  }
}
</style>