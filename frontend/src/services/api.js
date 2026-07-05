import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Antes de cada requisição, anexa o token JWT salvo no login (se existir)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Se o token expirar ou for inválido, o backend responde 401.
// Nesse caso, removemos o token e mandamos o usuário de volta pro login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
