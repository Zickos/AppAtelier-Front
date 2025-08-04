<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-50 px-6 py-12">
    <div class="w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-8">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Connexion</h1>
        <p class="mt-1 text-sm text-gray-600">Entrez vos identifiants pour accéder à votre espace</p>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input v-model="password" type="password" required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div v-if="error" class="text-sm text-red-600">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { login as loginAPI } from '../services/authService'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loading = ref(false)
    const router = useRouter()

    const auth = useAuthStore()

    const submitLogin = async () => {
      error.value = ''
      loading.value = true

      try {
        const response = await loginAPI(email.value, password.value)
        const { token, user } = response.data
        auth.setToken(token)
        auth.setUser(user)
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
        router.push('/home')
      } catch (err) {
        error.value = err.response?.data?.message || 'Erreur de connexion.'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      error,
      loading,
      login: submitLogin,
    }
  },
}
</script>
