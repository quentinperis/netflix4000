import { defineStore } from "pinia";
import axios from "axios";

export const useFormStore = defineStore({
  id: "form",
  state: () => ({
    username: "",
    email: "",
    password: "",

    emailTouched: false,
    usernameTouched: false,
    passwordTouched: false,
    
    emailUnavailable: false,
    usernameAvailable: false,

    responseMessageUsername: "",
    responseMessageEmail: "",
  }),

  getters: {
    // Calcul des états d'invalidité des champs avec getters au lieux de computed()
    passwordInvalid(state) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;
      return state.passwordTouched && !passwordRegex.test(state.password);
    },
    emailInvalid(state) {
      const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return state.emailTouched && !regexpEmail.test(state.email);
    },
    usernameInvalid(state) {
      return state.usernameTouched && state.username.trim() === "";
    },
    submitDisabled(state) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;
      const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return (
        !passwordRegex.test(state.password) ||
        !state.passwordTouched ||
        !regexpEmail.test(state.email) ||
        !state.emailTouched ||
        !(state.username) ||
        !state.usernameTouched
      );
    },
  },

  actions: {
    resetErrorMessage() {
      this.responseMessageUsername = "";
      this.responseMessageEmail = "";
    },
    setUsername(username) {
      this.username = username;
      this.usernameTouched = true;
      this.resetErrorMessage();
    },
    setEmail(email) {
      this.email = email;
      this.emailTouched = true;
      this.resetErrorMessage();
    },
    setPassword(password) {
      this.password = password;
      this.passwordTouched = true;
      this.resetErrorMessage();
    },
    async checkUsernameAvailability() {
      if (this.username.trim() !== "") {
        try {
          const response = await axios.get(
            `http://localhost:3000/auth/check-username/${this.username}`
          );
          this.usernameAvailable = response.data.available;
          this.responseMessageUsername = "Disponible";
        } catch (error) {
          this.responseMessageUsername =
            error.response && error.response.status === 400
              ? "Ce nom d'utilisateur est déjà pris"
              : "Une erreur s'est produite lors de la vérification du nom d'utilisateur.";
        }
      } else {
        this.responseMessageUsername = "";
      }
    },
    async checkEmailAvailability() {
      if (this.email.trim() !== "") {
        try {
          const response = await axios.get(
            `http://localhost:3000/auth/check-email/${this.email}`
          );
          this.emailUnavailable = !response.data.available;
          this.responseMessageEmail = ""; // Effacez le message avant de vérifier la disponibilité
          if (!this.emailInvalid) {
            // Vérifiez si l'email est valide avant d'afficher "Disponible"
            this.responseMessageEmail = "Disponible";
          }
        } catch (error) {
          this.responseMessageEmail =
            error.response && error.response.status === 400
              ? "Cet email est déjà pris"
              : "Une erreur s'est produite lors de la vérification de l'email.";
        }
      } else {
        this.responseMessageEmail = "";
      }
    },

    resetForm() {
        this.username = "";
        this.email = "";
        this.password = "";
        this.emailTouched = false;
        this.usernameTouched = false;
        this.passwordTouched = false;
        this.emailUnavailable = false;
        this.usernameAvailable = false;
        this.responseMessageUsername = "";
        this.responseMessageEmail = "";
      },

  },
});
