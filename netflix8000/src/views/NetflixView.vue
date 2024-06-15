<script setup>
import { ref, onMounted } from "vue";
import Movies from "../components/Movies.vue";

const showVideo = ref(false);
const videoPath = "/image/joker.mp4"; // dossier publuc sur front
const playVideo = () => {
  showVideo.value = true;
};
const closeVideo = () => {
  showVideo.value = false;
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="back">
    <img
      class="background-image"
      src="/image/4317036.webp"
      alt="joker Image"
    />
    <div class="content-wrapper">
      <div id="content">
        <h2>Watch Joker Now</h2>
        <p>
          Forever alone in a crowd, failed comedian Arthur Fleck seeks
          connection as he walks the streets of Gotham City. Arthur wears two
          masks - the one he paints for his day job as a clown, and the guise he
          projects in a futile attempt to feel like he's part of the world
          around him.
        </p>
        <button type="button" @click="playVideo" style="cursor: pointer">
          Play
        </button>
      </div>
      <div class="overlay">
        <button v-if="showVideo" @click="closeVideo" class="video-close">
          +
        </button>
        <video class="modal" v-if="showVideo" controls autoplay>
          <source :src="videoPath" type="video/mp4" />
        </video>
      </div>
    </div>

    <div class="shadow"></div>
  </div>
  <Movies />
</template>

<style scoped>
.back {
  position: relative;
  width: auto;
  background-color: hsl(0, 0%, 5%);
}
.background-image {
  width: 100%;
  height: 75dvh;
  object-fit: cover;
  z-index: -1;
}
.shadow {
  z-index: 1;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
  background: linear-gradient(
    180deg,
    transparent,
    rgba(0, 0, 0.1%) 35%
  );
}

.content-wrapper {
  z-index: 2;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  color: white;
}

#content {
  padding: 0 10%;
  margin: 10% 40% 0 0;

  > button {
    color: white;
    background-color: red;
    padding: 12px 27px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 1rem;
  }
}

h2 {
  font-size: 3rem;
  font-weight: 700;
}

p {
  font-size: 1.25rem;
  padding: 2% 0;
}

.overlay {
  position: absolute;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.modal {
  margin: 5%;
  width: 70%;
  height: 70dvh;
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
  z-index: 3;
  cursor: pointer;
  transition: transform 200ms ease;
}
.video-close:active {
  transform: translateY(3px);
}

@media screen and (max-width: 1280px) {
  .content-wrapper {
    > h2 {
      font-size: 6rem;
    }
    > p {
      font-size: 1rem;
    }
  }
}
@media screen and (max-width: 960px) {
}
</style>
