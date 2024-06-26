<script setup>
import { ref, computed, onMounted } from "vue";
import { instance as axios } from "@/api/axios"; 
import ModalMovie from "@/components/netflixPageComponents/ModalMovie.vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const movies = ref([]);
const selectedMovie = ref(null);

// Paramètres du carrousel
const carouselSettings = {
  wrapAround: true,
  navigationEnabled: false,
  transition: 500,
};

// Calcul des catégories uniques
const categories = computed(() => {
  const uniqueCategories = new Set();
  movies.value.forEach((m) => {
    if (m.genre && m.genre.one) uniqueCategories.add(m.genre.one);
    if (m.genre && m.genre.two) uniqueCategories.add(m.genre.two);
    if (m.genre && m.genre.three) uniqueCategories.add(m.genre.three);
  });
  return Array.from(uniqueCategories);
});

// Filtrer les films par catégorie
const filteredMovies = (category) => {
  return movies.value.filter((m) => {
    return (
      m.genre.one === category ||
      m.genre.two === category ||
      m.genre.three === category
    );
  });
};

// Ouvrir la modal
const openModal = async (m) => {
  const movieId = m.id;
  const response = await axios.get(`/${movieId}`);
  if (response.status !== 200) return;
  try {
    selectedMovie.value = response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des détails du film :",
      error
    );
  }
};

// Fermer la modal
const closeModal = () => {
  selectedMovie.value = null;
};


// Charger les films depuis l'API
onMounted(async () => {
  try {
    const res = await axios.get("/movies");
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
</script>

<template>
  <main>
    <!-- Parcourir les catégories -->
    <div class="container" v-for="category in categories" :key="category">
      <h2>{{ category }}</h2>

      <!-- Carrousel avec navigation -->
      <div class="carousel-wrapper">
        <Carousel
          v-bind="settings"
          :settings="carouselSettings"
          :wrap-around="true"
          :items-to-show="6"
          :transition="500"
          :ref="`carousel_${category}`"
        >
          <!-- Parcourir les films filtrés par catégorie -->
          <Slide v-for="m in filteredMovies(category)" :key="m.id">
            <div class="carousel__item">
              <img
                :src="m.imagePath"
                :alt="m.name"
                @click="openModal(m)"
                class="movie__image"
              />
            </div>
          </Slide>

          <!-- Navigation -->
          <template #addons>
            <Navigation/>
            <Pagination />
          </template>

<!--   
          <template #prev="{ prev }">
            <button @click="prev()" class="carousel__prev">Précédent</button>
          </template>

     
          <template #next="{ next }">
            <button @click="next()" class="carousel__next">Suivant</button>
          </template> -->
        </Carousel>
      </div>
    </div>

    <!-- Modal -->
    <ModalMovie :selected-movie="selectedMovie" @close-modal="closeModal" />
  </main>
</template>

<style scoped>
main {
  background-color: hsl(0, 0%, 1%);
  padding: 1px 20px;
}
.container {
  padding-bottom: 2em;
}
h2 {
  margin-bottom: 20px;
  color: rgb(254, 254, 254);
  font-weight: bold;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 215px; /* Images à pleine largeur */
    height: 121px; /* Maintient le ratio d'aspect */
    border-radius: 8px;
    cursor: pointer;
  }
}

.carousel__slide {
  padding: 5px;
  transition-duration: 400ms;
}

.carousel__slide--active {
  transform: scale(1.5);
}

.carousel__pagination-button {
  color: white;
}



/* Media query pour les résolutions inférieures à 480px */
@media screen and (max-width: 480px) {
  .carousel__item {
    margin: 0 5px;
    > img {
      width: 215px;
      height: 121px;
      max-width: 90vw;
      max-height: calc(90vw * 121 / 215);
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .carousel__prev,
  .carousel__next {
    height: 25%;
  }
}

/* Media query pour les résolutions entre 481px et 768px */
@media screen and (min-width: 481px) and (max-width: 768px) {
  .category__title {
    margin-bottom: -60px;
  }
  .carousel__item {
    margin: 0 5px;
    > img {
      width: 122px;
      height: 60px;
      max-width: 80vw;
      max-height: calc(80vw * 121 / 215);
      border-radius: 8px;
    }
  }
}

@media screen and (min-width: 769px) {
  .carousel__item {
    margin: 0 5px;
    > img {
      width: 215px;
      height: 121px;
      max-width: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
}


/* Personnalisation des boutons de navigation */
.carousel__navigation-button {
  background-color: var(--vc-nav-background); /* Couleur de fond */
  color: var(--vc-nav-color); /* Couleur de l'icône */
  width: var(--vc-nav-width); /* Largeur */
  height: var(--vc-nav-height); /* Hauteur */
  border-radius: var(--vc-nav-border-radius); /* Rayon des bords */
  transition: color 0.3s, background-color 0.3s;
}

.carousel__navigation-button:hover {
  background-color: var(--vc-nav-background-hover); /* Couleur de fond au survol */
  color: var(--vc-nav-color-hover); /* Couleur de l'icône au survol */
}

/* Personnalisation des points de pagination */
.carousel__pagination-button {
  background-color: var(--vc-pgn-background-color); /* Couleur du point */
  width: var(--vc-pgn-width); /* Largeur du point */
  height: var(--vc-pgn-height); /* Hauteur du point */
  margin: var(--vc-pgn-margin); /* Marge du point */
  border-radius: var(--vc-pgn-border-radius); /* Rayon des bords du point */
  transition: background-color 0.3s;
}

svg .carousel__pagination-button--active {
  background-color: var(--vc-pgn-active-color); /* Couleur du point actif */
}

/* Personnalisation de la couleur des icônes (si des SVGs sont utilisés) */
.carousel__icon {
  fill: red; /* Couleur par défaut des icônes */
}

.carousel__icon:hover {
  fill: var(--vc-clr-secondary); /* Couleur des icônes au survol */
}

</style>