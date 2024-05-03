<script setup>
import baseBackground from "@/components/baseBackground.vue";
import { ref, computed } from "vue";
import axios from 'axios';
import { RouterLink } from "vue-router";
import router from '@/router';


// Déclaration des références
const username = ref(""); 
const email = ref("");
const emailTouched = ref(false);
const password = ref("");
const passwordTouched = ref(false);

// Calcul des états d'invalidité des champs
const passwordInvalid = computed(() => {
  return password.value.trim() === "" && passwordTouched.value;
});

const emailInvalid = computed(() => {
  const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailTouched.value && !regexpEmail.test(email.value);
});

const submitDisabled = computed(
  () =>
    password.value === "" ||
    !passwordTouched.value ||
    !emailTouched.value ||
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)
);

// Méthode de soumission du formulaire
const signUp = async () => {
   try {
    const response = await axios.post('http://localhost:3000/auth/signup', {
      username: username.value,
      email: email.value,
      password: password.value
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);

      // Ajouter le token JWT à l'en-tête Authorization de chaque requête axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Supprimer le contenu sensible de la requête
      axios.interceptors.request.use((config) => {
        if (config.data) {
          delete config.data.password; // Supprimer le mot de passe de la requête
          delete config.data.username; // Supprimer le nom d'utilisateur de la requête
        }
        return config;
      });

      router.push('/netflix'); // Redirection vers la page Netflix après l'inscription
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
  }
};


</script>


<template>
  <baseBackground>
    <div class="modal">
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <div class="container">
          <label for="username"></label>
          <input
            v-model="username"
            id="username"
            placeholder="Firstname"
            type="text"
            required
          />
        </div>

        <div class="container">
          <label for="email"></label>
          <input
            v-model="email"
            id="email"
            placeholder="Email Adress"
            @input="emailTouched = true"
            @change="emailTouched = true"
            type="email"
            required
          />
          <span v-if="emailInvalid">Invalid email!</span>
        </div>

        <div class="container">
          <label for="password"></label>
          <input
            v-model="password"
            @input="passwordTouched = true"
            @change="passwordTouched = true"
            id="password"
            placeholder="Password"
            type="password"
            required
          />
          <span v-if="passwordInvalid">Invalid password!</span>
        </div>

        <button type="submit" :disabled="submitDisabled">Submit</button>
      </form>
      <div class="newto">
        <p>
          Already a user ?
          <RouterLink to="/SignIn">sign in now</RouterLink>
        </p>
      </div>
    </div>
  </baseBackground>
</template>

<style scoped>
#baseBackground {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.modal {
  width: 500px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  text-align: center; 
}

h2 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-align: left;
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
  background-color: #de0e10;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c11119;
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

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .get-started-button {
    margin-top: 10px;
  }
}
</style>
@/service/axios