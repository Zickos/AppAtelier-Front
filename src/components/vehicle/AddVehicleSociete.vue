<script setup>
import { ref } from 'vue'
import { createVehicle } from '@/services/vehicleSocieteService' // ⚠️ Crée ce service si pas encore fait

const emit = defineEmits(['refresh'])

const newVehicle = ref({
  name: '',
  marque: '',
  model: '',
  immatriculation: '',
  datemec: '',
  usage: '',
  site: '',
  copiecg: '',
  copieassurance: '',
  affectation: '',
  commentaire: '',
  datect: '',
  dateprochainct: '',
  dateentretien: '',
  dateprochainentretien: ''
})

const errorMessage = ref('')

const submit = async () => {
  errorMessage.value = ''
  try {
    await createVehicle(newVehicle.value)
    emit('refresh')

    newVehicle.value = {
      name: '',
      marque: '',
      model: '',
      immatriculation: '',
      datemec: '',
      usage: '',
      site: '',
      copiecg: '',
      copieassurance: '',
      affectation: '',
      commentaire: '',
      datect: '',
      dateprochainct: '',
      dateentretien: '',
      dateprochainentretien: ''
    }
  } catch (err) {
    console.error('Erreur création véhicule société :', err)
    errorMessage.value = err.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join('<br>')
      : 'Erreur inconnue lors de la création du véhicule.'
  }
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <h2 class="text-2xl font-bold text-indigo-700">➕ Ajouter un Véhicule Société</h2>

    <div v-if="errorMessage" class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-sm"
      v-html="errorMessage" />

    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="(value, key) in newVehicle" :key="key" class="col-span-1">
        <label class="block text-sm font-semibold mb-2 text-gray-700 capitalize">
          {{ key }}
        </label>
        <input
          v-model="newVehicle[key]"
          :type="key.startsWith('date') || key === 'datemec' ? 'date' : 'text'"
          class="w-full p-3 border rounded-lg shadow-sm"
          :placeholder="key"
        />
      </div>

      <!-- Submit -->
      <div class="md:col-span-2 flex justify-end">
        <button type="submit"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          ➕ Ajouter
        </button>
      </div>
    </form>
  </div>
</template>
