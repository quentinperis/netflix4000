<script setup>
import movies from "../components/movies.vue";
import { ref } from "vue";

const showVideo = ref(false);
const videoPath = "/image/joker.mp4"; // dossier publuc sur front

const playVideo = () => {
  showVideo.value = true;
};
const closeVideo = () => {
  showVideo.value = false;
};
</script>

<template>
  <div class="jokerbackground">
    <header>
      <div class="logo">
        <router-link to="/"
          ><img src="/image/Logonetflix.png" alt="Votre logo Netflix"
        /></router-link>
      </div>
    </header>
    <div class="content-wrapper">
      <div>
        <h1 class="jokertitle">Watch Joker Now</h1>
        <p class="joker-synopsis">
          Forever alone in a crowd, failed comedian Arthur Fleck seeks
          connection as he walks the streets of Gotham City. Arthur wears two
          masks -- the one he paints for his day job as a clown, and the guise
          he projects in a futile attempt to feel like he's part of the world
          around him.
        </p>
        <button
          type="button"
          @click="playVideo"
          style="cursor: pointer"
          class="watch-button"
        >
          Play
        </button>
      </div>
      <div class="show-video">
        <button v-if="showVideo" @click="closeVideo" class="video-close">
          +
        </button>
        <video v-if="showVideo" controls autoplay>
          <source :src="videoPath" type="video/mp4" />
        </video>
      </div>
    </div>
    <hr />
    <movies />
  </div>
</template>

<style scoped>
body::-webkit-scrollbar {
  width: 0 !important;
}
.watch-button {
  background-color: red;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

h1,
p {
  text-shadow: 1px 1px black;
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
  /* z-index: 999;  */
}
.logo {
  margin-left: 60px;
  margin-top: 30px;
}
.logo img {
  height: 40px;
}
.jokerbackground {
  background-image: url("../../public/image/4317036.webp");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 165%;
  /* z-index: -1;  */
}

.content-wrapper {
  max-width: 80%;
  text-align: left;
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  background-color: rgba(0, 0, 0, 0.0001);
  padding-bottom: 5.5rem;
  border-radius: 10px;
  margin-top: 15%;
  margin-left: 7%;
  padding-top: auto;
}
.show-video {
  text-align: start;
}
video {
  width: 100%;
  height: 100%;
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

.video-close {
  rotate: 45deg;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid white;
  font-size: 2rem;
  background-color: transparent;
  color: white;
  position: absolute;
  right: 17rem;
  top: 20rem;

  cursor: pointer;
  transition: transform 200ms ease;
}
.video-close:active {
  transform: translateY(3px);
}
</style>
