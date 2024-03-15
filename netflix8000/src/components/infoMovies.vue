<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const MOVIES_URL = "http://localhost:3000/movies";
const movies = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get(MOVIES_URL);
    if (res.status !== 200) return;

    res.data.forEach((m) => {
      movies.value.push({ name: m.name, description: m.description, year: m.year, imagePath: m.imagePath });
    });
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <!-- <div id="left">
      <div class="container">
        <h2 id="name">Name</h2>
        <h2>2024</h2>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsum
        libero error temporibus a cupiditate debitis corrupti officiis aut
        deserunt dolor inventore, pariatur sit, modi amet cum, dignissimos
        ratione assumenda.
      </p>
   
    </div>
    <div id="right">
    </div>
  -->

  <div id="left">
    <div v-for="movie in movies" :key="movie.name" class="container">
      <h2>{{ movie.name }}</h2>
      <h2>{{ movie.year }}</h2>
      <p>{{ movie.description }}</p>
    </div>
  </div>
  <div id="right">
    <div v-for="movie in movies" :key="movie.name">
      <img :src="movie.imagePath" :alt="movie.name" />
    </div>
  </div>
</template>

<style scoped>
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

.container,
p {
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
</style>
