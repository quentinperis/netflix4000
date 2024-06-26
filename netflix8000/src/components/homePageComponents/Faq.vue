<script setup>
import InputEmail from "@/components/homePageComponents/InputEmail.vue";
import { ref } from "vue";

const faqs = ref([
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. \nYou can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR 19.99 to EUR 5.99 a month. No extra costs, no contracts."
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. \nYou can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
  },
  {
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
  }
]);

// Gestion de l'état des panneaux
const toggle = ref(null);

const togglePanel = (index) => {
  toggle.value = toggle.value === index ? null : index;
};
</script>

<template>
  <div class="faq">
    <div class="faq-container">
      <h1>Frequently Asked Questions</h1>
      <ul>
        <!-- Boucle sur les questions et réponses -->
        <li v-for="(faq, index) in faqs" :key="index">
          <div @click="togglePanel(index)" class="li-div">
            <button class="button-faq">
              <!-- Titre de la question -->
              <h2>{{ faq.question }}</h2>
              <!-- Symbole "+" ou "x" pour indiquer l'état du panneau -->
              <p v-if="toggle === index" class="croix">+</p>
              <p v-else class="plus">+</p>
            </button>
          </div>

          <!-- Affichage de la réponse correspondante si le panneau est ouvert -->
          <div v-if="toggle === index" class="panel">
            <p>{{ faq.answer }}</p>
          </div>
        </li>
      </ul>
    </div>
    <InputEmail />
  </div>
</template>

<style scoped>
.croix {
  rotate: 45deg;
}

.li-div {
  height: 100%;
  width: 100%;
  background-color: hsl(0, 0%, 20%);
  transition: background-color 400ms ease;
}

.li-div:hover {
  background-color: hsl(0, 0%, 30%);
}

li,
ul,
.button-faq {
  width: 100%;
  padding: 0;
}

.faq-container {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
}

h1 {
  font-size: 2.9rem;
  font-weight: 900;
  color: hsl(0, 0%, 95%);
  text-align: center;
  margin-bottom: 0.4em;
}

h2 {
  font-size: 1.6rem;
  font-weight: 500;
  color: hsl(0, 0%, 95%);
}



.button-faq {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background-color: transparent;
  color: hsl(0, 0%, 95%);
  border: none;
}

.panel {
  background-color: hsl(0, 0%, 20%);
  overflow: hidden;
  margin-bottom: 5px;
  margin-top: 1px;

  >p {
    padding: 25px;
    font-size: 1.2rem;
    color: hsl(0, 0%, 95%);
  }
}

li {
  list-style: none;
  transition: background-color 200ms ease 200ms;
  margin-bottom: 8px;
}

#li-bot {
  margin-bottom: 55px;
}

.plus,
.croix {
  font-size: 3rem;
  display: inline-block;
  cursor: pointer;
}

.faq {
  display: flex;
  width: 100%;
  padding: 0 15%;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}

@media screen and (max-width: 1280px) {
  .faq {
    padding: 0 5%;
  }
}

@media screen and (max-width: 960px) {
  .faq {
    padding: 5%;
  }

  .faq-container {
    width: 100%;
  }
  h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.5em;
}
}
</style>
