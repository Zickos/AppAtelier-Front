import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // remplace par ton vrai endpoint
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter automatiquement le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
