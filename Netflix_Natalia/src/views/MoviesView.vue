<script setup>
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


const scrollToPrevious = (index) => {
  const previousGroup = document.getElementById(`image`);
  if (previousGroup) {
    previousGroup.scrollLeft -= 200; 
  }
};


const scrollToNext = (index) => {
  const nextGroup = document.getElementById(`image`);
  if (nextGroup) {
    nextGroup.scrollLeft += 200; 
  }
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

  <!-- <div class="" v-for="category in categories" :key="category">
      <h2>{{ category }}</h2>

      <div class="">
          <div v-for="m in filteredMovies(category)" :key="m.id">
            <img v-if="m.genre && (m.genre.one === category || m.genre.two === category || m.genre.three === category)"
              :src="m.imagePath" :alt="m.name" />
          </div>
      </div>
   
    </div> -->

  <main>
    <!-- Boucle sur chaque catégorie -->
    <div v-for="(category, index) in categories" :key="index">
      <h2>{{ category }}</h2>
      <div class="media-container">
        <div class="media-scroller">
          <!-- Groupe de médias pour chaque catégorie -->
          <div class="media-group" :id="'group-' + (index + 1)">
            <!-- Bouton précédent -->
            <a class="previous" @click="scrollToPrevious(index)" :href="'#group-' + index">
              <svg>
                <symbol id="previous" viewBox="0 0 256 512">
                  <path fill="white"
                    d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
                </symbol>
                <use href="#previous"></use>
              </svg>
            </a>
            <!-- Boucle sur les films filtrés par catégorie -->
            <div id="image" class="media-element" v-for="m in filteredMovies(category)" :key="m.id">
              <img
                v-if="m.genre && (m.genre.one === category || m.genre.two === category || m.genre.three === category)"
                :src="m.imagePath" :alt="m.name" />
            </div>
            <!-- Bouton suivant -->
            <a class="next" @click="scrollToNext(index + 1)" :href="'#group-' + (index + 2)" aria-label="next">
              <svg>
                <symbol id="next" viewBox="0 0 256 512">
                  <path fill="white"
                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                </symbol>
                <use href="#next"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

</template>

<style scoped>
main {
  background-color: hsl(0, 0%, 5%);
  padding: 2rem;
}

img {
  aspect-ratio: 16/10;
  width: 410px;
  margin-right: 1em;
  object-fit: cover;
  cursor: pointer;
}

svg {
  max-width: 100%;
  display: block;
}

/* general styling */

.container {
  inline-size: min(100% - 4rem, 70rem);
  margin-inline: auto;
}

.flow {
  display: grid;
  gap: var(--flow-spacer, 1rem);
}

.page-title {
  font-size: 4rem;
  margin: 0;
}

.section-title {
  margin-block: 4rem 1rem;
}

/* media scroller */

.container {
  inline-size: min(100% - 4rem, 70rem);
  margin-inline: auto;
}

.flow {
  display: grid;
  gap: var(--flow-spacer, 1rem);
}

.page-title {
  font-size: 4rem;
  margin: 0;
}

.section-title {
  margin-block: 4rem 1rem;
}

/* media scroller */

.media-container {
  position: relative;
}

.media-scroller,
.media-group {
  display: grid;
  gap: 0.25rem;
  grid-auto-flow: column;
}

.media-scroller {
  overflow-x: hidden;
  scroll-behavior: smooth;
  grid-auto-columns: 100%;
  padding: 0 3rem;
  scroll-padding-inline: 3rem;
}

.media-group {
  grid-auto-columns: 1fr;
}

.next,
.previous {
  align-items: center;
  z-index: 10;
  position: absolute;
  width: 3rem;
  padding: 1rem;
  background: rgb(0 0 0 / 0);
  opacity: 0;
}

.previous {
  left: 0;
  top: 0;
  bottom: 0;
}

.next {
  right: 0;
  top: 0;
  bottom: 0;
}

.media-group:first-child .next,
.media-group:first-child .previous {
  display: flex;
}

.media-scroller:hover .next,
.media-scroller:hover .previous {
  opacity: 1;
}

.next:hover,
.previous:hover {
  background: rgb(0 0 0 / 0.3);
}

.next>svg,
.previous>svg {
  transition: transform 75ms linear;
  transform: scale(1);
}

.next:hover>svg,
.previous:hover>svg {
  transform: scale(1.2);
}

.media-group:target .next,
.media-group:target .previous {
  display: flex;
}

.media-scroller:has(:target:not(:first-child)) .media-group:first-of-type .next {
  display: none;
}
</style>
