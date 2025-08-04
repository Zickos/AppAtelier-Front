// services/authService.js
import api from './api'

export function login(email, password) {
  return api.post('/login', { email, password })
}
