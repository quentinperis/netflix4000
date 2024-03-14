<template>
  <div class="jokerbackground">
    <img id="jokerimage" src="../../public/image/4317036.webp" alt="imgjoker">
    <div class="content-wrapper">
      <router-link to="/"><img class="logo" src="../../public/image/Logonetflix.png" alt="Votre logo" /></router-link>
      <a  ><RouterLink to="/" id="film">Films</RouterLink></a>
      <div class="text-wrapper">
        <h1 id="jokertitle" class="responsive-title"> Watch Joker Now</h1>
        <p id="joker-synopsis" class="responsive-paragraph">Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. </p>
        <button id="watch-button" class="responsive-button"><span class="button-text">Play</span></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jokerbackground {
  width: 100dvw; /* Permet à l'image de s'adapter à la taille du conteneur */
  height: 80dvh; /* Permet de conserver le ratio hauteur/largeur */
  overflow: hidden;
}
#jokerimage {
  width: 100%;
  height: 70vh;
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

.logo img {
    max-width: 100%; /* Pour éviter que le logo ne dépasse de la largeur de son conteneur */
    height: auto;
}

#film {
  color: white;
  text-decoration: none;
  position: fixed;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bold;
  position: absolute;
  top: -45%;
  left: 25%;
}
.responsive-link {
  color: white;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1rem;
  font-weight: 300;
}
.content-wrapper {
  position: absolute;
  top: 50%;
  left: 38%;
  transform: translate(-50%, -50%);
  max-width: 90%; /* Ajustez la largeur maximale selon vos besoins */
  text-align: left;
}
.text-wrapper {
  display: inline-block;
  max-width: 100%;
  margin-left: 0px; /* Ajustement de la marge à gauche */
}
.responsive-title {
  color: white;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px; /* Ajoutez une marge basse pour séparer les éléments */
}
.responsive-paragraph {
  color: white;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 20px; /* Ajoutez une marge basse pour séparer les éléments */
}
.responsive-button {
  height: 5vh;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 0.9rem;
  display: inline-block;
}
.button-text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>