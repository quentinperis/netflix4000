import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // ici l'URL de API de backend
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export { instance };