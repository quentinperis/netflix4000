import axios from "axios";

axios.interceptors.request.use((config) => {
  // Supprimer le contenu sensible de la requête
  delete config.data.password; // Supprimer le mot de passe de la requête
  delete config.data.username; // Supprimer le nom d'utilisateur de la requête
  return config;
});

export default axios;
