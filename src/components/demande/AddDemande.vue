<script setup>
import { ref, onMounted } from 'vue'
import { createDemande } from '@/services/demandeService'
import { fetchRetrofitList } from './../../services/retrofitService'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['refresh'])
const authStore = useAuthStore()

const retrofits = ref([])

const userId = ref(authStore.user.id)
const newDemande = ref({
  retrofit_id: '',
  user_id: '',
  type: '',
  commentaire: ''
})

const errorMessage = ref('')


const loadRetrofits = async () => {
  try {
    const res = await fetchRetrofitList()
    retrofits.value = res.data.data
  } catch (err) {
    console.error('Erreur chargement rétros :', err)
  }
}

onMounted(() => {
  loadRetrofits()
})

const submit = async () => {
  errorMessage.value = ''
  try {
    const demandeToSubmit = {
      ...newDemande.value,
      user_id: userId.value //
    }
  console.log(demandeToSubmit)


    await createDemande(demandeToSubmit)
    emit('refresh')

    // Réinitialisation du formulaire
    newDemande.value = {
      retrofit_id: '',
      user_id: userId.value,
      type: '',
      commentaire: ''
    }
  } catch (err) {
    console.error('Erreur création demande :', err)
    errorMessage.value = err.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join('<br>')
      : 'Erreur inconnue lors de la création de la demande.'
  }
}

</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <h2 class="text-2xl font-bold text-indigo-700">➕ Créer une demande</h2>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-sm"
      v-html="errorMessage" />

    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- État -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">⚙️ Type</label>
        <select v-model="newDemande.type" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Sélectionner un état</option>
          <option value="Commande">Commande</option>
          <option value="Retrait">Retrait</option>
        </select>
      </div>

      <!-- Retrofit -->
      <div>
        <label class="block text-sm font-semibold mb-2 text-gray-700">🔧 Retrofit</label>
        <select v-model="newDemande.retrofit_id" class="w-full p-3 border rounded-lg bg-white shadow-sm">
          <option disabled value="">Choisir un retrofit</option>
          <option v-for="retrofit in retrofits" :key="retrofit.id" :value="retrofit.id">
            {{ retrofit.numero || 'Numéro inconnu' }}
          </option>
        </select>
      </div>

      <!-- Commentaire -->
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold mb-2 text-gray-700">📝 Explication de la demande</label>
        <textarea v-model="newDemande.commentaire" placeholder="Ajouter un commentaire" rows="4"
          class="w-full p-3 border rounded-lg shadow-sm" />
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
