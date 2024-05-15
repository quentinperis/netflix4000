import { defineStore } from "pinia";

export const useModalsStore = defineStore({
  id: "modal",

  state: () => ({
    showSignUp: false,
    showSignIn: false,
    showInput: true,
    reconnection: false,
    errorMessage: false,
  }),

  actions: {
    handleShowSignUp() {
      this.showSignUp = true;
      this.showSignIn = false;
      this.showInput = false;
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
    },
  },
});
