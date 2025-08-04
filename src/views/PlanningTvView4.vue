<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { fetchPlanningList } from '@/services/planningService'
import { parse, format, addDays, isWithinInterval } from 'date-fns'
import { fr } from 'date-fns/locale'

const plannings = ref([])
const loading = ref(false)
const error = ref(null)
const currentIndex = ref(0)

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchPlanningList()
    plannings.value = res.data.data
  } catch (err) {
    error.value = err.message || 'Erreur de chargement.'
  } finally {
    loading.value = false
  }
})

const grouped = computed(() => {
  const map = new Map()
  for (const planning of plannings.value) {
    for (const user of planning.users || []) {
      if (!map.has(user.id)) {
        map.set(user.id, {
          user,
          tasks: []
        })
      }
      map.get(user.id).tasks.push(planning)
    }
  }
  return Array.from(map.values())
})

const activeGroup = computed(() => grouped.value[currentIndex.value] || null)

// Switch user every 10s
setInterval(() => {
  if (grouped.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % grouped.value.length
  }
}, 10000)

const typeColors = {
  ABS: 'bg-yellow-400',
  TMX: 'bg-green-500',
  Fenwick: 'bg-blue-500',
  Charlatte: 'bg-red-500',
  Autre: 'bg-gray-400'
}

const getColor = (planning) => {
  const type = planning.vehicle?.type?.name || 'Autre'
  return typeColors[type] || typeColors.Autre
}

const today = new Date()
const days = Array.from({ length: 14 }).map((_, i) => {
  const date = addDays(today, i)
  return {
    label: format(date, 'EEEE dd/MM', { locale: fr }),
    raw: date
  }
})

const getUserTasksForDay = (userId, day) => {
  const user = grouped.value.find((g) => g.user.id === userId)
  if (!user) return []
  return user.tasks.filter((t) => {
    const start = parse(t.jour_debut, 'dd/MM/yyyy', new Date())
    const end = parse(t.jour_fin, 'dd/MM/yyyy', new Date())
    return isWithinInterval(day, { start, end })
  })
}
</script>

<template>
  <div class="w-full h-screen bg-black text-white overflow-hidden p-6">
    <div v-if="!activeGroup" class="text-center text-4xl text-white">Chargement...</div>

    <div v-else class="flex flex-col h-full gap-8">
      <div class="text-center">
        <h1 class="text-6xl font-bold uppercase">{{ activeGroup.user.prenom }} {{ activeGroup.user.nom }}</h1>
        <p class="text-2xl text-gray-300 mt-2">Planning des 2 prochaines semaines</p>
      </div>

      <div class="grid grid-cols-7 gap-6 flex-1">
        <div
          v-for="day in days"
          :key="day.label"
          class="bg-gray-900 rounded-lg p-4 shadow flex flex-col justify-start"
        >
          <h2 class="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{{ day.label }}</h2>
          <div class="flex flex-col gap-3">
            <div
              v-for="task in getUserTasksForDay(activeGroup.user.id, day.raw)"
              :key="task.id"
              :class="['rounded px-3 py-2 text-lg font-semibold text-center', getColor(task)]"
            >
              {{ task.vehicle?.type?.name || 'Tâche' }}<br />
              <span class="text-sm font-normal">{{ task.vehicle?.modele || 'Modèle inconnu' }}</span>
            </div>
            <div v-if="getUserTasksForDay(activeGroup.user.id, day.raw).length === 0" class="text-sm italic text-gray-500">
              — Rien —
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
