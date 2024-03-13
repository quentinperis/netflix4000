<script setup>
import baseBackground from "@/components/baseBackground.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

// const accordionItem = document.querySelectorAll(".accordion-item")

// accordionItem.forEach(item => {
//   const question = item.querySelectorAll(".button-faq");
//   question.addEventListener("click", () => {
//     item.classList.toggle("active");
//   })
// })

const toggle = ref(false);
const toggle2 = ref(false);
const toggle3 = ref(false);
const toggle4 = ref(false);
const toggle5 = ref(false);
</script>

<template>
  <baseBackground>
    <RouterLink class="RL" to="/signin">
      <button id="signin-button">Sign In</button>
    </RouterLink>
    <div class="modal">
      <h1>Unlimited movies, TV shows and more.</h1>
      <h2>Watch anywhere. Cancel at any time.</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <div class="container">
        <input type="email" placeholder="Email Address" class="email-input" />
        <RouterLink class="RL" to="/signup"
          ><button class="get-started-button">GET STARTED &gt;</button>
        </RouterLink>
      </div>
    </div>
  </baseBackground>
  <div class="faq">
    <div class="faq-container">
      <p class="faq-top">Frequently Asked Questions</p>
      <ul>
        <li>
          <div @click="toggle = !toggle" class="li-div">
            <button class="button-faq">
              <h3>What is Netflix?</h3>
              <p class="plus">+</p>
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
          <div @click="toggle2 = !toggle2" class="li-div">
            <button class="button-faq">
              <h3>How much does Netflix cost?</h3>
              <p class="plus">+</p>
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
          <div @click="toggle3 = !toggle3" class="li-div">
            <button class="button-faq">
              <h3>Where can I watch?</h3>
              <p class="plus">+</p>
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
          <div @click="toggle4 = !toggle4" class="li-div">
            <button class="button-faq">
              <h3>How do I cancel?</h3>
              <p class="plus">+</p>
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
          <div @click="toggle5 = !toggle5" class="li-div">
            <button class="button-faq">
              <h3>What can I watch on Netflix?</h3>
              <p class="plus">+</p>
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

    <div id="ready">
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <div class="container">
        <input type="email" placeholder="Email Address" class="email-input" />
        <RouterLink class="RL" to="/signup"
          ><button class="get-started-button">GET STARTED &gt;</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.li-div {
  height: 100%;
  width: 100%;
  background-color: hsl(0, 0%, 20%);
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
#ready {
  margin-top: 25px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

li {
  list-style: none;
  transition: background-color 200ms ease 200ms;
  margin-bottom: 5px;
}
#li-bot {
  margin-bottom: 55px;
}
/* li :hover {
  background-color: hsl(0, 0%, 30%);
} */

h3 {
  font-size: 2rem;
  display: inline-block;
  font-weight: bold;
}

.plus {
  font-size: 3rem;
  display: inline-block;
}
.faq {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: hsl(0, 0%, 2%);
}

.RL {
  color: hsl(0, 0%, 95%);
  text-decoration: none;
}



.modal {
  position: absolute;
  top: -10%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.modal h1 {
  color: white;
  font-size: 2.5rem;
  font-weight: 900;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  line-height: 125%;
  width: 50%;
  max-width: 90%;
  padding-top: 200px;
  margin: 0 auto;
}

.modal h2 {
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.modal p {
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.modal button {
  background-color: #de0510;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.container {
  display: flex;
  align-items: center;
  margin-top: 1vh;
  width: 80vw;
  max-width: 600px;
  height: 8vh;
}

.email-input {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: white;
  height: 50px;
  font-size: 1.1rem;
  caret-color: #de0510;
  outline: none;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
input::placeholder {
  font-weight: bold;
  opacity: 0.5;
  color: gray;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.get-started-button {
  padding: 10px 20px;
  border: none;
  background-color: #de0e10;
  color: white;
  cursor: pointer;
  width: 250px;
  height: 50px;
  font-size: 1.1rem;
  cursor: pointer;
}

#signin-button {
  height: 40px;
  width: 70px;
  background-color: #de0510;
  color: white;
  z-index: 2;
  border: none;
  border-radius: 3px;
  position: absolute;
  top: 25px;
  right: 75px;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .get-started-button {
    margin-top: 10px;
  }
}
</style>
