<script setup>
import { ref, onMounted } from 'vue'
import { fetchPlanningList } from '@/services/planningService'
import { format, addDays, startOfToday, parse, isWithinInterval } from 'date-fns'

const plannings = ref([])
const error = ref(null)
const loading = ref(false)

const today = startOfToday()
const endDate = addDays(today, 21)

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

// Regroupe les plannings par utilisateur (et filtre sur les 3 semaines)
function groupByUser(data) {
  const userMap = {}

  for (const task of data) {
    const taskStart = parse(task.jour_debut, 'dd/MM/yyyy', new Date())
    const taskEnd = parse(task.jour_fin, 'dd/MM/yyyy', new Date())

    // Ne garder que ceux dans les 3 semaines
    if (!isWithinInterval(taskStart, { start: today, end: endDate }) &&
      !isWithinInterval(taskEnd, { start: today, end: endDate })) continue

    for (const user of task.users || []) {
      if (!userMap[user.id]) {
        userMap[user.id] = {
          user,
          tasks: []
        }
      }
      userMap[user.id].tasks.push(task)
    }
  }

  return Object.values(userMap).slice(0, 5) // max 5 users
}

// Couleur par type
const typeColors = {
  ABS: 'bg-yellow-400',
  TMX: 'bg-green-500',
  Fenwick: 'bg-blue-500',
  Charlatte: 'bg-red-500',
  Autre: 'bg-gray-400'
}

const getColor = (type) => typeColors[type] || typeColors.Autre
</script>

<template>
  <div class="min-h-screen w-full bg-[#0f172a] text-white py-12 px-16 overflow-auto">

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      <div v-for="group in groupByUser(plannings)" :key="group.user.id"
        class="rounded-3xl bg-[#1e293b] shadow-2xl border border-gray-700 overflow-hidden">
        <!-- Header Utilisateur -->
        <div class="bg-gradient-to-r from-indigo-500 to-indigo-700 py-8 px-10">
          <h2 class="text-5xl font-extrabold uppercase tracking-wider">
            👤 {{ group.user.prenom }} {{ group.user.nom }}
          </h2>
        </div>

        <!-- Contenu tâches -->
        <div class="px-10 py-8 space-y-6">
          <div v-if="group.tasks.length" v-for="task in group.tasks" :key="task.id" :class="[
            'rounded-2xl p-6 shadow-lg text-white flex flex-col gap-3',
            getColor(task.vehicle?.type?.name || 'Autre')
          ]">
            <h3 class="text-3xl font-bold flex items-center gap-2">
              🚗 {{ task.vehicle?.type?.name || 'Type inconnu' }}
            </h3>

            <p class="text-2xl">📅 <strong>Du</strong> {{ task.jour_debut }} <strong>au</strong> {{ task.jour_fin }}</p>

            <p v-if="task.commentaire" class="italic text-lg bg-white/20 px-4 py-2 rounded-lg">
              💬 {{ task.commentaire }}
            </p>

            <p class="text-xl">🎯 État : <span class="font-semibold underline">{{ task.etat_formatted || 'Non défini'
                }}</span></p>
          </div>

          <p v-else class="text-xl italic text-gray-400">Aucune tâche assignée.</p>
        </div>
      </div>
    </div>
  </div>
</template>
