<script setup>
import { ref, onMounted } from 'vue'
import { fetchInfoPersonnel } from '../services/userService'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import { useAuthStore } from '../stores/auth'
import AddDemande from '@/components/demande/AddDemande.vue'

const plannings = ref([])
const loading = ref(false)
const error = ref('')

const loadItems = ref('')

const authStore = useAuthStore()
const userId = ref(authStore.user.id) // Get the current user from the auth store

const loadPlannings = async () => {
    loading.value = true
    try {
        const response = await fetchInfoPersonnel(userId.value)
        plannings.value = response.data.data
    } catch (err) {
        error.value = err.response?.data?.message || 'Erreur de chargement du planning personnel.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadPlannings()
})

</script>

<template>
    <DashboardLayout>
        <div class="min-h-full px-6 py-10 bg-gray-50">
            <div class="max-w-5xl mx-auto space-y-8">
                <header>
                    <h1 class="text-3xl font-bold text-gray-800">Mon Planning</h1>
                    <p class="text-gray-600 mt-1">Toutes vos affectations à venir.</p>
                </header>

                <div v-if="loading" class="text-gray-600">Chargement…</div>
                <div v-else-if="error" class="text-red-600 font-medium">{{ error }}</div>

                <div v-else>
                    <div class="overflow-x-auto rounded shadow bg-white">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100 text-sm text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 text-left">Véhicule</th>
                                    <th class="px-4 py-2 text-left">Début</th>
                                    <th class="px-4 py-2 text-left">Fin</th>
                                    <th class="px-4 py-2 text-left">État</th>
                                    <th class="px-4 py-2 text-left">Commentaire</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm text-gray-800">
                                <tr v-for="p in plannings.plannings" :key="p.id"
                                    class="border-b hover:bg-gray-50 transition">
                                    <td class="px-4 py-2">
                                        {{ p.vehicle?.type.name }}
                                    </td>
                                    <td class="px-4 py-2">
                                        {{ p.jour_debut }} – {{ p.heure_debut }}
                                    </td>
                                    <td class="px-4 py-2">
                                        {{ p.jour_fin }} – {{ p.heure_fin }}
                                    </td>
                                    <td class="px-4 py-2">
                                        <span :class="p.etat ? 'text-yellow-600' : 'text-green-600'">
                                            {{ p.etat_formatted }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2 italic text-gray-600">
                                        {{ p.commentaire || '-' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p v-if="plannings.length === 0" class="text-gray-500 mt-4">Aucune tâche pour le moment.</p>
                </div>

                <header>
                    <h1 class="text-3xl font-bold text-gray-800">Mes Demandes</h1>
                    <p class="text-gray-600 mt-1">Toutes vos demandes en cours.</p>
                </header>

                <div v-if="loading" class="text-gray-600">Chargement…</div>
                <div v-else-if="error" class="text-red-600 font-medium">{{ error }}</div>

                <div v-else>
                    <div class="overflow-x-auto rounded shadow bg-white">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100 text-sm text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 text-left">Retrofit</th>
                                    <th class="px-4 py-2 text-left">Véhicule</th>
                                    <th class="px-4 py-2 text-left">Date</th>
                                    <th class="px-4 py-2 text-left">État</th>
                                    <th class="px-4 py-2 text-left">Commentaire</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm text-gray-800">
                                <tr v-for="d in plannings.demandes" :key="d.id"
                                    class="border-b hover:bg-gray-50 transition">
                                    <td class="px-4 py-2">
                                        {{ d.retrofit.numero }}
                                    </td>
                                    <td class="px-4 py-2">
                                        {{ d.retrofit?.vehicle?.type.name }}
                                    </td>

                                    <td class="px-4 py-2">
                                        {{ d.date }}
                                    </td>
                                    <td class="px-4 py-2">
                                        <span :class="d.etat ? 'text-yellow-600' : 'text-green-600'">
                                            {{ d.etat_formatted }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2 italic text-gray-600">
                                        {{ d.commentaire || '-' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p v-if="plannings.length === 0" class="text-gray-500 mt-4">Aucune tâche pour le moment.</p>


                    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Nouvelle Demande
                    </button>

                    <AddDemande @refresh="loadPlannings" />

                </div>

            </div>
        </div>
    </DashboardLayout>
</template>
