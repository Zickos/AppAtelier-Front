<template>
  <div class="mb-6">
    <label class="block text-sm font-semibold mb-2">{{ label }}</label>
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="item in options"
        :key="item[valueKey]"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :value="item[valueKey]"
          v-model="model"
          :id="`${idPrefix}-${item[valueKey]}`"
          class="accent-indigo-600"
        />
        <label
          :for="`${idPrefix}-${item[valueKey]}`"
          class="text-sm text-gray-700"
        >
          {{ item[labelKey] }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Array,
  options: Array,
  label: String,
  valueKey: {
    type: String,
    default: 'id'
  },
  labelKey: {
    type: String,
    default: 'name'
  },
  idPrefix: {
    type: String,
    default: 'checkbox'
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
