<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import CheckboxGrid from '@/components/form/CheckboxGrid.vue'

const props = defineProps({
    modelValue: Object,
    config: Object,
    title: String,
    fetchOptions: Function
})

const emit = defineEmits(['submit', 'cancel'])

const edited = reactive({})
const fetchedOptions = ref({})
const loadingOptions = ref(true)

// 🧩 Initialisation des valeurs du formulaire
const initialize = (data) => {
    if (data?.id) {
        edited.id = data.id
    }

    props.config.fields.forEach(field => {
        const key = field.key
        const sourceKey = field.sourceKey || key
        const value = data?.[sourceKey]

        if (field.type === 'select') {
            if (typeof value === 'object' && value !== null) {
                edited[key] = value.id?.toString() ?? ''
            } else {
                edited[key] = value !== undefined && value !== null ? String(value) : ''
            }
        } else if (field.type === 'boolean') {
            edited[key] = Boolean(value)
        }

        else if (field.type === 'checkbox-grid') {
            if (Array.isArray(value)) {
                edited[key] = value.map(v => typeof v === 'object' ? v.id : v)
            } else {
                edited[key] = []
            }
        }

        else if (field.type === 'date') {
            if (typeof value === 'string' && value.includes('/')) {
                // Format "DD/MM/YYYY" → "YYYY-MM-DD"
                const [day, month, year] = value.split('/')
                edited[key] = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            } else {
                edited[key] = value ?? ''
            }
        }
        else {
            edited[key] = value?.toString?.() ?? ''
        }
    })

    /* console.log('🧩 Initialisation edited:', JSON.parse(JSON.stringify(edited))) */
}

// 🔄 Watch du modelValue
watch(() => props.modelValue, (val) => {
    initialize(val)
}, { immediate: true })

// 📦 Récupération des options
onMounted(async () => {
    if (props.fetchOptions) {
        try {
            const fetched = await props.fetchOptions()
            fetchedOptions.value = fetched
            /* console.log('✅ Options chargées :', fetchedOptions.value) */
        } catch (err) {
            console.error('Erreur fetchOptions:', err)
        } finally {
            loadingOptions.value = false
        }
    } else {
        loadingOptions.value = false
    }
})

watch(fetchedOptions, (val) => {
    /* console.log('🧪 Watch options:', JSON.stringify(val, null, 2)) */
}, { deep: true })


// ✅ Soumission avec conversion string → boolean
const onSubmit = () => {
    const dataToSubmit = { ...edited }

    props.config.fields.forEach(field => {
        const val = dataToSubmit[field.key]
        const options = fetchedOptions.value?.[field.optionKey] ?? []

        const isBooleanSelect =
            field.type === 'select' &&
            options.some(opt => opt.value === 'true' || opt.value === 'false')


        if (isBooleanSelect) {
            dataToSubmit[field.key] = val === 'true'
        }
    })

    /* console.log('🚀 Données envoyées :', dataToSubmit) */
    emit('submit', dataToSubmit)
}
</script>

<template>
    <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 overflow-y-auto max-h-[90vh]">
            <!-- Header -->
            <div class="flex justify-between items-center border-b pb-4 mb-6">
                <h2 class="text-3xl font-bold text-indigo-700">{{ title }}</h2>
                <button @click="emit('cancel')"
                    class="text-gray-500 hover:text-red-500 text-2xl font-bold">&times;</button>
            </div>

            <!-- Form -->
            <form @submit.prevent="onSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Form Field Loop -->
                    <div v-for="field in config.fields" :key="field.key" class="flex flex-col">
                        <label :for="field.key" class="text-sm font-semibold text-gray-700 mb-1">
                            {{ field.label }}
                        </label>

                        <!-- Textarea -->
                        <textarea v-if="field.type === 'textarea'" v-model="edited[field.key]" :id="field.key"
                            class="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            :rows="field.rows || 3" />

                        <!-- Select -->
                        <select v-else-if="field.type === 'select'" v-model="edited[field.key]" :id="field.key"
                            class="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            :disabled="loadingOptions">
                            <option disabled value="">Sélectionner...</option>
                            <option v-for="opt in fetchedOptions?.[field.optionKey] || []"
                                :key="opt[field.optionValue ?? 'id']" :value="String(opt[field.optionValue ?? 'id'])">
                                {{ opt[field.optionLabel ?? 'name'] }}
                            </option>
                        </select>

                        <!-- Date -->
                        <input v-else-if="field.type === 'date'" v-model="edited[field.key]" type="date" :id="field.key"
                            class="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />

                        <!-- Checkbox Grid -->
                        <CheckboxGrid v-else-if="field.type === 'checkbox-grid'" v-model="edited[field.key]"
                            :options="fetchedOptions?.[field.optionKey] || []" :valueKey="field.optionValue ?? 'id'"
                            :labelKey="field.optionLabel ?? 'name'" :idPrefix="`checkbox-${field.key}`" />

                        <!-- Input text -->
                        <input v-else v-model="edited[field.key]" :type="field.type || 'text'" :id="field.key"
                            class="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end gap-4 pt-6 border-t">
                    <button type="button" @click="emit('cancel')"
                        class="px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
                        Annuler
                    </button>
                    <button type="submit"
                        class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg">
                        Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
