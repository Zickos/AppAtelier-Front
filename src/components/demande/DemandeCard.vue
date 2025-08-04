<script setup>
import {
  CalendarDays,
  User,
  Wrench,
  StickyNote,
  AlertCircle,
  Edit,
  Trash2
} from 'lucide-vue-next'

import { computed } from 'vue'

const props = defineProps({
  demande: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const etatFormatted = computed(() => props.demande.etat ? 'Traitée' : 'En cours')
</script>

<template>
  <div
    class="relative rounded-xl border shadow-sm hover:shadow-md transition p-5 bg-white"
    :class="{
      'border-l-4 border-sky-400': demande.type === 'Commande',
      'border-l-4 border-yellow-400': demande.type === 'Retrait',
      'border-l-4 border-gray-300': !demande.type
    }"
  >
    <!-- Badge État -->
    <span
      class="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full shadow-sm"
      :class="{
        'bg-green-100 text-green-700': demande.etat === true || demande.etat === 1,
        'bg-orange-100 text-orange-700': demande.etat === false || demande.etat === 0,
        'bg-gray-100 text-gray-500': demande.etat === null || demande.etat === undefined
      }"
    >
      <AlertCircle class="w-3 h-3" />
      {{ etatFormatted }}
    </span>

    <!-- Titre -->
    <h3 class="text-lg font-semibold text-indigo-700 mb-3 flex items-center gap-2">
      <CalendarDays class="w-5 h-5 text-indigo-500" />
      Demande #{{ demande.id }}
    </h3>

    <!-- Utilisateur -->
    <div class="text-sm text-gray-700 mb-2 flex items-center gap-2">
      <User class="w-4 h-4 text-gray-400" />
      <span><strong>{{ demande.user?.prenom || '—' }}</strong></span>
    </div>

    <!-- Retrofit -->
    <div class="text-sm text-gray-700 mb-2 flex items-center gap-2">
      <Wrench class="w-4 h-4 text-gray-400" />
      Retrofit : <span class="font-medium">{{ demande.retrofit?.numero || '—' }}</span>
    </div>

    <!-- Type -->
    <div class="text-sm text-gray-700 mb-2 flex items-center gap-2">
      <StickyNote class="w-4 h-4 text-gray-400" />
      Type : <span class="font-medium">{{ demande.type || '—' }}</span>
    </div>

    <!-- Date -->
    <div class="text-sm text-gray-600 mb-4 flex items-center gap-2">
      <CalendarDays class="w-4 h-4 text-gray-400" />
      <span><strong>Date :</strong> {{ demande.date || '—' }}</span>
    </div>

    <!-- Commentaire -->
    <p class="text-sm text-gray-500 italic mb-4">
      {{ demande.commentaire || '— Aucun commentaire —' }}
    </p>

    <!-- Actions -->
    <div class="flex justify-end gap-2">
      <button @click="$emit('edit', demande)"
        class="flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded">
        <Edit class="w-4 h-4" /> Modifier
      </button>
    </div>
  </div>
</template>
