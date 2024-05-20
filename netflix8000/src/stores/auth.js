import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLoggedIn: false,
    username: "",

  }),
  actions: {
    signUp(username) {
      this.isLoggedIn = true;
      this.username = username;
    },
    logIn(username) {
      this.isLoggedIn = true;
      this.username = username;
    },
    logout() {
      this.isLoggedIn = false;
      this.username = "";
    },

    async checkAuthStatus() {
      const token = localStorage.getItem("token");
      if (token) {
        // Configurer les en-têtes axios avec le token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          // Côté serveur pour obtenir les détails de l'utilisateur
          const response = await axios.get(
            "http://localhost:3000/auth/user-details"
          );
          const userData = response.data;
          this.isLoggedIn = true;
          this.username = userData.username;
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails de l'utilisateur :",
            error
          );
          // Déconnecter l'utilisateur en cas d'erreur
          this.isLoggedIn = false;
          this.username = "";
        }
      } else {
        // Si aucun token n'est trouvé, déconnecter l'utilisateur
        this.isLoggedIn = false;
        this.username = "";
      }
    },

  },
});
