<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import ModalMovie from "./ModalMovie.vue";

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
  console.log("Catégorie filtrée :", category);

  return movies.value.filter((m) => {
    console.log("Film actuel :", m); 

    return (
      m.genre.one === category ||
      m.genre.two === category ||
      m.genre.three === category
    );
  });
};


const openModal = async (movie) => {
  try {
    if (!movie || !movie._id) {
      console.error("Le film est invalide ou ne contient pas de propriété _id :", movie);
      return;
    }

    const movieId = movie._id; // Utiliser directement l'_id du film
    console.log("ID du film :", movieId);

    const response = await axios.get(`http://localhost:3000/${movieId}`);
    if (response.status !== 200) return;

    selectedMovie.value = response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des détails du film :", error);
  }
};




const closeModal = () => {
  selectedMovie.value = null;
};

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/movies");
    if (res.status !== 200) return;

     // Ajouter un console.log pour vérifier les données retournées par le serveur
    console.log("Données des films :", res.data);

    res.data.forEach((m) => {
      movies.value.push({
        imagePath: m.imagePath,
        genre: m.genre,
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
        <div v-for="m in filteredMovies(category)" :key="m._id" class="card">
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
