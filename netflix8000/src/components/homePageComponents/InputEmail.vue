<script setup>
import { useModalsStore } from "@/stores/modals";
import { onMounted, watch } from "vue";
import { useFormStore } from "@/stores/form";

const formStore = useFormStore();
const modalStore = useModalsStore();

// ❗️ Réinitialiser les champs et les messages lorsque le composant est monté
onMounted(() => {
  formStore.resetInputErrors();
  formStore.setEmail("");
});

const handleSignUp = (email) => {
  // Prendre email comme argument
  modalStore.handleShowSignUp(email); // Passer email au store
  console.log(email);
  window.scrollTo(0, 0);
};

watch(
  () => formStore.email,
  (newEmail, oldEmail) => {
    if (newEmail !== oldEmail) {
      formStore.setEmail(newEmail);
      formStore.checkEmailAvailability();
    }
  }
);
</script>

<template>
  <div id="ready">
    <div class="text-container">
      <p class="text">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
    </div>
    <div class="container">
      <div class="input-container">
        <input v-model="formStore.email" :class="{ 'error-input': formStore.emailError }" id="email"
          placeholder="Email Adress" @input="formStore.setEmail($event.target.value)"
          @blur="formStore.checkEmailAvailability" type="email" required />

        <button class="get-started-button" @click="handleSignUp(formStore.email)"
          :disabled="formStore.submitDisabledGetStarted">
          Get Started
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>
        </button>
      </div>
      <div class="errors-container">
        <span class="errors" v-if="formStore.emailInvalid && formStore.email !== ''">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img"
            data-icon="CircleXSmall" aria-hidden="true" class="default-ltr-cache-0 e1vkmu651">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
              fill="currentColor"></path>
          </svg>
          Please enter a valid email address.
        </span>

        <span class="errors" v-if="formStore.responseMessageEmail">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img"
            data-icon="CircleXSmall" aria-hidden="true" class="default-ltr-cache-0 e1vkmu651">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
              fill="currentColor"></path>
          </svg>
          {{ formStore.responseMessageEmail }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#ready {
  margin: 20px 0 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
}

.text-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

p {
  color: white;
  font-size: 1.45em;
  margin: 0;
}

.container {
  display: grid;

  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 1em;
  padding: 0 10px;
}

.input-container {
  width: 100%;
  height: 55px;
  display: flex;
  color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.errors-container {
  width: 100%;
  height: 20px;
}

.errors {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: red;
  margin-top: 0.3rem;
}

svg {
  margin-left: 0.7rem;
}

.arrow-icon {
  fill: white;
  vertical-align: middle;
}

input {
  border: 1px solid grey;
  border-radius: 5px;
  background-color: hsla(0, 0%, 9%, 0.633);
  color: white;
  padding: 1em;
  width: 100%;
  height: 100%;
  font-size: 1.2em;
}

input::placeholder {
  color: hsla(0, 0%, 75%, 0.938);
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
  width: 300px;
  height: 100%;
  padding: 3px 15px;
  font-size: 22px;
  font-weight: 700;
  border: none;
  background-color: #de0e10;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.get-started-button:hover {
  background-color: #c11119;
}

.get-started-button:disabled {
  cursor: not-allowed;
}

.errors {
  margin-top: 0.15rem;
  color: red;
}

.unavailable {
  color: red;
}

.text-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.text {
  color: white;
  font-size: 1.5em;
  margin: 0;
}



@media (max-width: 768px) {

  .text-container {
   max-width: 900px;
  }

  .text {
    font-size: 1.4em;
    margin: .5em;
    line-height: 1.3;
  }
   .container {
    max-width: 100%;
  }

}

@media (max-width: 425px) {
  .container {
    max-width: 100%;
    padding: 0 1.5em;
  }

  .text {
    font-size: 1.3em;
    padding: 0 5%;
    margin-bottom: .5em;
    line-height: 1.3;
  }

  .input-container {
    flex-direction: column;
    align-items: center;
  }

  .input-container input {
    width: 100%;
    margin-bottom: 1em;
    margin-top: 3em;
    height: 100%;
    font-size: 1.15em;
    font-weight: 500;
  }

  .input-container button {
    margin-left: 0;
    padding: 0.5em;
    font-size: 21px;
    width: 180px;
  }
}
</style>
