<script setup>
import infoMovies from "./infoMovies.vue";
import { onMounted, ref, computed } from "vue";
import axios from "axios";

const MOVIES_URL = "http://localhost:3000/movies";
const movies = ref([]);
const selectedMovie = ref(null);

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
    return (
      m.genre.one === category ||
      m.genre.two === category ||
      m.genre.three === category
    );
  });
};

const openModal = (movie) => {
  selectedMovie.value = movie;
};

const closeModal = () => {
  selectedMovie.value = null;
};

onMounted(async () => {
  try {
    const res = await axios.get(MOVIES_URL);
    if (res.status !== 200) return;

    res.data.forEach((m) => {
      movies.value.push({ name: m.name, description: m.description, imagePath: m.imagePath, genre: m.genre, videoPath: m.videoPath });
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
          <img
            v-if="
              m.genre &&
              (m.genre.one === category ||
                m.genre.two === category ||
                m.genre.three === category)
            "
            :src="m.imagePath"
            :alt="m.name"
            @click="openModal(m)"
          />
        </div>
      </div>
    </div>
    <div class="modal-overlay" v-if="selectedMovie">
      <div class="modal">
        <button class="modal-close" @click="closeModal">+</button>
        <!-- <infoMovies /> -->
        <h2>{{ selectedMovie.name }}</h2>
          <h3>{{ selectedMovie.year }}</h3>
          <p>{{ selectedMovie.description }}</p>
          <video controls :src="selectedMovie.videoPath"></video>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  /* margin-top: 45rem; */
  background-color: hsl(0, 0%, 5%);
  padding: 3%;
}
.container {
  padding-bottom: 2em;
}
h2,h3 {
  color: white;
  padding-bottom: 0.5em;
}
p {
  color: rgba(255, 255, 255, 0.81);
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

/* Styles pour la modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  height: 95dvh;
  width: 95dvw;
}

.modal-close {
  rotate: 45deg;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid hsl(0, 0%, 35%);
  font-size: 2rem;
  background-color: transparent;
  color: hsl(0, 0%, 35%);
  position: absolute;
  right: 45px;
  top: 50px;
  cursor: pointer;
  transition: transform 200ms ease;
}
.modal-close:active {
  transform: translateY(3px);
}
</style>
