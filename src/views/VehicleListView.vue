<script setup>
import { ref, onMounted } from 'vue'
import { fetchVehicleList } from '../services/vehicleService'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const vehicles = ref([])
const loading = ref(false)
const error = ref('')

const typeColors = {
  ABS: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  TMX: 'bg-green-100 border-green-400 text-green-800',
  Fenwick: 'bg-blue-100 border-blue-400 text-blue-800',
  Charlatte: 'bg-red-100 border-red-400 text-red-800',
  Autre: 'bg-gray-100 border-gray-300 text-gray-700'
}

const getTypeClass = (typeName) => {
  return typeColors[typeName] || typeColors.Autre
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetchVehicleList()
    console.log('Véhicules chargés:', response.data.data)
    vehicles.value = response.data.data
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
      <div class="mx-auto space-y-8">
        <header>
          <h1 class="text-3xl font-bold text-gray-800">Liste des Véhicules</h1>
          <p class="text-gray-600 mt-1">Affichage détaillé de tous les véhicules enregistrés.</p>
        </header>

        <div v-if="loading" class="text-gray-600">Chargement…</div>
        <div v-else-if="error" class="text-red-600 font-medium">{{ error }}</div>

        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              :class="['rounded-lg border shadow-sm p-4', getTypeClass(vehicle.type?.name)]"
            >
              <div class="text-xl font-semibold mb-1">
                🚗 {{ vehicle.type?.name || 'Modèle inconnu' }}
              </div>
              <div class="text-sm mb-2">Numéro de série : <strong>{{ vehicle.num_serie || 'N/A' }}</strong></div>

              <div class="text-xs uppercase font-medium tracking-wide">
                Propriétaire : <span>{{ vehicle?.owner || 'Inconnu' }}</span>
                
                <div
                  v-for="retrofit in vehicle.retrofits"
                  :key="retrofit.id"
                  class="mt-2 text-gray-600"
                >
                  <div class="text-sm">
                    <span class="font-semibold">Affecté le :</span> {{ retrofit.date }}
                  </div>
                  <div v-if="retrofit.commentaire" class="text-xs italic text-gray-500">
                    Commentaire : {{ retrofit.commentaire }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p v-if="vehicles.length === 0" class="text-gray-500 mt-4 italic">Aucun véhicule trouvé.</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
