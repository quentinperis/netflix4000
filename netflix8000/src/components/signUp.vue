<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import router from "@/router";
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Déclaration des références
const username = ref("");
const email = ref("");
const password = ref("");

const emailTouched = ref(false);
const usernameTouched = ref(false);
const passwordTouched = ref(false);

const emailUnavailable = ref(false);
const usernameAvailable = ref(false);

const responseMessageUsername = ref("");
const responseMessageEmail = ref("");


// Calcul des états d'invalidité des champs
const passwordInvalid = computed(() => {
  return password.value.trim() === "" && passwordTouched.value;
});
const emailInvalid = computed(() => {
  const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailTouched.value && !regexpEmail.test(email.value);
});
const usernameInvalid = computed(() => {
  return usernameTouched.value && username.value.trim() === "";
});
const submitDisabled = computed(
  () =>
    password.value === "" ||
    !passwordTouched.value ||
    !emailTouched.value ||
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value) ||
    username.value.trim() === ""
);

// Gestionnaire d'événement pour l'entrée du nom d'utilisateur
const handleUsernameInput = async () => {
  usernameTouched.value = true;
  if (username.value.trim() !== "") {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/check-username/${username.value}`
      );
      usernameAvailable.value = response.data.available;

      responseMessageUsername.value = "Disponible";
    } catch (error) {
      // Vérifiez si l'erreur est une erreur réseau ou une erreur 400
      responseMessageUsername.value =
        error.response && error.response.status === 400
          ? "Ce nom d'utilisateur est déjà pris"
          : "Une erreur s'est produite lors de la vérification du nom d'utilisateur.";
    }
  } else {
    responseMessageUsername.value = "";
  }
};

// Gestionnaire d'événement pour l'entrée d'email
const handleEmailInput = async () => {
  emailTouched.value = true;
  emailUnavailable.value = false;
  if (email.value.trim() !== "") {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/check-email/${email.value}`
      );

      emailUnavailable.value = !response.data.available;

      responseMessageEmail.value = ""; // Effacez le message avant de vérifier la disponibilité
      if (!emailInvalid.value) {
        // Vérifiez si l'email est valide avant d'afficher "Disponible"
        responseMessageEmail.value = "Disponible";
      }
    } catch (error) {
      responseMessageEmail.value =
        error.response && error.response.status === 400
          ? "Cet email est déjà pris"
          : "Une erreur s'est produite lors de la vérification de l'emai.";
    }
  } else {
    responseMessageEmail.value = "";
  }
};

// Méthode de soumission du formulaire
const signUp = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/signup", {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      username.value = response.data.username; // Mettre à jour le nom d'utilisateur

      // Appeler l'action signUp de votre magasin authStore avec le nom d'utilisateur
      authStore.signUp(response.data.username);

      // Rediriger vers la page /netflix 
      router.push({ name: 'netflix' });

    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
  }
};


</script>

<template>

  <div class="modal">
    <div class="modal-header">
      <h2>Sign Up</h2>
    </div>

    <form @submit.prevent="signUp">
      <div class="container">
        <label for="username"></label>
        <span :class="{
      available: responseMessageUsername === 'Disponible',
      unavailable: responseMessageUsername !== 'Disponible',
    }">
          {{ responseMessageUsername }}
        </span>

        <span :class="{
      invalid: usernameInvalid,
    }" v-if="usernameInvalid">
          Invalid username!
        </span>
        <input v-model="username" id="username" placeholder="Enter your username" @input="handleUsernameInput"
          @change="usernameTouched = true" type="text" required />
      </div>

      <div class="container">
        <label for="email"></label>

        <span :class="{
      invalid: emailInvalid,
    }" v-if="emailInvalid">
          Invalid email!
        </span>

        <span :class="{
      available: responseMessageEmail === 'Disponible',
      unavailable: responseMessageEmail !== 'Disponible',
    }">
          {{ responseMessageEmail }}
        </span>

        <input v-model="email" id="email" placeholder="Email Adress" @input="handleEmailInput"
          @change="emailTouched = true" type="email" required />
      </div>

      <div class="container">
        <label for="password"></label>
        <span :class="{
      invalid: passwordInvalid,
    }" v-if="passwordInvalid">
          Invalid password!
        </span>
        <input v-model="password" @input="passwordTouched = true" @change="passwordTouched = true" id="password"
          placeholder="Password" type="password" required />
      </div>

      <button class="btn" type="submit" :disabled="submitDisabled">Submit</button>
    </form>
    <div class="newto">
      <p>
        Already a user ?
        <RouterLink to="/SignIn">sign in now</RouterLink>
      </p>
    </div>
  </div>

</template>

<style scoped>
.modal {
  width: 31.25rem;
  padding: 1.25rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.9375rem;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.875rem;
}

h2 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  color: #fff;
  text-align: left;
}

input {
  width: 100%;
  padding: 0.95rem;
  margin-bottom: 1.56rem;
  margin-top: 0.5rem;
  background-color: #333;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
}

.available {
  color: green;
}

.unavailable {
  color: red;
}

.invalid {
  color: red;
}

.btn {
  width: 100%;
  padding: 0.9375rem;
  background-color: #de0e10;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #c11119;
}

.btn:disabled {
  background-color: #636363;
  cursor: not-allowed;
}

.newto {
  color: #fff;
  font-size: 0.9rem;
  margin-top: 1.25rem;
}

a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

@media only screen and (max-width: 48em) {
  .container {
    flex-direction: column;
  }

  .get-started-button {
    margin-top: 0.625rem;
  }
}
</style>
