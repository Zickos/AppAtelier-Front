<script setup>
import { ref } from 'vue'
import { createVehicle } from '@/services/vehicleSocieteService' // ⚠️ Crée ce service si pas encore fait

const emit = defineEmits(['refresh'])

// 1) Données du formulaire
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

// 2) Définition des champs avec labels propres
//    ➜ Ajoute/retire ici pour contrôler l'ordre, le label, le type, etc.
const FIELDS = [
  { key: 'name', label: 'Nom', type: 'text', placeholder: 'Nom du véhicule' },
  { key: 'marque', label: 'Marque', type: 'text', placeholder: 'Marque' },
  { key: 'model', label: 'Modèle', type: 'text', placeholder: 'Modèle' },
  { key: 'immatriculation', label: 'Immatriculation', type: 'text', placeholder: 'AA-123-BB' },
  { key: 'datemec', label: 'Date MEC', type: 'date', placeholder: '' },
  { key: 'usage', label: 'Usage', type: 'text', placeholder: 'Pro / Perso / Pool…' },
  { key: 'site', label: 'Site', type: 'text', placeholder: 'Site / Agence' },
  { key: 'copiecg', label: 'Copie CG (lien)', type: 'text', placeholder: 'URL vers la carte grise' },
  { key: 'copieassurance', label: 'Copie Assurance (lien)', type: 'text', placeholder: 'URL vers l’Attestation' },
  { key: 'affectation', label: 'Affectation', type: 'text', placeholder: 'Nom du collaborateur / Service' },
  { key: 'commentaire', label: 'Commentaire', type: 'text', placeholder: 'Notes diverses' },
  { key: 'datect', label: 'Date CT', type: 'date', placeholder: '' },
  { key: 'dateprochainct', label: 'Date prochain CT', type: 'date', placeholder: '' },
  { key: 'dateentretien', label: 'Date entretien', type: 'date', placeholder: '' },
  { key: 'dateprochainentretien', label: 'Date prochain entretien', type: 'date', placeholder: '' }
]

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
    errorMessage.value = err?.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join('<br>')
      : 'Erreur inconnue lors de la création du véhicule.'
  }
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <h2 class="text-2xl font-bold text-indigo-700">➕ Ajouter un Véhicule Société</h2>

    <div
      v-if="errorMessage"
      class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-sm"
      v-html="errorMessage"
    />

    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="field in FIELDS"
        :key="field.key"
        class="col-span-1"
      >
        <label :for="`veh-${field.key}`" class="block text-sm font-semibold mb-2 text-gray-700">
          {{ field.label }}
        </label>

        <input
          v-model="newVehicle[field.key]"
          :id="`veh-${field.key}`"
          :type="field.type"
          class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :placeholder="field.placeholder || field.label"
        />
      </div>

      <!-- Submit -->
      <div class="md:col-span-2 flex justify-end">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          ➕ Ajouter
        </button>
      </div>
    </form>
  </div>
</template>
