<script setup>
import infoMovies from "./infoMovies.vue";
import { onMounted, ref, computed } from "vue";
import axios from "axios";

const MOVIES_URL = "http://localhost:3000/movies";
const movies = ref([]);

// Toutes les catégories uniques des films
const categories = computed(() => {
  const uniqueCategories = new Set();
  movies.value.forEach((m) => {
    if (m.genre && m.genre.one) uniqueCategories.add(m.genre.one);
    if (m.genre && m.genre.two) uniqueCategories.add(m.genre.two);
    if (m.genre && m.genre.three) uniqueCategories.add(m.genre.three);
  });
  return Array.from(uniqueCategories);
});

// Filtrage les films par catégorie
const filteredMovies = (category) => {
  return movies.value.filter((m) => {
    return m.genre.one === category || m.genre.two === category || m.genre.three === category;
  });
};

onMounted(async () => {
  try {
    const res = await axios.get(MOVIES_URL);
    if (res.status !== 200) return;

    res.data.forEach((m) => {
      movies.value.push({ imagePath: m.imagePath, genre: m.genre });
    });
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <main>
    <div class="container" v-for="category in categories" :key="category">
      <h2>{{ category }}</h2>

      <div class="wrapper">
          <div v-for="m in filteredMovies(category)" :key="m.id" class="card">
            <img v-if="m.genre && (m.genre.one === category || m.genre.two === category || m.genre.three === category)"
              :src="m.imagePath" :alt="m.name" />
          </div>
      </div>
    </div>
    <!-- <infoMovies/> -->
  </main>
</template>

<style scoped>
main {
  background-color: hsl(0, 0%, 5%);
  padding: 2rem;
}
.container {
  padding-bottom: 2em;
}
h2 {
  padding-bottom: .5em;
}
.wrapper {
  display: flex;
  overflow-x: auto;
}
img {
  height: 500px;
  margin-right: 1em;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
}
</style>