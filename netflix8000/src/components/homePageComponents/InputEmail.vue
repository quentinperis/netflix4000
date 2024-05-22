<script setup>
import { useModalsStore } from "@/stores/modals";
import { onMounted, watch } from "vue";
import { useFormStore } from "@/stores/form";

const formStore = useFormStore();
const modalStore = useModalsStore();

// ❗️ Réinitialiser les champs et les messages lorsque le composant est monté
onMounted(() => {
  formStore.resetInputErrors();
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
    <div class="input">
      <div>
        <input
          v-model="formStore.email"
          id="email"
          placeholder="Email Adress"
          @input="formStore.setEmail($event.target.value)"
          @blur="formStore.checkEmailAvailability"
          type="email"
          required
        />
      </div>

      <div>
        <button
          class="get-started-button"
          @click="handleSignUp(formStore.email)"
          :disabled="formStore.submitDisabledGetStarted"
        >
          GET STARTED &gt;
        </button>
      </div>
    </div>

    <div class="errors">
      <span class="errors" v-if="formStore.emailInvalid">
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
        Please enter a valid email address.
      </span>

      <span class="errors" v-if="formStore.responseMessageEmail">
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
        {{ formStore.responseMessageEmail }}
      </span>
    </div>
  </div>
</template>

<style scoped>
#ready {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 50px;
}

.input {
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  justify-content: space-between;
  margin-top: 2.5rem;
}

.errors {
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  justify-content: start;
}

input {
  border: 1px solid grey;
  border-radius: 5px;
  background-color: hwb(0 15% 85% / 0.783);
  color: white;
  padding: 10px;
  width: 100%;
  height: 100%;
}

input::placeholder {
  color: hsla(0, 0%, 75%, 0.938);
}

button {
  margin-left: 7px;
  width: 150px;
  height: 100%;
  border: none;
  background-color: #de0e10;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.get-started-button:hover {
  background-color: #c11119;
}

.errors {
  margin-top: 0.15rem;
  color: red;
}

.unavailable {
  color: red;
}
</style>
