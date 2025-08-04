<script setup>
import { ref, onMounted } from 'vue'
import { createRetrofit } from '../../services/retrofitService'
import { fetchVehicleList } from '../../services/vehicleService'

const emit = defineEmits(['refresh'])

const newRetrofit = ref({
  vehicle_id: '',
  numero: '',
  etat: 'false',
  date: new Date().toISOString().slice(0, 10),
  commentaire: ''
})


const vehicles = ref([])

const loadVehicles = async () => {
  try {
    const res = await fetchVehicleList()
    vehicles.value = res.data.data
  } catch (err) {
    console.error('Erreur chargement des véhicules :', err)
  }
}
onMounted(() => {
  loadVehicles()
})

const errorMessage = ref('')

const submit = async () => {
  errorMessage.value = '' 
  try {
    const retrofitToSubmit = {
      ...newRetrofit.value,
      etat: newRetrofit.value.etat === 'true' // convertir string → boolean
    }
    await createRetrofit(retrofitToSubmit)
    emit('refresh')
    newRetrofit.value = {
      vehicle_id: '',
      numero: '',
      etat: 'false',
      date: new Date().toISOString().slice(0, 10),
      commentaire: ''
    }
  } catch (err) {
    console.error('Erreur création retrofit :', err)
    errorMessage.value = err.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join('<br>')
      : 'Erreur inconnue lors de la création du retrofit.'
  }
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <h2 class="text-2xl font-bold text-indigo-700">➕ Ajouter un Retrofit</h2>

    <div v-if="errorMessage" class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-sm" v-html="errorMessage" />

    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Véhicule -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">🚘 Véhicule associé</label>
        <select v-model="newRetrofit.vehicle_id" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Choisir un véhicule</option>
          <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
            {{ vehicle.name || 'Nom inconnu' }}
          </option>
        </select>
      </div>

      <!-- Numéro -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">🔢 Numéro</label>
        <input v-model="newRetrofit.numero" type="text" class="w-full p-3 border rounded-lg shadow-sm" placeholder="Numéro retrofit" />
      </div>

      <!-- État -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">⚙️ État</label>
        <select v-model="newRetrofit.etat" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Sélectionner un état</option>
          <option value="false">En attente</option>
          <option value="true">Terminé</option>
        </select>
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">📅 Date</label>
        <input v-model="newRetrofit.date" type="date" class="w-full p-3 border rounded-lg shadow-sm" />
      </div>

      <!-- Commentaire -->
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold mb-2 text-gray-700">📝 Commentaire</label>
        <textarea v-model="newRetrofit.commentaire" class="w-full p-3 border rounded-lg shadow-sm" placeholder="Ajouter un commentaire..." rows="3" />
      </div>

      <!-- Submit -->
      <div class="md:col-span-2 flex justify-end">
        <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          ➕ Ajouter
        </button>
      </div>
    </form>
  </div>
</template>
