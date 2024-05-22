<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import ModalMovie from "@/components/netflixPageComponents/ModalMovie.vue";

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

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/movies");
    if (res.status !== 200) return;
    res.data.forEach((m) => {
      movies.value.push({
        id: m._id,
        imagePath: m.imagePath,
        genre: m.genre,
      });
    });
  } catch (error) {
    console.error(error);
  }

});

const openModal = async (m) => {
  const movieId = m.id;
  const response = await axios.get(`http://localhost:3000/${movieId}`);
  if (response.status !== 200) return;
  try {
    selectedMovie.value = response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des détails du film :", error);
  }
};

const closeModal = () => { selectedMovie.value = null };

</script>

<template>
  <main>
    <div class="container" v-for="category in categories" :key="category">
      <h2>{{ category }}</h2>

      <div class="wrapper">
        <div v-for="m in filteredMovies(category)" :key="m" class="card">
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
    <ModalMovie :selected-movie="selectedMovie" @close-modal="closeModal"/>
  </main>
</template>

<style scoped>
#name {
  margin-right: 30px;
}
#name-year {
  height: 50%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: start;
}

#name-year {
  align-items: center;
}

#right {
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  /* margin-top: 45rem; */
  background-color: hsl(0, 0%, 5%);
  padding: 1px 20px;
}
.container {
  padding-bottom: 2em;
}

h2 {
  margin-top: 1em;
  color: white;
  padding-bottom: 0.5em;
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
