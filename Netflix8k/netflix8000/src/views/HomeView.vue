<script setup>
import baseBackground from "@/components/baseBackground.vue";
import { RouterLink } from "vue-router";
</script>

<template>
      <baseBackground>
    <button id="signin-button">
      <RouterLink class="RL" to="/signin">Sign In</RouterLink>
    </button>
    <div class="modal">
      <h1>Unlimited movies, TV shows and more.</h1>
      <h2>Watch anywhere. Cancel at any time.</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <div class="container">
        <input type="email" placeholder="Email Address" class="email-input" />
        <button class="get-started-button">
          <RouterLink class="RL" to="/signup">GET STARTED &gt;</RouterLink>
        </button>
      </div>
    </div>
  </baseBackground>  
  <div class="faq">
    <div class="faq-container">
      <p class="faq-top">Frequently Asked Questions</p>
      <ul>
        <li><button class="button-faq"><h3>What is Netflix?</h3><p class="plus">+</p></button></li>
        <li><button class="button-faq"><h3>How much does Netflix cost?</h3><p class="plus">+</p></button></li>
        <li><button class="button-faq"><h3>Where can I watch?</h3><p class="plus">+</p></button></li>
        <li><button class="button-faq"><h3>How do I cancel?</h3><p class="plus">+</p></button></li>
        <li id="li-bot"><button class="button-faq"><h3>What can I watch on Netflix?</h3><p class="plus">+</p></button></li>
        
      </ul>
    </div>
    <div id="ready">
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <div class="container">
        <input type="email" placeholder="Email Address" class="email-input" />
        <button class="get-started-button">
          <RouterLink class="RL" to="/signup">GET STARTED &gt;</RouterLink>
        </button>
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

li, ul, .button-faq {
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
  padding: 8px 15px;
  background-color: hsl(0, 0%, 20%);
  color: hsl(0, 0%, 95%);
  border: none;
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
  margin-bottom: 10px;
  list-style: none;
  transition: background-color 200ms ease 200ms;
}
#li-bot {
  margin-bottom: 55px;
}
li :hover {
  background-color: hsl(0, 0%, 30%);
}

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
