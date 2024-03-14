<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
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
</template>

<style scoped>

#ready {
  margin-top: 25px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: hsl(0, 0%, 95%);
}

.RL {
  color: hsl(0, 0%, 95%);
  text-decoration: none;
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
</style>