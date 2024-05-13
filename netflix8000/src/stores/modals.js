import { defineStore } from "pinia";

export const useModalsStore = defineStore({
  id: "modals",

  state: () => ({
    showSignUp: false,
    showSignIn: false,
    showInput: true,
    reconnection: false,
  }),

  actions: {
    handleShowSignUp() {
      showSignUp.value = true;
      showSignIn.value = false;
      showInput.value = false;
    },

    handleShowSignIn() {
      showSignIn.value = true;
      showSignUp.value = false;
      showInput.value = false;
    },

    handleCloseModals() {
      reconnection = false;
      showSignIn = false;
      showSignUp = false;
      showInput = true;
    },
  },
});
