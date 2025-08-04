<script setup>
import { ref, onMounted } from 'vue'
import { createPlanning } from './../../services/planningService'
import { fetchRetrofitList } from './../../services/retrofitService'
import { fetchVehicleList } from './../../services/vehicleService'
import { fetchUserList } from './../../services/userService'
import { format } from 'date-fns'

const emit = defineEmits(['refresh'])

const newPlanning = ref({
  vehicle_id: '',
  retrofit_id: '',
  user_ids: [],
  etat: 'false',
  date_debut: format(new Date(), 'yyyy-MM-dd'),
  date_fin: format(new Date(), 'yyyy-MM-dd'),
  commentaire: ''
})

const vehicles = ref([])
const retrofits = ref([])
const users = ref([])

const loadVehicles = async () => {
  try {
    const res = await fetchVehicleList()
    vehicles.value = res.data.data
  } catch (err) {
    console.error('Erreur chargement véhicules :', err)
  }
}

const loadRetrofits = async () => {
  try {
    const res = await fetchRetrofitList()
    retrofits.value = res.data.data
  } catch (err) {
    console.error('Erreur chargement rétros :', err)
  }
}

const loadUsers = async () => {
  try {
    const res = await fetchUserList()
    users.value = res.data.data
  } catch (err) {
    console.error('Erreur chargement utilisateurs :', err)
  }
}

onMounted(() => {
  loadVehicles()
  loadRetrofits()
  loadUsers()
})

const errorMessage = ref('')

const submit = async () => {
  errorMessage.value = '' 
  try {
    const planningToSubmit = {
      ...newPlanning.value,
      etat: newPlanning.value.etat === 'true' // convertir string → bool
    }
    await createPlanning(planningToSubmit)
    emit('refresh')
    newPlanning.value = {
      vehicle_id: '',
      retrofit_id: '',
      user_ids: [],
      etat: 'false',
      date_debut: format(new Date(), 'yyyy-MM-dd'),
      date_fin: format(new Date(), 'yyyy-MM-dd'),
      commentaire: ''
    }
    errorMessage.value = ''
  } catch (err) {
    console.error('Erreur création planning :', err)
    errorMessage.value = err.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join('<br>')
      : 'Erreur inconnue lors de la création du planning.'
  }
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <h2 class="text-2xl font-bold text-indigo-700">➕ Ajouter une tâche</h2>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-sm" v-html="errorMessage" />

    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Utilisateurs -->
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold mb-2 text-gray-700">👥 Utilisateurs :</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div v-for="user in users" :key="user.id" class="flex items-center gap-2">
            <input
              type="checkbox"
              :id="`user-${user.id}`"
              :value="user.id"
              v-model="newPlanning.user_ids"
              class="accent-indigo-600"
            />
            <label :for="`user-${user.id}`" class="text-sm text-gray-700">{{ user.prenom }} {{ user.nom }}</label>
          </div>
        </div>
      </div>

      <!-- Véhicule -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">🚗 Véhicule</label>
        <select v-model="newPlanning.vehicle_id" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Choisir un véhicule</option>
          <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
            {{ vehicle.type?.name || 'Type inconnu' }} - {{ vehicle.name }}
          </option>
        </select>
      </div>

      <!-- Retrofit -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">🔧 Retrofit</label>
        <select v-model="newPlanning.retrofit_id" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Choisir un retrofit</option>
          <option v-for="retrofit in retrofits" :key="retrofit.id" :value="retrofit.id">
            {{ retrofit.numero || 'Numéro inconnu' }}
          </option>
        </select>
      </div>

      <!-- État -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">⚙️ État</label>
        <select v-model="newPlanning.etat" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Sélectionner un état</option>
          <option value="false">En attente</option>
          <option value="true">Terminé</option>
        </select>
      </div>

      <!-- Dates -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">📅 Date de début</label>
        <input type="date" v-model="newPlanning.date_debut" class="w-full p-3 border rounded-lg shadow-sm" />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">📅 Date de fin</label>
        <input type="date" v-model="newPlanning.date_fin" class="w-full p-3 border rounded-lg shadow-sm" />
      </div>

      <!-- Commentaire -->
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold mb-2 text-gray-700">📝 Commentaire</label>
        <textarea
          v-model="newPlanning.commentaire"
          placeholder="Ajouter un commentaire"
          rows="4"
          class="w-full p-3 border rounded-lg shadow-sm"
        />
      </div>

      <!-- Submit -->
      <div class="md:col-span-2 flex justify-end">
        <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          ➕ Créer la tâche
        </button>
      </div>
    </form>
  </div>
</template>
