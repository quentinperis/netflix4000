<script setup>
import inputEmail from "./inputEmail.vue";
import { ref } from "vue";

const toggle = ref(false);
const fctToggle = () => {
  toggle.value = !toggle.value;
  toggle2.value = false;
  toggle3.value = false;
  toggle4.value = false;
  toggle5.value = false;
};
const toggle2 = ref(false);
const fctToggle2 = () => {
  toggle.value = false;
  toggle2.value = !toggle2.value;
  toggle3.value = false;
  toggle4.value = false;
  toggle5.value = false;
};
const toggle3 = ref(false);
const fctToggle3 = () => {
  toggle.value = false;
  toggle2.value = false;
  toggle3.value = !toggle3.value;
  toggle4.value = false;
  toggle5.value = false;
};
const toggle4 = ref(false);
const fctToggle4 = () => {
  toggle.value = false;
  toggle2.value = false;
  toggle3.value = false;
  toggle4.value = !toggle4.value;
  toggle5.value = false;
};
const toggle5 = ref(false);
const fctToggle5 = () => {
  toggle.value = false;
  toggle2.value = false;
  toggle3.value = false;
  toggle4.value = false;
  toggle5.value = !toggle5.value;
};
</script>

<template>
  <div class="faq">
    <div class="faq-container">
      <p class="faq-top">Frequently Asked Questions</p>
      <ul>
        <li>
          <div @click="fctToggle" class="li-div">
            <button class="button-faq">
              <h3>What is Netflix?</h3>
              <p v-if="toggle" class="croix">+</p>
              <p v-else class="plus">+</p>
            </button>
          </div>
          <div v-if="toggle" class="panel">
            <p>
              Netflix is a streaming service that offers a wide variety of
              award-winning TV shows, movies, anime, documentaries, and more on
              thousands of internet-connected devices.
              <br />
              <br />
              You can watch as much as you want, whenever you want – all for one
              low monthly price. There's always something new to discover and
              new TV shows and movies are added every week!
            </p>
          </div>
        </li>

        <li>
          <div @click="fctToggle2" class="li-div">
            <button class="button-faq">
              <h3>How much does Netflix cost?</h3>
              <p v-if="toggle2" class="croix">+</p>
              <p v-else class="plus">+</p>
            </button>
          </div>
          <div v-if="toggle2" class="panel">
            <p>
              Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              EUR&nbsp;19.99 to EUR&nbsp;5.99 a month. No extra costs, no
              contracts.
            </p>
          </div>
        </li>

        <li>
          <div @click="fctToggle3" class="li-div">
            <button class="button-faq">
              <h3>Where can I watch?</h3>
              <p v-if="toggle3" class="croix">+</p>
              <p v-else class="plus">+</p>
            </button>
          </div>
          <div v-if="toggle3" class="panel">
            <p>
              Watch anywhere, anytime. Sign in with your Netflix account to
              watch instantly on the web at netflix.com from your personal
              computer or on any internet-connected device that offers the
              Netflix app, including smart TVs, smartphones, tablets, streaming
              media players and game.
              <br />
              <br />
              You can also download your favorite shows with the iOS, Android,
              or Windows 10 app. Use downloads to watch while you're on the go
              and without an internet connection. Take Netflix with you
              anywhere.
            </p>
          </div>
        </li>

        <li>
          <div @click="fctToggle4" class="li-div">
            <button class="button-faq">
              <h3>How do I cancel?</h3>
              <p v-if="toggle4" class="croix">+</p>
              <p v-else class="plus">+</p>
            </button>
          </div>
          <div v-if="toggle4" class="panel">
            <p>
              Netflix is flexible. There are no pesky contracts and no
              commitments. You can easily cancel your account online in two
              clicks. There are no cancellation fees – start or stop your
              account anytime.
            </p>
          </div>
        </li>

        <li id="li-bot">
          <div @click="fctToggle5" class="li-div">
            <button class="button-faq">
              <h3>What can I watch on Netflix?</h3>
              <p v-if="toggle5" class="croix">+</p>
              <p v-else class="plus">+</p>
            </button>
          </div>
          <div v-if="toggle5" class="panel">
            <p>
              Netflix has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning Netflix originals, and more. Watch
              as much as you want, anytime you want.
            </p>
          </div>
        </li>
      </ul>
    </div>

    <inputEmail />
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
}

.faq-container {
  width: 50%;
  margin-top: 70px;
}

.faq-top {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: hsl(0, 0%, 95%);
}

.button-faq {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 25px;
  background-color: transparent;
  color: hsl(0, 0%, 95%);
  border: none;
}
.panel {
  background-color: hsl(0, 0%, 20%);
  overflow: hidden;
  margin-bottom: 5px;
  margin-top: 0.5px;
  > p {
    padding: 25px;
    font-size: 1.2rem;
    color: hsl(0, 0%, 95%);
  }
}

li {
  list-style: none;
  transition: background-color 200ms ease 200ms;
  margin-bottom: 5px;
}
#li-bot {
  margin-bottom: 55px;
}

h3 {
  font-size: 2rem;
  display: inline-block;
  font-weight: bold;
}

.plus,
.croix {
  font-size: 3rem;
  display: inline-block;
  cursor: pointer;
}
.faq {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}
</style>
