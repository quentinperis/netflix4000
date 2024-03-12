<script setup>
import baseBackground from '@/components/baseBackground.vue'; 
import { RouterLink } from 'vue-router';
</script>


<template>
<baseBackground>
  <button  id="signin-button"><RouterLink to="/signin">Sign In</RouterLink></button>
<div class="modal">
  <h1>Unlimited movies, TV shows and more.</h1>
  <h2>Watch anywhere. Cancel at any time.</h2>
  <p>Ready to watch? Enter your email to create or restart your membership</p>
  <div class="container">
    <input type="email" placeholder="Email Address" class="email-input">
    <button class="get-started-button"><RouterLink to="/signup">GET STARTED &gt;</RouterLink></button>
  </div>
  
</div>
</baseBackground>

</template>


<style>

html, body {
margin: 0;
padding: 0;
left: 0;
height: 100%;
}
.logo {
  position: fixed;
  top: 20px; 
  left: 20px; 
  height: 51px;
  width: 150px;
  z-index: 1;
  cursor: pointer;
}
#app {
position: relative;
min-height: 100vh;
}

.responsive-image {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
object-fit: cover;
z-index: -1; 
}

.modal {
position: fixed;
top: 0;
left: 0;
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
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
line-height: 125%;
width: 50%;
max-width: 90%;
padding-top: 200px;
margin: 0 auto; 
}


.modal h2 {
color: white;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.modal p {
color: white;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.modal button {
background-color: #DE0510;
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
caret-color: #DE0510;
outline: none;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
input::placeholder {
font-weight: bold;
opacity: 0.5;
color: gray;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.get-started-button {
padding: 10px 20px;
border: none;
background-color: #DE0E10;
color: white;
cursor: pointer;
width: 250px;
height: 50px;
font-size: 1.1rem ;
cursor: pointer;
}

#signin-button {
  height: 40px;
  width: 70px;
  background-color: #DE0510;
  color: white;
  z-index: 2;
  border: none;
  border-radius: 5px;
  position: fixed; 
  top: 20px; 
  right: 20px; 
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