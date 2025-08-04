<script setup>
import {
    fetchVehicleList,
    updateVehicle,
    deleteVehicle
} from '@/services/vehicleService.js'

import { useCrud } from '@/composables/useCrud.js'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AddVehicle from '@/components/vehicle/AddVehicle.vue'
import ListVehicle from '@/components/vehicle/ListVehicle.vue'
import UpdateModal from '@/components/modal/UpdateModal.vue'
import { fetchTypeVehicleList } from '@/services/vehicleService.js'
import ConfirmDeleteModal from '@/components/modal/ConfirmDeleteModal.vue'

const {
    items: vehicles,
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
    fetchFn: fetchVehicleList,
    updateFn: updateVehicle,
    deleteFn: deleteVehicle
})

const vehicleFormConfig = {
    fields: [
        {
            key: 'type_vehicle_id',         
            sourceKey: 'type',              
            label: '🔢 Type',
            type: 'select',
            optionKey: 'typevehicles',
            optionValue: 'id',
            optionLabel: 'name'
        },
        {
            key: 'name',
            label: '🔢 Nom',
            type: 'text'
        },
        {
            key: 'marque',
            label: '🔢 Marque',
            type: 'text'
        },
        {
            key: 'num_serie',
            label: '🔢 Numéro de Série',
            type: 'text'
        },
        {
            key: 'id_client',
            label: '🗒️ Id Client',
            type: 'text'
        },
        {
            key: 'owner',
            label: '👤 Propriétaire',
            type: 'text'
        }
    ]
}

const loadVehicleOptions = async () => {
    try {
        const res = await fetchTypeVehicleList()
        return {
            typevehicles: res.data.data
        }
    } catch (err) {
        console.error('Erreur chargement des options véhicules :', err)
        return {
            typevehicles: []
        }
    }
}

</script>

<template>
    <DashboardLayout>
        <div class="p-6 space-y-10 bg-gray-50 min-h-screen">
            <header class="text-center">
                <h1 class="text-4xl font-bold text-indigo-800">Gestion des Véhicules</h1>
            </header>

            <AddVehicle @refresh="loadItems" />

            <UpdateModal v-if="showUpdateModal" :modelValue="selectedItem" :title="'✏️ Modifier le Véhicule'"
                :config="vehicleFormConfig" :fetchOptions="loadVehicleOptions" @submit="handleUpdate"
                @cancel="closeUpdate" />

            <ConfirmDeleteModal v-if="showConfirm"
                :message="`Es-tu sûr de vouloir supprimer le véhicule ${itemToDelete?.id} ?`" @confirm="handleConfirm"
                @cancel="handleCancel" />

            <ListVehicle :vehicles="vehicles" @edit="handleEdit" @delete="handleDelete" />
        </div>
    </DashboardLayout>
</template>
