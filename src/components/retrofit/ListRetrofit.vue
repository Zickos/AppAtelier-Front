<script setup>
defineProps({
  retrofits: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

// Utilitaire pour tronquer proprement un texte
const truncate = (text, limit = 100) => {
  if (!text) return '—'
  return text.length > limit ? text.slice(0, limit) + '…' : text
}
</script>

<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">🚗 Liste des Retrofits</h2>

    <div v-if="!retrofits.length" class="text-gray-500 italic">
      Aucun retrofit pour le moment.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full table-auto border border-gray-200 text-sm">
        <thead class="bg-gray-100 text-gray-700 font-medium">
          <tr>
            <th class="px-4 py-2 border">#</th>
            <th class="px-4 py-2 border">Véhicule</th>
            <th class="px-4 py-2 border">Numéro</th>
            <th class="px-4 py-2 border">État</th>
            <th class="px-4 py-2 border">Date</th>
            <th class="px-4 py-2 border">Commentaire</th>
            <th class="px-4 py-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="retrofit in retrofits"
            :key="retrofit.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-2 border text-center">{{ retrofit.id }}</td>

            <td class="px-4 py-2 border">
              {{ retrofit.vehicle?.name || 'Véhicule inconnu' }}
            </td>

            <td class="px-4 py-2 border">
              {{ retrofit.numero || 'Numéro inconnu' }}
            </td>

            <td class="px-4 py-2 border">
              {{ retrofit.etat_formatted || 'État inconnu' }}
            </td>

            <td class="px-4 py-2 border">
              {{ retrofit.date || '—' }}
            </td>

            <td class="px-4 py-2 border text-gray-600 italic whitespace-pre-wrap">
              {{ truncate(retrofit.commentaire) }}
            </td>

            <td class="px-4 py-2 border text-center space-x-2">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                @click="$emit('edit', retrofit)"
              >
                Modifier
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                @click="$emit('delete', retrofit)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
