<script setup>
import { ref, onMounted, watch } from "vue";
import router from "@/router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useModalsStore } from "@/stores/modals";
import { useFormStore } from "@/stores/form";

const authStore = useAuthStore();
const modalStore = useModalsStore();
const formStore = useFormStore();
const moreSpan = ref(true);

function toggleSpan() { moreSpan.value = !moreSpan.value };

// ❗️ Réinitialiser les champs et les messages lorsque le composant est monté
onMounted(() => {
  formStore.resetForm();
  formStore.setEmail(modalStore.signUpEmail); // Initialiser l'email du formulaire
});

const handleSignIn = () => {
  modalStore.handleShowSignIn();
  window.scrollTo(0, 0); // Remonter en haut de la page après l'affichage de la modal
};


watch(() => formStore.username, (newUsername, oldUsername) => {
    if (newUsername !== oldUsername) {
      formStore.setUsername(newUsername);
      formStore.checkUsernameAvailability();
    }
  }
);
watch(
  () => formStore.email, (newEmail, oldEmail) => {
    if (newEmail !== oldEmail) {
      formStore.setEmail(newEmail);
      formStore.checkEmailAvailability();
    }
  }
);
// Méthode de soumission du formulaire
const signUp = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/signup", {
      username: formStore.username,
      email: formStore.email,
      password: formStore.password,
    });
    if (response.data.token) {
      
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      authStore.signUp(response.data.username);
      router.push({ name: "netflix" });
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
        <span
          :class="{
            available: formStore.responseMessageUsername === 'Disponible',
            unavailable: formStore.responseMessageUsername !== 'Disponible',
          }"
        >
          {{ formStore.responseMessageUsername }}
        </span>

        <span
          :class="{
            invalid: formStore.usernameInvalid,
          }"
          v-if="formStore.usernameInvalid"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            role="img"
            data-icon="CircleXSmall"
            aria-hidden="true"
            class="default-ltr-cache-0 e1vkmu651"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
              fill="currentColor"
            ></path>
          </svg>
          Invalid username!
        </span>
        <input
          v-model="formStore.username"
          id="username"
          placeholder="Enter your username"
          @input="formStore.setUsername($event.target.value)"
          @blur="formStore.checkUsernameAvailability"
          type="text"
          required
        />
      </div>

      <div class="container">
        <label for="email"></label> 
        <input
          v-model="formStore.email"
          id="email"
          placeholder="Email Adress"
          type="email"
          required
          
        />
      </div>

      <div class="container">
        <label for="password"></label>
        <span
          :class="{
            invalid: formStore.passwordInvalid,
          }"
          v-if="formStore.passwordInvalid && formStore.passwordTouched"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            role="img"
            data-icon="CircleXSmall"
            aria-hidden="true"
            class="default-ltr-cache-0 e1vkmu651"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
              fill="currentColor"
            ></path>
          </svg>
          Please enter a password containing AT LEAST 1 number, 1 special
          character, an uppercase letter, a lowercase letter and 8 characters.
        </span>
        
        <span
          v-if="!formStore.passwordInvalid && formStore.passwordTouched"
          class="success-message"
        >
          Good Doggo.
        </span>
        <input
          v-model="formStore.password"
          @input="formStore.setPassword($event.target.value)"
          id="password"
          placeholder="Password"
          type="password"
          required
        />
      </div>

      <button class="btn" type="submit" :disabled="formStore.submitDisabledSignUp">
        Sign Up
      </button>
    </form>
    <div class="newto">
      <p>
        Already a user ?
        <a @click="handleSignIn">sign In</a>
      </p>
    </div>
    <br />
    <span class="text-recaptcha"
      >This page is protected by Google reCAPTCHA to ensure you're not a bot.
    </span>
    <span v-if="moreSpan" @click="toggleSpan" class="clickable"
      >Learn more.</span
    >
    <span v-else>
      <br />
      <br />
      The information collected by Google reCAPTCHA is subject to the Google
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        class="clickable"
        >Privacy Policy</a
      >
      and
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        class="clickable"
        >Terms of Service</a
      >, and is used for providing, maintaining, and improving the reCAPTCHA
      service and for general security purposes (it is not used for personalized
      advertising by Google).
    </span>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}

.text-recaptcha {
  color: #636363;
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
