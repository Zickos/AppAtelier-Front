<template>
  <DashboardLayout>
    <div class="bg-gray-50 py-12 px-6 min-h-full">
      <div class="max-w-7xl mx-auto space-y-10">
        <!-- Titre -->
        <header class="space-y-1">
          <h1 class="text-4xl font-bold text-gray-800">👋 Bonjour {{ auth.user?.prenom || 'Utilisateur' }}</h1>
          <p class="text-gray-600">Bienvenue sur votre tableau de bord personnalisé.</p>
        </header>

        <!-- Résumés -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold text-indigo-700">📆 Planning personnel</h2>
            <p class="text-sm text-gray-500 mt-2">3 tâches prévues cette semaine</p>
            <RouterLink to="/planningpersonnel" class="mt-4 inline-block text-sm text-indigo-600 hover:underline">
              Voir mon planning →
            </RouterLink>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold text-indigo-700">🚗 Véhicules affectés</h2>
            <p class="text-sm text-gray-500 mt-2">1 véhicule actif (Charlatte - FEN01)</p>
            <RouterLink to="/vehiclelist" class="mt-4 inline-block text-sm text-indigo-600 hover:underline">
              Gérer mes véhicules →
            </RouterLink>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold text-indigo-700">🛠️ Retrofits</h2>
            <p class="text-sm text-gray-500 mt-2">2 retrofits assignés</p>
            <RouterLink to="/gestionretrofit" class="mt-4 inline-block text-sm text-indigo-600 hover:underline">
              Voir les retrofits →
            </RouterLink>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold text-indigo-700">📋 Demandes</h2>
            <p class="text-sm text-gray-500 mt-2">2 demandes en attente</p>
            <RouterLink to="/gestiondemande" class="mt-4 inline-block text-sm text-indigo-600 hover:underline">
              Gérer mes demandes →
            </RouterLink>
          </div>
        </div>

        <!-- Bloc Détail -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl p-6 shadow space-y-3">
            <h3 class="text-lg font-bold text-indigo-800">📅 Prochaines tâches</h3>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>🛠️ Retrofit TMX - du 2 au 4 août</li>
              <li>🔍 Inspection technique - 5 août</li>
              <li>🚚 Livraison client - 8 août</li>
            </ul>
          </div>

          <div class="bg-white rounded-xl p-6 shadow space-y-3">
            <h3 class="text-lg font-bold text-indigo-800">🔔 Derniers changements</h3>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>✅ Demande #42 traitée par Lucas</li>
              <li>⚠️ Véhicule TMX02 indisponible (maintenance)</li>
              <li>📩 Nouvelle demande de retrait en attente</li>
            </ul>
          </div>
        </div>

        <!-- Bloc Admin (si rôle admin ou manager) -->
        <div v-if="[1, 2].includes(auth.user?.role_id)" class="bg-white rounded-xl p-6 shadow space-y-3">
          <h3 class="text-lg font-bold text-indigo-800">⚙️ Administration</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <RouterLink
              to="/gestionplanningmecano"
              class="block bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg p-4 text-center text-sm font-medium transition"
            >
              🔧 Planning atelier
            </RouterLink>
            <RouterLink
              to="/gestionvehicle"
              class="block bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg p-4 text-center text-sm font-medium transition"
            >
              🚘 Véhicules
            </RouterLink>
            <RouterLink
              to="/gestionretrofit"
              class="block bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg p-4 text-center text-sm font-medium transition"
            >
              🛠️ Retrofits
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>
