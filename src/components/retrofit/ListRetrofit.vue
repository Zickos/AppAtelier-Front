<script setup>
defineProps({
  retrofits: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const truncate = (text, limit = 100) => {
  if (!text) return '—'
  return text.length > limit ? text.slice(0, limit) + '…' : text
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-indigo-700">🔧 Retrofits enregistrés</h2>
      <p v-if="!retrofits.length" class="text-gray-400 italic text-sm">Aucun retrofit disponible.</p>
    </div>

    <div v-if="retrofits.length" class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <th class="p-3 text-left border-b">#</th>
            <th class="p-3 text-left border-b">Véhicule</th>
            <th class="p-3 text-left border-b">Numéro</th>
            <th class="p-3 text-left border-b">État</th>
            <th class="p-3 text-left border-b">Date</th>
            <th class="p-3 text-left border-b">Commentaire</th>
            <th class="p-3 text-center border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="retrofit in retrofits" :key="retrofit.id" class="hover:bg-gray-50 transition">
            <td class="p-3 border-b text-sm text-gray-700">{{ retrofit.id }}</td>

            <td class="p-3 border-b text-sm text-gray-800 font-medium">
              {{ retrofit.vehicle?.name || 'Véhicule inconnu' }}
            </td>

            <td class="p-3 border-b text-sm text-gray-600">
              {{ retrofit.numero || '—' }}
            </td>

            <td class="p-3 border-b text-sm text-gray-600">
              {{ retrofit.etat_formatted || '—' }}
            </td>

            <td class="p-3 border-b text-sm text-gray-600">
              {{ retrofit.date || '—' }}
            </td>

            <td class="p-3 border-b text-sm text-gray-500 italic whitespace-pre-wrap">
              {{ truncate(retrofit.commentaire) }}
            </td>

            <td class="p-3 border-b text-center">
              <div class="flex items-center justify-center gap-2">
                <button @click="$emit('edit', retrofit)"
                  class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs font-medium transition">
                  ✏️ Modifier
                </button>
                <button @click="$emit('delete', retrofit)"
                  class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs font-medium transition">
                  🗑️ Supprimer
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
