<template>
  <main class="main__container">
    <!-- Parcourir les catégories -->
    <div v-for="category in categories" :key="category" class="category__section">
      <!-- Titre de la catégorie -->
      <h2 class="category__title">{{ category }}</h2>

      <!-- Carrousel avec navigation -->
      <div class="carousel-wrapper">
        <Carousel v-bind="settings" :settings="carouselSettings" :wrap-around="true" :items-to-show="5" :breakpoints="breakpoints" :transition="500" :ref="`carousel_${category}`">
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
    <div v-if="selectedMovie" class="modal__overlay" @click="closeModal">
      <div class="modal__content" @click.stop>
        <div class="modal__header">
          <h2>{{ selectedMovie.name }}</h2>
          <h3>{{ selectedMovie.year }}</h3>
        </div>
        <div class="modal__body">
          <p>{{ selectedMovie.description }}</p>
          <video controls :src="selectedMovie.videoPath"></video>
        </div>
        <button class="modal__close" @click="closeModal">×</button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { defineComponent } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const MOVIES_URL = 'http://localhost:3000/movies';

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Navigation,
    Pagination,
    Slide,
  },
  setup() {
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
      movies.value.forEach((movie) => {
        if (movie.genre) {
          uniqueCategories.add(movie.genre.one);
          if (movie.genre.two) uniqueCategories.add(movie.genre.two);
          if (movie.genre.three) uniqueCategories.add(movie.genre.three);
        }
      });
      return Array.from(uniqueCategories);
    });

    // Filtrer les films par catégorie
    const filteredMovies = (category) => {
      return movies.value.filter((movie) =>
        [movie.genre.one, movie.genre.two, movie.genre.three].includes(category)
      );
    };

    // Ouvrir la modal
    const openModal = (movie) => {
      selectedMovie.value = movie;
    };

    // Fermer la modal
    const closeModal = () => {
      selectedMovie.value = null;
    };

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
        const response = await axios.get(MOVIES_URL);
        if (response.status === 200) {
          movies.value = response.data;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
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
  },
});
</script>

<style scoped>

.main__container {
  width: 100%;
  padding: 20px; /* Optionnel, pour espacer la main-container */
  background-color: #1414141a;
}

.category__title {
  margin-bottom : 20px;
  color: green;
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

.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  width: 70%; /* Ajustez la taille de la modal */
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}

.movie__image{
  width : 215px;
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


/* .carousel-wrapper {
  position: relative;
  width: 100%; 
  margin-bottom: 20px;
} */

/* .carousel-navigation {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
} */

/* .carousel-navigation button {
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border: none;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;  Ajout du curseur pointer 
 */

</style>
