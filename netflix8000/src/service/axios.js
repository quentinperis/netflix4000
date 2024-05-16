import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useModalsStore } from "@/stores/modals";

const authStore = useAuthStore();
const modalStore = useModalsStore();


axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Session expired') {
          modalStore.reconnection = true;
          authStore.logout();
          router.push("/");
        } else {
          modalStore.errorMessage = true;
        }
      }
      return Promise.reject(error);
    }
  );



export default axios;
