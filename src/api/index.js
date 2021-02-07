import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    accept: "application/json",
  },
});

export default api;
