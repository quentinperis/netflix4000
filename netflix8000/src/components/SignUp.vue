<script setup>
import { ref, computed } from "vue";
import router from "@/router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useModalsStore } from "@/stores/modals";

const modalStore = useModalsStore();
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
// Validation du mot de passe
const passwordInvalid = computed(() => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;
  return passwordTouched.value && !passwordRegex.test(password.value);
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
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/.test(password.value) ||
    !passwordTouched.value ||

    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value) ||
    !emailTouched.value ||

    !(username.value) ||
    !usernameTouched.value
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
      router.push({ name: "netflix" });
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
  }
};

const moreSpan = ref(true);

function toggleSpan() {
  moreSpan.value = !moreSpan.value;
}

</script>

<template>
  <div class="modal">
    <div class="modal-header">
      <h2>Sign Up</h2>
    </div>

    <form @submit.prevent="signUp">
      <div class="container">
        <label for="username"></label>
        <span
          :class="{
            available: responseMessageUsername === 'Disponible',
            unavailable: responseMessageUsername !== 'Disponible',
          }"
        >
          {{ responseMessageUsername }}
        </span>

        <span
          :class="{
            invalid: usernameInvalid,
          }"
          v-if="usernameInvalid"
        >
          Invalid username!
        </span>
        <input
          v-model="username"
          id="username"
          placeholder="Enter your username"
          @input="handleUsernameInput"
          @change="usernameTouched = true"
          type="text"
          required
        />
      </div>

      <div class="container">
        <label for="email"></label>

        <span
          :class="{
            invalid: emailInvalid,
          }"
          v-if="emailInvalid"
        >
          Invalid email!
        </span>

        <span
          :class="{
            available: responseMessageEmail === 'Disponible',
            unavailable: responseMessageEmail !== 'Disponible',
          }"
        >
          {{ responseMessageEmail }}
        </span>

        <input
          v-model="email"
          id="email"
          placeholder="Email Adress"
          @input="handleEmailInput"
          @change="emailTouched = true"
          type="email"
          required
        />
      </div>

      <div class="container">
  <label for="password"></label>
  <span
    :class="{
      invalid: passwordInvalid,
    }"
    v-if="passwordInvalid && passwordTouched"
  >
    Veuillez rentrer un mot de passe contenant AU MOINS 1 chiffre, 1 caractère spécial, une majuscule, une minuscule et 8 caractères.
  </span>
  <span v-if="!passwordInvalid && passwordTouched" class="success-message">
    Bon Toutou.
  </span>
  <input
    v-model="password"
    @input="passwordTouched = true"
    @change="passwordTouched = true"
    id="password"
    placeholder="Password"
    type="password"
    required
  />
</div>



      <button class="btn" type="submit" :disabled="submitDisabled">
        Submit
      </button>
    </form>
    <div class="newto">
      <p>
        Already a user ?
        <a @click="modalStore.handleShowSignIn">sign In</a>
      </p>
    </div>
    <br />
    <span
      >This page is protected by Google reCAPTCHA to ensure you're not a bot.
    </span>
    <span v-if="moreSpan" @click="toggleSpan" class="clickable"
      >Learn more.</span
    >
    <span v-else>
      <br />
      <br />
      The information collected by Google reCAPTCHA is subject to the Google
      <a href="https://policies.google.com/privacy" target="_blank" class="clickable">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" class="clickable">Terms of Service</a>, and is used for
      providing, maintaining, and improving the reCAPTCHA service and for
      general security purposes (it is not used for personalized advertising by
      Google).
    </span>
  </div>
</template>

<style scoped>

a {
  cursor: pointer;
}

.success-message {
  color: rgb(176, 201, 67); 
  font-size: 1rem; 
  margin-top: 5px; 
}

.success-message::before {
  content: "\1F44D"; 
  margin-right: 5px; 
}

.clickable {
  color: hsl(207, 77%, 38%);
  cursor: pointer;
}
.clickable:hover {
  text-decoration: underline;
}
.modal {
  width: 500px;
  height: 80dvh;
  margin: 10dvh 0;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.875rem;
}

h2 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 2rem;
  font-weight: 750;
  color: #fff;
  text-align: left;
}

input {
  width: 100%;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid grey;
  background-color: hsla(0, 0%, 20%, 0.397);
  border-radius: 4px;
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