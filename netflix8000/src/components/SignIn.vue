<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import axios from "axios";
import { useAuthStore } from '@/stores/auth';

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

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      
      username.value = response.data.username; // Mettre à jour le nom d'utilisateur

      // Appeler la méthode logIn de votre magasin authStore avec le nom d'utilisateur récupéré
      authStore.logIn(response.data.username);

     // Rediriger vers la page /netflix 
      router.push({ name: 'netflix'});

    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
};

</script>

<template>
    <div class="modal">
      <div class="modal-header">
        <h2>Sign In</h2>
      </div>
      <form @submit.prevent="logIn">
        <div class="container">
          <label for="email"></label>
          <span :class="{
        invalid: emailInvalid,
      }" v-if="emailInvalid">
            Invalid email!
          </span>
          <input v-model="email" id="email" placeholder="Email Adress" @input="emailTouched = true"
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
          New to Netflix ?

          <RouterLink to="#">
            <a>sign up now</a>
          </RouterLink>
        </p>
      </div>
    </div>
</template>

<style scoped>
.modal {
  width: 500px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
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
  padding: 15px;
  margin-bottom: 25px;
  background-color: #333;
  border: none;
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

form>button:is([disabled]) {
  background-color: gray;
}

form>button:not([disabled]):hover {
  cursor: pointer;
  background-color: hsl(0, 0%, 22%);
}
</style>
