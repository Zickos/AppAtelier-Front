<template>
  <div class="fixed inset-0 bg-[#a3a3a37a] z-50 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-gray-800">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-6 whitespace-pre-wrap">{{ message }}</p>

      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
        >
          Annuler
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Confirmer la suppression' },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'Supprimer' }
})

defineEmits(['confirm', 'cancel'])
</script>
