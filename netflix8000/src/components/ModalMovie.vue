<script setup>
const props = defineProps(["selectedMovie"]);
const emits = defineEmits(["closeModal"]);
</script>

<template>
  <div class="modal" v-if="selectedMovie">
    <div id="left">
      <div id="name-year">
        <h2>{{ selectedMovie.name }}</h2>
      </div>
      <div> 
        <h3>{{ selectedMovie.year }}</h3>
        <p>{{ selectedMovie.description }}</p>
      </div>
    </div>
    <div id="right">
      <video controls :src="selectedMovie.videoPath"></video>
      <button id="modal-close" @click="$emit('closeModal')">+</button>
    </div>
  </div>
</template>


<style scoped>
.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 30dvh;
  width: 100dvw;
  background-color: hsla(0, 0%, 5%);
  display: flex;
  overflow: hidden;
}

#right,
#left {
  height: 100%;
  width: 50%;
  padding: 5px;
}

#left {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-left: 100px;
}

#name {
  margin-right: 30px;
}
#modal-close {
  rotate: 45deg;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 2px solid hsl(0, 0%, 35%);
  font-size: 2rem;
  background-color: transparent;
  color: hsl(0, 0%, 35%);
  position: absolute;
  right: 45px;
  top: 20px;
  cursor: pointer;
  transition: transform 200ms ease;
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
  border-radius: 10px;
}
</style>