<script setup>
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
      movies.value.push({
        name: m.name,
        description: m.description,
        imagePath: m.imagePath,
        genre: m.genre,
        videoPath: m.videoPath,
      });
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
    <div class="modal" v-if="selectedMovie">
      <div id="left">
        <div id="name-year">
          <h2>{{ selectedMovie.name }}</h2>
          <h3>{{ selectedMovie.year }}</h3>
        </div>
        <div>
          <p>{{ selectedMovie.description }}</p>
        </div>
      </div>
      <div id="right">
        <video controls :src="selectedMovie.videoPath"></video>
        <button id="modal-close" @click="closeModal">+</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* style pour le modal */
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

#name-year,
p {
  height: 50%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: start;
}

#name-year {
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

video {
  width: 75%;
  height: 90%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
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
main {
  /* margin-top: 45rem; */
  background-color: hsl(0, 0%, 5%);
  padding: 3%;
}
.container {
  padding-bottom: 2em;
}
h2,
h3 {
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
</style>
