import axios from "axios";

const apiDenuncias = axios.create({
  baseURL: "http://localhost:8081", // serviço de denúncias e admin
});

apiDenuncias.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiDenuncias;