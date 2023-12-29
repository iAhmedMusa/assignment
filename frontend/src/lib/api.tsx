import axios from "axios";

const defaultOption = {
  // baseURL: "http://localhost:4000/api/v1",
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
};

let api = axios.create(defaultOption);

api.interceptors.request.use((config) => {
  let token;

  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }
  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

export default api;
