<template>
  <main>
    <!-- Parcourir les catégories -->
    <div
      v-for="category in categories"
      :key="category"
      class="category__section"
    >
      <!-- Titre de la catégorie -->
      <h2 class="category__title">{{ category }}</h2>

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
          <Slide v-for="movie in filteredMovies(category)" :key="movie.id">
            <div class="carousel__item">
              <img
                :src="movie.imagePath"
                :alt="movie.name"
                @click="openModal(movie)"
                class="movie__image"
              />
            </div>
          </Slide>

          <!-- Navigation -->
          <template #addons>
            <Navigation />
            <Pagination />
          </template>

          <!-- Flèche de navigation précédente -->
          <template #prev="{ prev }">
            <button @click="prev()" class="carousel__prev">Précédent</button>
          </template>

          <!-- Flèche de navigation suivante -->
          <template #next="{ next }">
            <button @click="next()" class="carousel__next">Suivant</button>
          </template>
        </Carousel>
      </div>
    </div>

    <!-- Modal -->
    <ModalMovie :selected-movie="selectedMovie" @close-modal="closeModal" />
  </main>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ModalMovie from "./ModalMovie.vue";
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';


const movies = ref([]);
const selectedMovie = ref(null);

    // Paramètres du carrousel
    const carouselSettings = {
      wrapAround: true, // Activer le bouclage du carrousel
      navigationEnabled: false, // Désactiver la navigation par défaut
      transition: 500, // Durée de la transition
      // itemsToShow: window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 3 : 1, // Nombre d'éléments à afficher en fonction de la taille de l'écran
    };

    data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {

      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 3,
        snapAlign: 'start',
      },
    },
  })



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
  const response = await axios.get(`http://localhost:3000/${movieId}`);
  if (response.status !== 200) return;
  try {
    selectedMovie.value = response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des détails du film :", error);
  }
};

    // Fermer la modal
    const closeModal = () => { selectedMovie.value = null };


    // Méthode pour faire défiler vers la diapositive précédente
    const prevSlide = (category) => {
      const carousel = $refs[`carousel_${category}`].getValue();
      carousel.prev();
    };

    // Méthode pour faire défiler vers la prochaine diapositive
    const nextSlide = (category) => {
      const carousel = $refs[`carousel_${category}`].getValue();
      carousel.next();
    };

    // Charger les films depuis l'API
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

    return {
      movies,
      selectedMovie,
      categories,
      filteredMovies,
      openModal,
      closeModal,
      carouselSettings,
      prevSlide,
      nextSlide,
    };

</script>

<style scoped>
.body {
  background-color: black;
}
.carousel__next button {
  color: red;
  background-color: greenyellow;
}
main {
  background-color: hsl(0, 0%, 5%);
  padding: 1px 20px;
}

h2 {
  margin-bottom: 20px;
  color: rgb(254, 254, 254);
  font-weight: bold;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  color: blue;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel__item img {
  width: 215px; /* Images à pleine largeur */
  height: 121px; /* Maintient le ratio d'aspect */
  border-radius: 8px;
  cursor: pointer;
}
.movie__image {
  width: 215px;
  height: 121px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  padding: 5px;
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

/* Media query pour les résolutions inférieures à 480px */
@media screen and (max-width: 480px) {
  .carousel__item {
    margin: 0 5px; /* Écart uniforme de 5px de chaque côté */
  }

  .carousel__item img {
    width: 215px; /* Calcul de la largeur en tenant compte de la marge */
    height: 121px; /* Ajustement automatique de la hauteur */
    max-width: 90vw; /* Limite la largeur maximale à 90% de la largeur de la vue */
    max-height: calc(
      90vw * 121 / 215
    ); /* Calcul de la hauteur maximale en fonction du ratio d'aspect */
    object-fit: cover; /* Assurez-vous que les images couvrent complètement le conteneur */
    border-radius: 8px; /* Conserver le bord arrondi */
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
    margin: 0 5px; /* Écart uniforme de 5px de chaque côté */
  }

  .carousel__item img {
    width: 122px; /* Calcul de la largeur en tenant compte de la marge */
    height: 60px; /* Ajustement automatique de la hauteur */
    max-width: 80vw; /* Limite la largeur maximale à 80% de la largeur de la vue */
    max-height: calc(
      80vw * 121 / 215
    ); /* Calcul de la hauteur maximale en fonction 
    object-fit: cover; /* Assurez-vous que les images couvrent complètement le conteneur */
    border-radius: 8px; /* Conserver le bord arrondi */
  }
}
@media screen and (min-width: 769px) {
  .carousel__item {
    margin: 0 5px; /* Écart uniforme de 5px de chaque côté */
  }

  .carousel__item img {
    width: 215px; /* Largeur fixe de 215px */
    height: 121px; /* Hauteur fixe de 121px */
    max-width: 100%; /* Assurez-vous que les images ne dépassent pas la largeur du conteneur */
    object-fit: cover; /* Assurez-vous que les images couvrent complètement le conteneur */
    border-radius: 8px; /* Conserver le bord arrondi */
  }
}
</style>
