<script setup>
import {
    fetchRetrofitList,
    updateRetrofit,
    deleteRetrofit
} from '@/services/retrofitService.js'

import { useCrud } from '@/composables/useCrud.js'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AddRetrofit from '@/components/retrofit/AddRetrofit.vue'
import ListRetrofit from '@/components/retrofit/ListRetrofit.vue'
import UpdateModal from '@/components/modal/UpdateModal.vue'
import { fetchVehicleList } from '@/services/vehicleService.js'
import ConfirmDeleteModal from '@/components/modal/ConfirmDeleteModal.vue'

const {
    items: retrofits,
    showUpdateModal,
    selectedItem,
    showConfirm,
    itemToDelete,
    loadItems,
    handleEdit,
    closeUpdate,
    handleUpdate,
    handleDelete,
    handleCancel,
    handleConfirm
} = useCrud({
    fetchFn: fetchRetrofitList,
    updateFn: updateRetrofit,
    deleteFn: deleteRetrofit
})

const retrofitFormConfig = {
    fields: [
        {
            key: 'vehicle_id',          // ✅ clé attendue par l'API
            sourceKey: 'vehicle',       // ✅ ce qu'on reçoit dans le modelValue
            label: 'Véhicule',
            type: 'select',
            optionKey: 'vehicles',
            optionValue: 'id',
            optionLabel: 'name'
        },
        {
            key: 'numero',
            label: '🔢 Numéro',
            type: 'text'
        },
        {
            key: 'etat',
            label: '⚙️ État',
            type: 'select',
            optionKey: 'etatOptions',
            optionValue: 'value',
            optionLabel: 'label'
        },
        {
            key: 'date',
            label: '📅 Date',
            type: 'date'
        }
    ]
}


const loadVehicleOptions = async () => {
    try {
        const res = await fetchVehicleList()
        return {
            vehicles: res.data.data,
            etatOptions: [
                { value: 'true', label: 'Terminé' },
                { value: 'false', label: 'En cours' }
            ]
        }
    } catch (err) {
        console.error('Erreur chargement options :', err)
        return {
            vehicles: [],
            etatOptions: [
                { value: 'true', label: 'Terminé' },
                { value: 'false', label: 'En cours' }
            ]
        }
    }
}


</script>

<template>
    <DashboardLayout>
        <div class="p-6 space-y-10 bg-gray-50 min-h-screen">
            <header class="text-center">
                <h1 class="text-4xl font-bold text-indigo-800">Gestion des Retrofits</h1>
            </header>

            <AddRetrofit @refresh="loadItems" />

            <UpdateModal v-if="showUpdateModal" :modelValue="selectedItem" :title="'✏️ Modifier le Retrofit'"
                :config="retrofitFormConfig" :fetchOptions="loadVehicleOptions" @submit="handleUpdate"
                @cancel="closeUpdate" />

            <ConfirmDeleteModal v-if="showConfirm"
                :message="`Es-tu sûr de vouloir supprimer le retrofit ${itemToDelete?.id} ?`" @confirm="handleConfirm"
                @cancel="handleCancel" />

            <ListRetrofit :retrofits="retrofits" @edit="handleEdit" @delete="handleDelete" />
        </div>
    </DashboardLayout>
</template>
