import axios from 'axios'; // <- Usa minúscula, es la forma estándar

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance; // <- Exporta como default