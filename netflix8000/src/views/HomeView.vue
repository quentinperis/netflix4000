<script setup>
import baseBackground from "@/components/baseBackground.vue";
import faq from "@/components/faq.vue";
import inputEmail from "@/components/inputEmail.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="main">
  <baseBackground>
    <RouterLink class="RL" to="/signin">
      <button id="signin-button">Sign In</button>
    </RouterLink>
    <div class="modal">
      <h1>Unlimited movies, TV shows and more.</h1>
      <h2>Watch anywhere. Cancel at any time.</h2>
      <inputEmail/>
    </div>
  </baseBackground>
  <faq/>
</div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  width: 100dvw;
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
