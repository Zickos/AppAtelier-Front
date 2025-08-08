<script setup>
defineProps({
  plannings: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete', 'view'])

</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-indigo-700">📋 Plannings enregistrés</h2>
      <p v-if="!plannings.length" class="text-gray-400 italic text-sm">Aucun planning disponible.</p>
    </div>

    <div v-if="plannings.length" class="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      <div v-for="planning in plannings" :key="planning.id"
        class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition relative">
        <!-- Badge État -->
        <span class="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm" :class="{
          'bg-green-100 text-green-700': planning.etat_formatted === 'Terminé',
          'bg-orange-100 text-orange-700': planning.etat_formatted === 'En cours'
        }">
          {{ planning.etat_formatted }}
        </span>

        <!-- Titre -->
        <h3 class="text-lg font-bold text-indigo-700 mb-4">
          🗓️ Planning #{{ planning.id }}
        </h3>

        <!-- Utilisateurs -->
        <div class="mb-3">
          <p class="text-sm font-semibold text-gray-600 mb-1">👥 Utilisateur(s)</p>
          <ul class="ml-3 list-disc text-sm text-gray-800 space-y-1">
            <li v-for="user in planning.users" :key="user.id">
              {{ user.prenom }} {{ user.nom }}
            </li>
          </ul>
        </div>

        <!-- Véhicule -->
        <div class="mb-2 text-sm text-gray-700">
          <p>
            🚗 <strong>{{ planning.vehicle?.type?.name || '—' }}</strong>
            <span class="text-gray-500 text-xs ml-1">({{ planning.vehicle?.name || '—' }})</span>
          </p>
        </div>

        <!-- Retrofit -->
        <div class="mb-2 text-sm text-gray-700">
          🔧 Retrofit : <strong>{{ planning.retrofit?.numero || '—' }}</strong>
        </div>

        <!-- Dates -->
        <div class="mb-3 flex justify-between text-sm text-gray-600">
          <span>📅 <strong>Début :</strong> {{ planning.jour_debut }}</span>
          <span>📅 <strong>Fin :</strong> {{ planning.jour_fin }}</span>
        </div>

        <!-- Commentaire -->
        <div class="mb-4 text-sm text-gray-500 italic">
          {{ planning.commentaire || '— Aucun commentaire —' }}
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 mt-2">
          <!-- <button @click="$emit('view', planning)"
            class="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs font-medium transition">
            👁 Voir
          </button> -->

          <button @click="$emit('edit', planning)"
            class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs font-medium transition">
            ✏️ Modifier
          </button>
          <button @click="$emit('delete', planning)"
            class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs font-medium transition">
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
