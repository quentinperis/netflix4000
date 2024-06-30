import { defineStore } from "pinia";
import { instance as axios } from "@/api/axios";

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
    passwordInvalid(state) {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;
      return state.passwordTouched && !passwordRegex.test(state.password);
    },
    emailInvalid(state) {
      const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return state.emailTouched && !regexpEmail.test(state.email);
    },
    usernameInvalid(state) {
      return state.usernameTouched && state.username.trim() === "";
    },
    submitDisabledSignUp(state) {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;
      const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return (
        !passwordRegex.test(state.password) ||
        !state.passwordTouched ||
        !regexpEmail.test(state.email) ||
        !state.emailTouched ||
        !state.username ||
        !state.usernameTouched
      );
    },
    submitDisabledSignIn(state) {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;
      const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return (
        !passwordRegex.test(state.password) ||
        !state.passwordTouched ||
        !regexpEmail.test(state.email) ||
        !state.emailTouched
      );
    },
    submitDisabledGetStarted(state) {
      const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      return (
        !regexpEmail.test(state.email) ||
        !state.emailTouched ||
        state.responseMessageEmail === "This email is already taken." ||
        state.responseMessageEmail === "An error occurred while checking the email."
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
          const response = await axios.get(`/auth/check-username/${this.username}`);
          this.usernameAvailable = response.data.available;
          this.responseMessageUsername = "Available";
        } catch (error) {
          this.responseMessageUsername =
            error.response && error.response.status === 400
            ? "This username is already taken."
            : "An error occurred while checking the username.";
        }
      } else {
        this.responseMessageUsername = "";
      }
    },
    async checkEmailAvailability() {
      if (this.email.trim() !== "") {
        try {
          const response = await axios.get(`/auth/check-email/${this.email}`);
          this.emailUnavailable = !response.data.available;
          if (!response.data.available) {
            this.responseMessageEmail = "This email is already taken.";
          } else {
            this.responseMessageEmail = "";
          }
        } catch (error) {
          this.responseMessageEmail =
            error.response && error.response.status === 400
              ? "This email is already taken."
              : "An error occurred while checking the email.";
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
    resetInputErrors() {
      this.resetErrorMessage();
    },
  },
});
