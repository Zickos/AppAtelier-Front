<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Object,
  config: Object,
  title: String
})

const emit = defineEmits(['close'])

const formatted = ref({})

// Helper pour accéder aux propriétés imbriquées
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, p) => o?.[p], obj)
}

watch(() => props.modelValue, (val) => {
  if (!val) return
  const result = {}

  props.config.fields.forEach((field) => {
    const key = field.key
    const value = getNestedValue(val, key)

    if (field.type === 'array') {
      result[key] = value?.length
        ? value.map(item => field.subKey ? item[field.subKey] : JSON.stringify(item)).join(', ')
        : '—'

    } else if (field.type === 'images' && Array.isArray(value)) {
      result[key] = value.length ? value : []

    } else if (field.type === 'date') {
      result[key] = value ? new Date(value).toLocaleDateString('fr-FR') : '—'

    } else if (field.type === 'array-object') {
      result[key] = Array.isArray(value) ? value : []

    } else {
      result[key] = value ?? '—'
    }
  })

  formatted.value = result
}, { immediate: true })
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 overflow-y-auto max-h-[90vh]">

      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-4 mb-6">
        <h2 class="text-3xl font-bold text-indigo-700">{{ title }}</h2>
        <button @click="emit('close')" class="text-gray-500 hover:text-red-500 text-2xl font-bold">&times;</button>
      </div>

      <!-- Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <template v-for="field in config.fields" :key="field.key">
          <!-- Images -->
          <div v-if="field.type === 'images'" class="flex flex-col space-y-1 col-span-2">
            <label class="text-gray-500 font-semibold">{{ field.label }}</label>
            <div class="flex gap-2 flex-wrap">
              <img
                v-for="img in formatted[field.key]"
                :key="img.id"
                :src="img.url"
                alt="photo"
                class="w-20 h-20 object-cover rounded shadow"
              />
            </div>
          </div>

          <!-- Array of objects -->
          <div v-else-if="field.type === 'array-object'" class="col-span-2">
            <label class="text-gray-500 font-semibold block mb-2">{{ field.label }}</label>
            <div v-if="formatted[field.key]?.length">
              <div
                v-for="(item, idx) in formatted[field.key]"
                :key="idx"
                class="border rounded-lg p-4 mb-4 bg-gray-50 space-y-1"
              >
                <div v-for="subField in field.subFields" :key="subField.key">
                  <template v-if="subField.type === 'images'">
                    <div class="flex gap-2 flex-wrap mb-2">
                      <img
                        v-for="img in item[subField.key]"
                        :key="img.id"
                        :src="img.url"
                        class="w-20 h-20 object-cover rounded shadow"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <p>
                      <strong>{{ subField.label }} :</strong>
                      {{ subField.type === 'date' && item[subField.key] ? new Date(item[subField.key]).toLocaleDateString('fr-FR') : item[subField.key] ?? '—' }}
                    </p>
                  </template>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500 italic">Aucun élément.</div>
          </div>

          <!-- Standard fields -->
          <div v-else class="flex flex-col space-y-1">
            <label class="text-gray-500 font-semibold">{{ field.label }}</label>
            <div class="text-gray-800 font-medium">{{ formatted[field.key] }}</div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div class="mt-8 flex justify-end">
        <button @click="emit('close')" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
