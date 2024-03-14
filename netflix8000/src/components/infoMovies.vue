<script setup>
// import { onMounted, ref, computed } from "vue";
// import axios from "axios";

// const MOVIES_URL = "http://localhost:3000/movies";
// const movies = ref([]);

// onMounted(async () => {
//   try {
//     const res = await axios.get(MOVIES_URL);
//     if (res.status !== 200) return;

//     res.data.forEach((m) => {
//       movies.value.push({ name: m.name, description: m.description, year: m.year });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });
</script>

<template>
  <div class="modal">
    <div id="left">
      <div class="container">
        <h2 id="name">Name</h2>
        <h2>2024</h2>
        <!-- <h2>{{ m.name }}</h2>
        <h2>{{ m.year }}</h2> -->
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsum
        libero error temporibus a cupiditate debitis corrupti officiis aut
        deserunt dolor inventore, pariatur sit, modi amet cum, dignissimos
        ratione assumenda.
      </p>
      <!-- <p>{{ m.description }}</p> -->
    </div>
    <div id="right">
      <!-- <img :src="m.imagePath" :alt="m.name"> -->
      <img
        src="C:\Users\Administrateur\Desktop\Git Hub\netflix4000\Server\data\images\Bullet Train.png"
        alt="Bullet Train"
      />
      <button id="close">+</button>
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

.container, p {
  height: 50%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: start;
}

.container {
  align-items: center;
}

p {
  margin-bottom: 15px;
  font-size: 1.2rem;
}


#right {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 75%;
  height: 90%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
}

#close {
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
#close:active {
  transform: translateY(3px);
}
</style>
