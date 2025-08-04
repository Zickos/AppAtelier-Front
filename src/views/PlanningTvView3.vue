<script setup>
import { ref, onMounted } from 'vue'
import { fetchPlanningList } from '@/services/planningService'
import { format, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

const plannings = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchPlanningList()
    plannings.value = res.data.data
  } catch (err) {
    error.value = err.message || 'Erreur de chargement'
  } finally {
    loading.value = false
  }
})

const typeColors = {
  ABS: 'bg-yellow-400',
  TMX: 'bg-green-500',
  Fenwick: 'bg-blue-500',
  Charlatte: 'bg-red-500',
  Autre: 'bg-gray-400'
}

const formatDate = (date) => {
  return format(parse(date, 'dd/MM/yyyy', new Date()), 'EEEE dd MMMM', { locale: fr })
}
</script>

<template>
  <div class="w-full h-screen bg-black text-white p-8 overflow-auto">
    <h1 class="text-6xl font-bold text-center mb-12 uppercase tracking-widest">📅 Planning Jour par Jour</h1>

    <div v-if="loading" class="text-center text-3xl">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-500 text-3xl">{{ error }}</div>

    <div v-else class="space-y-12">
      <div
        v-for="planning in plannings"
        :key="planning.id"
        class="rounded-lg shadow-lg p-6 text-white border-2 border-white"
        :class="typeColors[planning.vehicle?.type?.name] || typeColors.Autre"
      >
        <div class="text-4xl font-extrabold mb-2">
          🚗 {{ planning.vehicle?.type?.name || 'Type inconnu' }} {{ planning.vehicle?.modele || '' }}
        </div>
        <p class="text-2xl mb-2">📅 Du {{ planning.jour_debut }} au {{ planning.jour_fin }}</p>
        <div class="text-xl font-semibold">👥 Utilisateurs :</div>
        <ul class="list-disc list-inside text-lg">
          <li v-for="user in planning.users" :key="user.id">
            {{ user.prenom }} {{ user.nom }}
          </li>
        </ul>
        <p v-if="planning.commentaire" class="italic text-lg mt-2">📝 {{ planning.commentaire }}</p>
      </div>
    </div>
  </div>
</template>
