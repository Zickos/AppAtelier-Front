<script setup>
import { ref, onMounted } from 'vue'
import { fetchPlanningList } from '@/services/planningService'
import { format, addDays, startOfToday, parse, isWithinInterval } from 'date-fns'
import { fr } from 'date-fns/locale'

const plannings = ref([])
const error = ref(null)
const loading = ref(false)

const today = startOfToday()
const next14Days = Array.from({ length: 14 }).map((_, i) => {
  const d = addDays(today, i)
  return format(d, 'yyyy-MM-dd')
})

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

const groupByTask = (tasks) => {
  const grouped = {}
  for (const task of tasks) {
    const type = task.vehicle?.type?.name || 'Autre'
    const key = `${type}__${task.jour_debut}__${task.jour_fin}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(task)
  }
  return Object.entries(grouped).map(([key, tasks]) => ({
    key,
    tasks,
    type: tasks[0].vehicle?.type?.name || 'Autre',
    debut: tasks[0].jour_debut,
    fin: tasks[0].jour_fin
  }))
}

const typeColors = {
  ABS: 'bg-yellow-400',
  TMX: 'bg-green-500',
  Fenwick: 'bg-blue-500',
  Charlatte: 'bg-red-500',
  Autre: 'bg-gray-400'
}
</script>

<template>
  <div class="w-full h-screen bg-black text-white overflow-auto p-8">
    <h1 class="text-6xl font-bold text-center mb-12 uppercase tracking-widest">Tâches groupées</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div
        v-for="group in groupByTask(plannings)"
        :key="group.key"
        :class="['rounded-lg shadow-lg p-6 text-white', typeColors[group.type] || 'bg-gray-400']"
      >
        <h2 class="text-4xl font-extrabold mb-2">🚗 {{ group.type }}</h2>
        <p class="text-2xl mb-4">📆 Du {{ group.debut }} au {{ group.fin }}</p>
        <div class="space-y-1">
          <p v-for="task in group.tasks" :key="task.id" class="text-xl">
            👤 {{ task.users.map(u => u.prenom).join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
