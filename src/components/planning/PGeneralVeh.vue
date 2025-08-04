<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchPlanningList } from '../../services/planningService'
import { parse, isWithinInterval, addDays, startOfToday } from 'date-fns'

const plannings = ref([])
const loading = ref(false)
const error = ref('')

const today = startOfToday()
const endDay = addDays(today, 20) // 21 jours

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetchPlanningList()
    plannings.value = response.data.data

    console.log('Plannings chargés:', plannings.value)
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur de chargement.'
  } finally {
    loading.value = false
  }
})

const grouped = computed(() => {
  const result = {}

  for (const planning of plannings.value) {
    for (const user of planning.users || []) {
      if (!result[user.id]) {
        result[user.id] = {
          user,
          tasks: []
        }
      }

      // Parsing des dates
      try {
        const start = parse(planning.jour_debut, 'dd/MM/yyyy', new Date())
        const end = parse(planning.jour_fin, 'dd/MM/yyyy', new Date())

        // Si le planning chevauche la période des 21 jours
        const overlap = isWithinInterval(start, { start: today, end: endDay }) ||
          isWithinInterval(end, { start: today, end: endDay }) ||
          (start < today && end > endDay)

        if (overlap) {
          result[user.id].tasks.push(planning)
        }

      } catch (e) {
        console.warn('Erreur de parsing planning', planning)
      }
    }
  }

  return Object.values(result)
})

const groupedByRetrofit = computed(() => {
  const result = {}

  for (const planning of plannings.value) {
    const retrofit = planning.retrofit
    if (!retrofit || !retrofit.id) continue

    const retrofitId = retrofit.id
    const retrofitName = retrofit.vehicle?.modele || `Retrofit #${retrofitId}`

    // Parsing des dates
    try {
      const start = parse(planning.jour_debut, 'dd/MM/yyyy', new Date())
      const end = parse(planning.jour_fin, 'dd/MM/yyyy', new Date())

      const overlap = isWithinInterval(start, { start: today, end: endDay }) ||
        isWithinInterval(end, { start: today, end: endDay }) ||
        (start < today && end > endDay)

      if (!overlap) continue

      if (!result[retrofitId]) {
        result[retrofitId] = {
          retrofitName,
          tasks: []
        }
      }

      result[retrofitId].tasks.push(planning)
    } catch (e) {
      console.warn('Erreur de parsing (retrofit)', planning)
    }
  }

  return Object.values(result)
})



</script>

<template>
  <div class="w-full flex px-6 py-10 bg-gray-50">
    <div class="space-y-8">
      <header>
        <h1 class="text-3xl font-bold text-gray-800">Planning Utilisateur</h1>
        <p class="text-gray-600 mt-1">Liste des tâches par utilisateur du jour jusqu’à +21 jours.</p>
      </header>

      <div v-if="loading" class="text-gray-600">Chargement…</div>
      <div v-else-if="error" class="text-red-600 font-medium">{{ error }}</div>

      <div v-else class="w-full space-x-4 overflow-x-auto">
        <div v-for="entry in grouped" :key="entry.user.id" class="bg-white shadow rounded p-4 mb-6">
          <h2 class="text-xl font-semibold text-indigo-700 mb-3">
            👤 {{ entry.user.prenom }} {{ entry.user.nom }}
          </h2>

          <ul v-if="entry.tasks.length" class="space-y-2">
            <li v-for="task in entry.tasks" :key="task.id" class="text-sm text-gray-800">
              🚗 <strong>{{ task.vehicle?.type.name || 'Véhicule inconnu' }} {{ task.vehicle?.id || 'Inconnu' }}</strong>
              du <span class="font-medium">{{ task.jour_debut }}</span>
              au <span class="font-medium">{{ task.jour_fin }}</span>
              <span v-if="task.commentaire" class="italic text-gray-500">– {{ task.commentaire }}</span>
            </li>
          </ul>

          <p v-else class="text-sm text-gray-500 italic">Aucune tâche prévue.</p>
        </div>
      </div>
    </div>

    <!-- Planning Retrofits -->
    <div class="space-y-8 px-6">
      <header>
        <h1 class="text-3xl font-bold text-gray-800">Planning Retrofits</h1>
        <p class="text-gray-600 mt-1">Tâches liées aux retrofits du jour à J+21.</p>
      </header>

      <div v-if="loading" class="text-gray-600">Chargement…</div>
      <div v-else-if="error" class="text-red-600 font-medium">{{ error }}</div>

      <div v-else class="w-full space-x-4 overflow-x-auto">
        <div v-for="entry in groupedByRetrofit" :key="entry.retrofitName" class="bg-white shadow rounded p-4 mb-6">
          <h2 class="text-xl font-semibold text-green-700 mb-3">
            🔧 {{ entry.retrofitName }}
          </h2>

          <ul v-if="entry.tasks.length" class="space-y-2">
            <li v-for="task in entry.tasks" :key="task.id" class="text-sm text-gray-800">
              👤
              <span v-if="task.users?.length">
                {{task.users.map(u => `${u.prenom}`).join(', ')}}
              </span>
              <span v-else class="italic text-gray-500">Aucun utilisateur assigné</span>
              — du <span class="font-medium">{{ task.jour_debut }}</span>
              au <span class="font-medium">{{ task.jour_fin }}</span>
              <span v-if="task.commentaire" class="italic text-gray-500">– {{ task.commentaire }}</span>
            </li>
          </ul>

          <p v-else class="text-sm text-gray-500 italic">Aucune tâche prévue.</p>
        </div>
      </div>
    </div>

  </div>
</template>
