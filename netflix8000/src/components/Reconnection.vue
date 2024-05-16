<script setup>
import { ref, computed } from "vue";
import router from "@/router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useModalsStore } from "@/stores/modals";

const modalStore = useModalsStore();
const authStore = useAuthStore();

const username = ref("");
const email = ref("");
const emailTouched = ref(false);
const password = ref("");
const passwordTouched = ref(false);

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
const logIn = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: email.value,
      password: password.value,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      username.value = response.data.username; // Mettre à jour le nom d'utilisateur

      // Appeler la méthode logIn de votre magasin authStore avec le nom d'utilisateur récupéré
      authStore.logIn(response.data.username);
      // Rediriger vers la page /netflix
      router.push({ name: "netflix" });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
};
const moreSpan = ref(true)

function toggleSpan() {
  moreSpan.value = !moreSpan.value
}
</script>

<template>
  <div class="modal">
    <div class="modal-header">
      <h2>Your session has expired.</h2>
    </div>
    <form @submit.prevent="logIn">
      <div class="container">
        <label for="email"></label>
        <span
          :class="{
            invalid: emailInvalid,
          }"
          v-if="emailInvalid"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true" class="default-ltr-cache-0 e1vkmu651"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor"></path></svg> Invalid email!
        </span>
        <input
          v-model="email"
          id="email"
          placeholder="Email Adress"
          @input="emailTouched = true"
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
          v-if="passwordInvalid"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true" class="default-ltr-cache-0 e1vkmu651"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor"></path></svg> Invalid password!
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
        Sign In
      </button>
    </form>
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

.btn {
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

.btn:hover {
  background-color: #c11119;
}

.btn:disabled {
  background-color: #636363;
  cursor: not-allowed;
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

form > button:is([disabled]) {
  background-color: gray;
}

form > button:not([disabled]):hover {
  cursor: pointer;
}
</style>
