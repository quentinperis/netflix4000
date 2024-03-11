<script setup>
import baseBackground from '@/components/baseBackground.vue';



</script>

<template>
<baseBackground>
<div class="modal"> 
  <h2>Sign In</h2>
  
  <div><label for="email"></label>
      <input
        v-model="email" id="email" placeholder="Email Adress" @input="emailTouched = true"
        @change="emailTouched = true" 
        type="email"
        required
      />
      <span v-if="emailInvalid">Invalid email!</span>
</div>

<div>
    <label for="password"></label>
    <input
            v-model="password"
            @input="passwordTouched = true"
            @change="passwordTouched = true"
            id="password" placeholder="Password"
            type="password"
            required
          />
          <span v-if="passwordInvalid">Invalid password!</span>  
        </div>


  <button type="submit">Sign In</button>
  <div class="newto"><p>New to Netflix ? <a>sign up now</a></p></div>

</div>

</baseBackground>
</template>

<style scoped>
  base-background {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .modal {
    height: 600px;
    width: 500px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    text-align: center;
    margin-top: 30rem;
  }

  h2 {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 30px;
    text-align:left;
  }

  input {
    width: 100%;
    padding: 15px;
    margin-bottom: 25px;
    background-color: #333;
    border: none;
    border-radius: 4px;
    color: #fff;
  }

  button {
    width: 100%;
    padding: 15px;
    background-color: #e50914;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #8d0b0b;
  }

  .newto {
    color: #fff;
    font-size: 0.9rem;
    margin-top: 20px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }

</style>