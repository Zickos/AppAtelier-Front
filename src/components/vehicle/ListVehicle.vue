<script setup>
defineProps({
  vehicles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-indigo-700">🚗 Véhicules enregistrés</h2>
      <p v-if="!vehicles.length" class="text-gray-400 italic text-sm">Aucun véhicule disponible.</p>
    </div>

    <div v-if="vehicles.length" class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <th class="p-3 text-left border-b">#</th>
            <th class="p-3 text-left border-b">Nom</th>
            <th class="p-3 text-left border-b">Marque</th>
            <th class="p-3 text-left border-b">Type</th>
            <th class="p-3 text-left border-b">Numéro Série</th>
            <th class="p-3 text-left border-b">Client</th>
            <th class="p-3 text-left border-b">Propriétaire</th>
            <th class="p-3 text-center border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle.id" class="hover:bg-gray-50 transition">
            <td class="p-3 border-b text-sm text-gray-700">{{ vehicle.id }}</td>
            <td class="p-3 border-b text-sm text-gray-800 font-medium">{{ vehicle.name || '—' }}</td>
            <td class="p-3 border-b text-sm text-gray-600">
              {{ vehicle.marque || '—' }}
            </td>
            <td class="p-3 border-b text-sm text-gray-600">
              {{ vehicle.type?.name || '—' }}
            </td>
            <td class="p-3 border-b text-sm text-gray-600">
              {{ vehicle.num_serie || '—' }}
            </td>
            <td class="p-3 border-b text-sm text-gray-600">
              {{ vehicle.id_client || '—' }}
            </td>
            <td class="p-3 border-b text-sm text-gray-600">
              {{ vehicle.owner || '—' }}
            </td>
            <td class="p-3 border-b text-center">
              <div class="flex items-center justify-center gap-2">
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
