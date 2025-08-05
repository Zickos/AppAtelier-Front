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
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-indigo-700">📋 Plannings enregistrés</h2>
      <p v-if="!plannings.length" class="text-gray-400 italic text-sm">Aucun planning disponible.</p>
    </div>

    <div v-if="plannings.length" class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <th class="p-3 text-left border-b">#</th>
            <th class="p-3 text-left border-b">Utilisateur(s)</th>
            <th class="p-3 text-left border-b">Début</th>
            <th class="p-3 text-left border-b">Fin</th>
            <th class="p-3 text-left border-b">Véhicule</th>
            <th class="p-3 text-left border-b">Retrofit</th>
            <th class="p-3 text-left border-b">État</th>
            <th class="p-3 text-left border-b">Commentaire</th>
            <th class="p-3 text-center border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="planning in plannings"
            :key="planning.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="p-3 border-b text-sm text-gray-700">{{ planning.id }}</td>

            <td class="p-3 border-b text-sm text-gray-800 font-medium">
              <ul class="list-disc ml-4 space-y-1">
                <li v-for="user in planning.users" :key="user.id">
                  {{ user.prenom }} {{ user.nom }}
                </li>
              </ul>
            </td>

            <td class="p-3 border-b text-sm text-gray-600">
              {{ planning.jour_debut || '—' }}
            </td>
            <td class="p-3 border-b text-sm text-gray-600">
              {{ planning.jour_fin || '—' }}
            </td>

            <td class="p-3 border-b text-sm text-gray-600">
              {{ planning.vehicle?.type?.name || '—' }} —
              <span class="text-gray-500 text-xs">
                {{ planning.vehicle?.name || '—' }}
              </span>
            </td>

            <td class="p-3 border-b text-sm text-gray-600">
              {{ planning.retrofit?.numero || '—' }}
            </td>

            <td class="p-3 border-b text-sm font-medium"
              :class="{
                'text-green-600': planning.etat_formatted === 'Terminé',
                'text-orange-600': planning.etat_formatted === 'En cours'
              }"
            >
              {{ planning.etat_formatted || '—' }}
            </td>

            <td class="p-3 border-b text-sm text-gray-500 italic">
              {{ planning.commentaire || '— Aucun commentaire —' }}
            </td>

            <td class="p-3 border-b text-center">
              <div class="flex items-center justify-center gap-2">
                <button
                  @click="$emit('edit', planning)"
                  class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs font-medium transition"
                >
                  ✏️ Modifier
                </button>
                <button
                  @click="$emit('delete', planning)"
                  class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs font-medium transition"
                >
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
