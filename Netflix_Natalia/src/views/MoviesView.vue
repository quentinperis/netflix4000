<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import baseNavBarre from "@/components/baseNavBarre.vue";

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
    console.log(movies.value);
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <baseNavBarre></baseNavBarre>
  <main>
    <!-- Boucle sur chaque catégorie -->
    <div v-for="category in categories" :key="category">
      <h2>{{ category }}</h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- Filtrer les films par catégorie -->
          <div v-for="m in filteredMovies(category)" :key="m.id" class="swiper-slide card">
            <!-- Vérifier si les catégories sont définies avant d'y accéder -->
            <img v-if="m.genre && (m.genre.one === category || m.genre.two === category || m.genre.three === category)"
              :src="m.imagePath" :alt="m.name" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </main>
</template>

<style scoped>

main {
  background-color: hsl(0, 0%, 5%);
}


</style>