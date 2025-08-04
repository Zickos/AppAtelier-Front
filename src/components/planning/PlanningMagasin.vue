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

    <div v-else class="overflow-x-auto">
      <table class="min-w-full table-auto border border-gray-200 text-sm">
        <thead class="bg-gray-100 text-gray-700 font-medium">
          <tr>
            <th class="px-4 py-2 border">#</th>
            <th class="px-4 py-2 border">Utilisateur(s)</th>
            <th class="px-4 py-2 border">Début</th>
            <th class="px-4 py-2 border">Fin</th>
            <th class="px-4 py-2 border">État</th>
            <th class="px-4 py-2 border">Commentaire</th>
            <th class="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="planning in plannings" :key="planning.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 border text-center">{{ planning.id }}</td>
            <td class="px-4 py-2 border">
              <ul>
                <li v-for="user in planning.users" :key="user.id" class="text-gray-800">
                  👤 {{ user.prenom }} {{ user.nom }}
                </li>
              </ul>
            </td>
            <td class="px-4 py-2 border text-center">{{ planning.jour_debut }}</td>
            <td class="px-4 py-2 border text-center">{{ planning.jour_fin }}</td>
            <td class="px-4 py-2 border text-center">
              <span :class="{
                'text-green-600': planning.etat_formatted === 'Terminé',
                'text-orange-600': planning.etat_formatted === 'En cours'
              }">
                {{ planning.etat_formatted }}
              </span>
            </td>
            <td class="px-4 py-2 border text-sm text-gray-700 italic">
              {{ planning.commentaire || '—' }}
            </td>
            <td class="px-4 py-2 border text-center space-x-2">
              <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                @click="$emit('edit', planning)">
                Modifier
              </button>
              <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                @click="$emit('delete', planning)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">📋 Liste des Plannings</h2>

    <div v-if="!plannings.length" class="text-gray-500 italic">
      Aucun planning pour le moment.
    </div>

    <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="planning in plannings" :key="planning.id"
        class="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
        <!-- Utilisateur(s) -->
        <div class="mb-3">
          <h3 class="text-lg font-bold text-indigo-700">👤 Utilisateur(s)</h3>
          <ul class="text-sm text-gray-700 ml-2 mt-1 list-disc">
            <li v-for="user in planning.users" :key="user.id">
              {{ user.prenom }} {{ user.nom }}
            </li>
          </ul>
        </div>

        <!-- Véhicule -->
        <div class="mb-2">
          <p class="text-sm text-gray-800">
            <span class="font-medium">🚗 Véhicule :</span>
            {{ planning.vehicle?.type?.name || 'Type inconnu' }} —
            <span class="text-gray-600 text-xs">{{ planning.vehicle?.name || 'Numéro inconnu' }}</span>
          </p>
        </div>

        <!-- Retrofit -->
        <div class="mb-2">
          <p class="text-sm text-gray-800">
            <span class="font-medium">🔧 Retrofit :</span>
            {{ planning.retrofit?.numero || 'Numéro inconnu' }}
          </p>
        </div>

        <!-- Dates -->
        <div class="mb-2 flex justify-between text-sm">
          <span><strong>📅 Début:</strong> {{ planning.jour_debut }}</span>
          <span><strong>📅 Fin:</strong> {{ planning.jour_fin }}</span>
        </div>

        <!-- État -->
        <div class="mb-2 text-sm">
          <span class="font-medium">📍 État :</span>
          <span :class="{
            'text-green-600': planning.etat_formatted === 'Terminé',
            'text-orange-600': planning.etat_formatted === 'En cours'
          }">
            {{ planning.etat_formatted }}
          </span>
        </div>

        <!-- Commentaire -->
        <div class="mb-4 text-sm text-gray-600 italic">
          {{ planning.commentaire || '— Aucun commentaire —' }}
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-2 mt-2">
          <button @click="$emit('edit', planning)"
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
            Modifier
          </button>
          <button @click="$emit('delete', planning)"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>


</template>
