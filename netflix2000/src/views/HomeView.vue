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
    <button class="get-started-button"><RouterLink to="/signup">GET STARTED ></RouterLink></button>
  </div>
  
</div>
</baseBackground>

</template>


<style scoped>



.responsive-image {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
object-fit: cover;
z-index: -1; 
}

.overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgb(0,0,0);
background: linear-gradient(0deg, rgba(0,0,0,0.10968137254901966) 31%, rgba(0,0,0,0.9136029411764706) 100%);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
}

.overlay h1 {
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


.overlay h2 {
color: white;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.overlay p {
color: white;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.overlay button {
background-color: #DE0510;

border: none;
cursor: pointer;
display: flex;
  align-items: center;
  margin-top: -1vh; 
  width: 800px; 
  max-width: 600px; 
  height: 60px;
}

.container {
  display: flex;
  align-items: center;
  margin-top: 1vh; 
  width: 800px; 
  max-width: 600px; 
  height: 60px;
}

input {
    width: 200%;
    padding: 20px;
    margin-bottom: 25px;
    background-color: white;
    border: none;
    border-radius: 4px;
    color: #fff;
  }
input::placeholder {
font-weight: bold;
opacity: 0.5;
color: gray;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.get-started-button {
    
    padding: 15px;
    background-color: #DE0E10;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
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