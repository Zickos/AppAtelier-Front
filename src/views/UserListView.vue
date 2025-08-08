<script setup>
import { ref, onMounted } from 'vue'
import { fetchUserOnlyList } from '../services/userService'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const users = ref([])
const loading = ref(false)
const error = ref('')

// Pour les badges de rôle (couleurs personnalisées selon le rôle)
const roleColors = {
  Admin: 'bg-red-100 text-red-800 border-red-300',
  Technicien: 'bg-blue-100 text-blue-800 border-blue-300',
  Utilisateur: 'bg-green-100 text-green-800 border-green-300',
  Inconnu: 'bg-gray-100 text-gray-700 border-gray-300'
}

const getRoleClass = (roleName) => {
  return roleColors[roleName] || roleColors.Inconnu
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetchUserOnlyList()
    /* console.log('Liste des utilisateurs:', response.data.data) */
    users.value = response.data.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur de chargement.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <DashboardLayout>
    <div class="min-h-full px-6 py-10 bg-gray-50">
      <div class="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 class="text-3xl font-bold text-gray-800">Liste des Utilisateurs</h1>
          <p class="text-gray-600 mt-1">Affichage de tous les comptes actifs.</p>
        </header>

        <div v-if="loading" class="text-gray-600">Chargement…</div>
        <div v-else-if="error" class="text-red-600 font-medium">{{ error }}</div>

        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="user in users"
              :key="user.id"
              class="rounded-lg border p-5 shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div class="flex items-center gap-4 mb-4">
                <div>
                  <h2 class="text-lg font-semibold text-gray-800">
                    {{ user.prenom }} {{ user.nom }}
                  </h2>
                </div>
              </div>

              <div
                class="inline-block text-xs font-medium px-2 py-1 rounded border"
                :class="getRoleClass(user.role?.name || 'Inconnu')"
              >
                {{ user.role?.name || 'Inconnu' }}
              </div>
            </div>
          </div>

          <p v-if="users.length === 0" class="text-gray-500 mt-4 italic">Aucun utilisateur trouvé.</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
