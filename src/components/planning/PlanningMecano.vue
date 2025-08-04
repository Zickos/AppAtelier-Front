<script setup>
defineProps({
  plannings: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">📋 Liste des Plannings</h2>

    <div v-if="!plannings.length" class="text-gray-500 italic">
      Aucun planning pour le moment.
    </div>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="planning in plannings" :key="planning.id"
        class="rounded-lg border shadow-sm bg-white hover:shadow-md transition p-5 relative">
        <!-- Badge État -->
        <div class="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full" :class="{
          'bg-green-100 text-green-700': planning.etat_formatted === 'Terminé',
          'bg-orange-100 text-orange-700': planning.etat_formatted === 'En cours'
        }">
          {{ planning.etat_formatted }}
        </div>

        <!-- Titre -->
        <h3 class="text-lg font-bold text-indigo-700 mb-2">🗓️ Planning #{{ planning.id }}</h3>

        <!-- Utilisateurs -->
        <div class="mb-2">
          <p class="font-medium text-sm text-gray-700">👥 Utilisateurs :</p>
          <div class="flex flex-wrap gap-1 mt-1">
            <span v-for="user in planning.users" :key="user.id"
              class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
              {{ user.prenom }} {{ user.nom }}
            </span>
          </div>
        </div>

        <!-- Véhicule -->
        <div class="mb-2 text-sm">
          🚗 <strong>{{ planning.vehicle?.type?.name || '—' }}</strong>
          <span class="text-gray-500">({{ planning.vehicle?.name || '—' }})</span>
        </div>

        <!-- Retrofit -->
        <div class="mb-2 text-sm">
          🔧 Retrofit : <span class="font-medium">{{ planning.retrofit?.numero || '—' }}</span>
        </div>

        <!-- Dates -->
        <div class="mb-2 flex justify-between text-sm text-gray-600">
          <span>📅 <strong>Début:</strong> {{ planning.jour_debut }}</span>
          <span>📅 <strong>Fin:</strong> {{ planning.jour_fin }}</span>
        </div>

        <!-- Commentaire -->
        <p class="text-sm text-gray-500 italic">
          {{ planning.commentaire || '— Aucun commentaire —' }}
        </p>

        <!-- Actions -->
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="$emit('edit', planning)"
            class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs font-medium">
            ✏️ Modifier
          </button>
          <button @click="$emit('delete', planning)"
            class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs font-medium">
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
