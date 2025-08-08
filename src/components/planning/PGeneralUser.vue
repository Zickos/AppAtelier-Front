<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchPlanningList } from '../../services/planningService'
import { format, addDays, startOfToday, differenceInCalendarDays, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

const plannings = ref([])
const loading = ref(false)
const error = ref('')

const today = startOfToday()
const days = ref(
  Array.from({ length: 21 }).map((_, i) => {
    const date = addDays(today, i)
    return {
      label: format(date, 'EEEE dd/MM', { locale: fr }),
      date: format(date, 'yyyy-MM-dd'),
      raw: date
    }
  })
)

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetchPlanningList()
    plannings.value = response.data.data
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
      result[user.id].tasks.push(planning)
    }
  }
  return Object.values(result)
})

const getSpan = (planning) => {
  if (!planning.jour_debut || !planning.jour_fin) return { left: '0px', width: '0px' }

  try {
    const start = parse(planning.jour_debut, 'dd/MM/yyyy', new Date())
    const end = parse(planning.jour_fin, 'dd/MM/yyyy', new Date())

    const firstVisible = days.value[0].raw
    const lastVisible = days.value[days.value.length - 1].raw

    const clampedStart = start < firstVisible ? firstVisible : start
    const clampedEnd = end > lastVisible ? lastVisible : end

    const startIndex = differenceInCalendarDays(clampedStart, firstVisible)
    const span = Math.max(1, differenceInCalendarDays(clampedEnd, clampedStart) + 1)

    return {
      left: `${startIndex * 120}px`,
      width: `${span * 120 - 8}px`
    }
  } catch (e) {
    console.warn('Planning avec date invalide :', planning)
    return { left: '0px', width: '0px' }
  }
}

const typeColors = {
  ABS: 'bg-yellow-400',
  TMX: 'bg-green-500',
  Fenwick: 'bg-blue-400',
  Charlatte: 'bg-red-500',
  Autre: 'bg-gray-400'
}

const getColorByType = (planning) => {
  /* console.log(planning) */
  const type = planning.vehicle?.type?.name || 'Default'
  return typeColors[type] || typeColors.Default
}


const getColorClass = (index) => {
  return colorPalette[index % colorPalette.length]
}


// décalage vertical pour chaque card
const getTopOffset = (index) => `${index * 44 + 4}px` // 44px de hauteur + 4px de marge
</script>

<template>
  <div class="px-6 py-10 bg-gray-50">
    <div class="w-[90%] space-y-8">
      <header>
        <h1 class="text-3xl font-bold text-gray-800">Planning Général</h1>
        <p class="text-gray-600 mt-1">Vue sur 21 jours – affichage par utilisateur.</p>
      </header>

      <div v-if="loading" class="text-gray-600">Chargement...</div>
      <div v-else-if="error" class="text-red-600 font-medium">{{ error }}</div>

      <div v-else class="overflow-x-auto bg-white shadow rounded">
        <div class="w-[2720px]">
          <!-- Entête avec jours -->
          <div class="grid grid-cols-[200px_repeat(21,120px)] bg-gray-100 text-xs text-gray-700 font-medium">
            <div class="p-2 border-r bg-white">👤 Utilisateur</div>
            <div v-for="day in days" :key="day.date" class="p-2 text-center border-r">
              {{ day.label }}
            </div>
          </div>

          <!-- Lignes par utilisateur -->
          <div v-for="entry in grouped" :key="entry.user.id" class="relative border-t flex"
            :style="{ minHeight: `${entry.tasks.length * 44 + 8}px` }">
            <!-- Col utilisateur -->
            <div class="w-[200px] p-2 font-medium text-gray-800 border-r bg-white">
              {{ entry.user.prenom }} {{ entry.user.nom }}
            </div>

            <!-- Ligne planning -->
            <div class="relative flex-1">
              <div class="absolute inset-0 grid grid-cols-21 gap-8">
                <div v-for="day in days" :key="day.date" class="border-r border-gray-200"></div>
              </div>

              <!-- Plannings -->
              <div v-for="(p, index) in entry.tasks" :key="p.id"
                :class="[getColorByType(p), 'absolute h-10 hover:brightness-110 transition-colors text-white text-xs rounded shadow px-2 py-1 flex flex-col justify-center border border-white']"
                :style="{ ...getSpan(p), top: getTopOffset(index) }">
                <div class="font-semibold truncate">
                  {{ p.jour_debut }} → {{ p.jour_fin }}
                </div>
                <div class="truncate text-[11px]">
                  🚗 {{ p.vehicle?.type.name }} {{ p.vehicle?.id }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
