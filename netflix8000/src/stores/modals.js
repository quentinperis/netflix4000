import { defineStore } from "pinia";

export const useModalsStore = defineStore({
  id: "modal",

  state: () => ({
    showSignUp: false,
    showSignIn: false,
    showInput: true,
    reconnection: false,
    errorMessage: false,
    signUpEmail: ""
  }),

  actions: {
    handleShowSignUp(email) { 
      // Accepter email comme paramètre
      this.showSignUp = true;
      this.showSignIn = false;
      this.showInput = false;
      this.signUpEmail = email; 
      // Assigner email au state
    },
    handleShowSignIn() {
      this.showSignIn = true;
      this.showSignUp = false;
      this.showInput = false;
    },

    handleCloseModals() {
      this.reconnection = false;
      this.showSignIn = false;
      this.showSignUp = false;
      this.showInput = true;
      this.signUpEmail = "";
    },
    resetErrorMessage() {
      this.errorMessage = false;
    }
  },
});
