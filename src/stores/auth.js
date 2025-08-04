import { is } from 'date-fns/locale'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || null,
    user: JSON.parse(localStorage.getItem('auth_user')) || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role_id === 1,
  },

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('auth_token', token)
    },

    setUser(user) {
      this.user = user
      localStorage.setItem('auth_user', JSON.stringify(user))
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    },
  },
})
