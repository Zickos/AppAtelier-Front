<script setup>
import { ref, onMounted } from 'vue'
import { createVehicle } from '../../services/vehicleService'
import { fetchTypeVehicleList } from '../../services/vehicleService'

const emit = defineEmits(['refresh'])

const newVehicle = ref({
  vehicle_id: '',
  type_vehicle_id: '',
  name: '',
  id_client: '',
  owner: '',
  num_serie: ''
})

const typeVehicles = ref([])

const loadTypeVehicles = async () => {
  try {
    const res = await fetchTypeVehicleList()
    typeVehicles.value = res.data.data
  } catch (err) {
    console.error('Erreur chargement types de véhicules :', err)
  }
}
onMounted(() => {
  loadTypeVehicles()
})

const errorMessage = ref('')

const submit = async () => {
  errorMessage.value = '' 
  try {
    await createVehicle(newVehicle.value)
    emit('refresh')
    newVehicle.value = {
      vehicle_id: '',
      type_vehicle_id: '',
      name: '',
      id_client: '',
      owner: '',
      num_serie: ''
    }
  } catch (err) {
    console.error('Erreur création véhicule :', err)
    errorMessage.value = err.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join('<br>')
      : 'Erreur inconnue lors de la création du véhicule.'
  }
}

</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <h2 class="text-2xl font-bold text-indigo-700">➕ Ajouter un Véhicule</h2>

    <div v-if="errorMessage" class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-sm" v-html="errorMessage" />

    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Type véhicule -->
      <div class="col-span-1">
        <label class="block text-sm font-semibold mb-2 text-gray-700">🚘 Type de véhicule</label>
        <select v-model="newVehicle.type_vehicle_id" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Choisir un type de véhicule</option>
          <option v-for="type in typeVehicles" :key="type.id" :value="type.id">
            {{ type.name || 'Type inconnu' }}
          </option>
        </select>
      </div>

      <!-- Nom -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">📛 Nom du véhicule</label>
        <input v-model="newVehicle.name" type="text" class="w-full p-3 border rounded-lg shadow-sm" placeholder="Ex: ABS'" />
      </div>

      <!-- Marque -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">📛 Marque du véhicule</label>
        <input v-model="newVehicle.marque" type="text" class="w-full p-3 border rounded-lg shadow-sm" placeholder="Ex: Air France'" />
      </div>

      <!-- ID Client -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">🔑 ID Client</label>
        <input v-model="newVehicle.id_client" type="text" class="w-full p-3 border rounded-lg shadow-sm" placeholder="ID client" />
      </div>

      <!-- Propriétaire -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">👤 Propriétaire</label>
        <input v-model="newVehicle.owner" type="text" class="w-full p-3 border rounded-lg shadow-sm" placeholder="Nom du propriétaire" />
      </div>

      <!-- Numéro de série -->
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold mb-2 text-gray-700">🔎 Numéro de série</label>
        <input v-model="newVehicle.num_serie" type="text" class="w-full p-3 border rounded-lg shadow-sm" placeholder="Ex : ABS 123" />
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
