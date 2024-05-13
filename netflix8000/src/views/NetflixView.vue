<script setup>
import { ref } from "vue";
import movies from "../components/movies.vue";

const showVideo = ref(false);
const videoPath = "/image/joker.mp4"; // dossier publuc sur front
const playVideo = () => { showVideo.value = true };
const closeVideo = () => { showVideo.value = false };

</script>

<template>
  <div class="back">
    <img
      class="background-image"
      src="../../public/image/4317036.webp"
      alt="joker Image"
    />

    <div class="content-wrapper">
      <div id="empty"></div>
      <div id="left">
        <h2>Watch Joker Now</h2>
        <p>
          forever alone in a crowd, failed comedian Arthur Fleck seeks
          connection as he walks the streets of Gotham City. Arthur wears two
          masks -- the one he paints for his day job as a clown, and the guise
          he projects in a futile attempt to feel like he's part of the world
          around him.
        </p>
        <button type="button" @click="playVideo" style="cursor: pointer">
          Play
        </button>
      </div>
      <div id="right">
        <button v-if="showVideo" @click="closeVideo" class="video-close">
          +
        </button>
        <video v-if="showVideo" controls autoplay>
          <source :src="videoPath" type="video/mp4" />
        </video>
        <div class="show-video"></div>
      </div>
    </div>
  </div>
  <movies />
</template >

<style scoped>
  .logo {
  position: absolute;
  top: 5%;
  left: 5%;
  height: 10%;
  width: 15%;
  cursor: pointer;
  z-index: 2;
}
.back {
  position: relative;
  width: 100%;
  height: auto;
  background-color: hsl(0, 0%, 5%);
}

.background-image {
  max-height: 90dvh;
  width: 100%;
  z-index: -1;
  object-fit: cover;
}
#empty {
  width: 100%;
  height: 40%;
}
#left,
#right {
  width: 50%;
  height: 60%;
}

#left {
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  > * {
    width: 70%;
    margin: 3%;
    font-weight: 500;
    text-shadow: 2px 2px black;
  }
  > button {
    color: white;
    background-color: red;
    width: 100px;
    padding: 10px 30px;
    border: none;
    border-radius: 5px;
  }
}

.content-wrapper {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  color: white;
  background: linear-gradient(transparent, transparent, hsl(0, 0%, 5%));
  > h2 {
    font-size: 4rem;
  }
  > p {
    font-size: 1.5rem;
  }
}
.show-video {
  text-align: start;
}
video {
  width: 100%;
  height: 100%;
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

@media screen and (max-width: 1280px) {
.content-wrapper {
  > h2 {
    font-size: 2rem;
  }
  > p {
    font-size: 1rem;
  }
}
}
@media screen and (max-width: 960px) {

}
</style>
