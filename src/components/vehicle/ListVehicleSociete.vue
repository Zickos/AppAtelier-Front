<script setup>
defineProps({
  vehicles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete', 'view'])

</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-indigo-700">🚗 Véhicules Société</h2>
      <p v-if="!vehicles.length" class="text-gray-400 italic text-sm">Aucun véhicule disponible.</p>
    </div>

    <div v-if="vehicles.length" class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <th class="p-3 text-left border-b">Nom</th>
            <th class="p-3 text-left border-b">Marque</th>
            <th class="p-3 text-left border-b">Modèle</th>
            <th class="p-3 text-left border-b">Immatriculation</th>
            <th class="p-3 text-left border-b">Date MEC</th>
            <th class="p-3 text-left border-b">Usage</th>
            <th class="p-3 text-left border-b">Site</th>
            <th class="p-3 text-left border-b">Affectation</th>
            <th class="p-3 text-left border-b">Date Prochain CT</th>
            <th class="p-3 text-left border-b">Date Prochain Entre..</th>
            <th class="p-3 text-center border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle.id" class="hover:bg-gray-50 transition">
            <td class="p-3 border-b font-medium text-gray-800">{{ vehicle.name || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.marque || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.model || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.immatriculation || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.datemec || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.usage || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.site || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.affectation || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.dateprochainct || '—' }}</td>
            <td class="p-3 border-b">{{ vehicle.dateprochainentretien || '—' }}</td>
            <td class="p-3 border-b text-center">
              <div class="flex items-center justify-center gap-2">
                <button @click="$emit('view', vehicle)"
                  class="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs font-medium transition">
                  👁 Voir
                </button>
                <button @click="$emit('edit', vehicle)"
                  class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs font-medium transition">
                  ✏️ Modifier
                </button>
                <button @click="$emit('delete', vehicle)"
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
