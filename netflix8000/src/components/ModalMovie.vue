<script setup>
const props = defineProps(["selectedMovie"]);
const emits = defineEmits(["closeModal"]);
</script>

<template>
  <div class="modal" v-if="selectedMovie">
    <div class="container">
      <div id="video">
        <div id="shadow"></div>
        <video controls :src="selectedMovie.videoPath"></video>
        <div id="modal-close" @click="$emit('closeModal')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            role="img"
            data-icon="XStandard"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div id="boxInfos">
        <div id="description">
          <p>{{ selectedMovie.description }}</p>
        </div>
        <div id="name-year">
          <h3>{{ selectedMovie.year }}</h3>
          <h2>{{ selectedMovie.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* * {
  border: 1px solid red;
} */

.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100dvh;
  width: 100dvw;
  background-color: rgba(13, 13, 13, 0.6);
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
  z-index: 5;
}
.container {
  background-color: hsl(0, 0%, 8%);
  margin: 50px 0;
  width: 950px;
  overflow: hidden;
  height: 90%;
  border-radius: 7px;
}

#shadow {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 11%, hsl(0, 0%, 8%) 60%);
  z-index: 5;
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
}

#boxInfos {
  display: flex;
  width: 100%;
  padding: 30px 50px;
}

#description {
  width: 60%;
  display: flex;
  > p {
    width: 90%;
    height: 100%;
  }
}

#name-year {
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}

#video {
  position: relative;
  width: 100%;
  > video {
    width: 100%;
  }
}

#name {
  margin-right: 30px;
}
#modal-close {
  height: 35px;
  width: 35px;
  right: 35px;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  background-color: black;
  color: hsl(0, 0%, 95%);
  position: absolute;
  cursor: pointer;
  transition: transform 200ms ease;
  z-index: 10;
}
#modal-close:active {
  transform: translateY(3px);
}
h3 {
  color: white;
  padding-bottom: 0.5em;
}
p {
  color: rgba(255, 255, 255, 0.81);
  height: 50%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: start;
  margin-bottom: 15px;
  font-size: 1.2rem;
}
video {
  width: 75%;
  height: 90%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 7px;
}
</style>
