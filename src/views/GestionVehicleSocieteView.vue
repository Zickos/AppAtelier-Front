<script setup>
import {
    fetchVehicleList,
    updateVehicle,
    deleteVehicle
} from '@/services/vehicleSocieteService.js'

import { useCrud } from '@/composables/useCrud.js'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AddVehicleSociete from '@/components/vehicle/AddVehicleSociete.vue'
import ListVehicleSociete from '@/components/vehicle/ListVehicleSociete.vue'
import UpdateModal from '@/components/modal/UpdateModal.vue'
import DetailsModal from '@/components/modal/DetailsModal.vue'
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
    handleConfirm,
    selectedDetailsItem,
    handleShowDetails,
    closeDetails
} = useCrud({
    fetchFn: fetchVehicleList,
    updateFn: updateVehicle,
    deleteFn: deleteVehicle
})

const vehicleFormConfig = {
    fields: [
        { key: 'name', label: '🔤 Nom', type: 'text' },
        { key: 'marque', label: '🚗 Marque', type: 'text' },
        { key: 'model', label: '📦 Modèle', type: 'text' },
        { key: 'immatriculation', label: '🔠 Immatriculation', type: 'text' },
        { key: 'datemec', label: '📅 Date de mise en circulation', type: 'date' },
        { key: 'usage', label: '⚙️ Usage', type: 'text' },
        { key: 'site', label: '📍 Site', type: 'text' },
        { key: 'copiecg', label: '📎 Copie carte grise (URL)', type: 'text' },
        { key: 'copieassurance', label: '📎 Copie assurance (URL)', type: 'text' },
        { key: 'affectation', label: '📂 Affectation', type: 'text' },
        { key: 'commentaire', label: '📝 Commentaire', type: 'textarea', rows: 3 },
        { key: 'datect', label: '📅 Date dernier contrôle technique', type: 'date' },
        { key: 'dateprochainct', label: '📅 Date prochain contrôle technique', type: 'date' },
        { key: 'dateentretien', label: '🛠️ Date dernier entretien', type: 'date' },
        { key: 'dateprochainentretien', label: '🛠️ Date prochain entretien', type: 'date' }
    ]
}

</script>

<template>
    <DashboardLayout>
        <div class="p-6 space-y-10 bg-gray-50 min-h-screen">
            <header class="text-center">
                <h1 class="text-4xl font-bold text-indigo-800">Gestion des Véhicules</h1>
            </header>

            <AddVehicleSociete @refresh="loadItems" />

            <UpdateModal v-if="showUpdateModal" :modelValue="selectedItem" :title="'✏️ Modifier le Véhicule'"
                :config="vehicleFormConfig" @submit="handleUpdate"
                @cancel="closeUpdate" />

            <DetailsModal v-if="selectedDetailsItem" :model-value="selectedDetailsItem"
                :title="`Détails du véhicule ${selectedDetailsItem.name}`" :config="{
                    fields: [
                        { key: 'name', label: 'Nom' },
                        { key: 'marque', label: 'Marque' },
                        { key: 'model', label: 'Modèle' },
                        { key: 'immatriculation', label: 'Immatriculation' },
                        { key: 'datemec', label: 'Date de mise en circulation', type: 'date' },
                        { key: 'usage', label: 'Usage' },
                        { key: 'site', label: 'Site' },
                        { key: 'copiecg', label: 'Copie carte grise' },
                        { key: 'copieassurance', label: 'Copie assurance' },
                        { key: 'affectation', label: 'Affectation' },
                        { key: 'commentaire', label: 'Commentaire' },
                        { key: 'datect', label: 'Date dernier contrôle technique', type: 'date' },
                        { key: 'dateprochainct', label: 'Date prochain contrôle technique', type: 'date' },
                        { key: 'dateentretien', label: 'Date dernier entretien', type: 'date' },
                        { key: 'dateprochainentretien', label: 'Date prochain entretien', type: 'date' },
                    ]
                }" @close="closeDetails" />


            <ConfirmDeleteModal v-if="showConfirm"
                :message="`Es-tu sûr de vouloir supprimer le véhicule ${itemToDelete?.id} ?`" @confirm="handleConfirm"
                @cancel="handleCancel" />

            <ListVehicleSociete :vehicles="vehicles" @edit="handleEdit" @delete="handleDelete"
                @view="handleShowDetails" />

        </div>
    </DashboardLayout>
</template>
