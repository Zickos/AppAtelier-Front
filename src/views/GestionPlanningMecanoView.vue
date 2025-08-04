<script setup>
import {
  fetchPlanningMecanoList,
  updatePlanning,
  deletePlanning
} from '@/services/planningService.js'

import { useCrud } from '@/composables/useCrud.js'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AddPlanning from '@/components/planning/AddPlanning.vue'
import PlanningMecano from '@/components/planning/PlanningMecano.vue'
import { fetchRetrofitList } from '@/services/retrofitService.js'
import { fetchVehicleList } from '@/services/vehicleService.js'
import { fetchUserList } from '@/services/userService.js'
import UpdateModal from '@/components/modal/UpdateModal.vue'

import ConfirmDeleteModal from '@/components/modal/ConfirmDeleteModal.vue'

const {
  items: plannings,
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
  fetchFn: fetchPlanningMecanoList,
  updateFn: updatePlanning,
  deleteFn: deletePlanning
})

const planningMecaFormConfig = {
  fields: [
    {
      key: 'user_ids',
      sourceKey : "users",
      label: '👥 Utilisateur(s)',
      type: 'checkbox-grid',
      optionKey: 'users',
      optionValue: 'id',
      optionLabel: 'prenom' // ou 'prenom nom' si combiné dans un champ
    },
    {
      key: 'vehicle_id',          // ✅ clé attendue par l'API
      sourceKey: 'vehicle',       // ✅ ce qu'on reçoit dans le modelValue
      label: '🔢 Véhicule',
      type: 'select',
      optionKey: 'vehicles',
      optionValue: 'id',
      optionLabel: 'name'
    },
    {
      key: 'retrofit_id',          // ✅ clé attendue par l'API
      sourceKey: 'retrofit',       // ✅ ce qu'on reçoit dans le modelValue
      label: '🔢 Retrofit',
      type: 'select',
      optionKey: 'retrofits',
      optionValue: 'id',
      optionLabel: 'numero',
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
      key: 'date_debut',
      label: '📅 Date de Début',
      type: 'date'
    },
    {
      key: 'date_fin',
      label: '📅 Date de Fin',
      type: 'date'
    }
  ]
}


const loadOptions = async () => {
  try {
    const res = await fetchVehicleList()
    const res2 = await fetchRetrofitList()
    const res3 = await fetchUserList()
    return {
      vehicles: res.data.data,
      retrofits: res2.data.data,
      users: res3.data.data,
      etatOptions: [
        { value: 'true', label: 'Terminé' },
        { value: 'false', label: 'En cours' }
      ]
    }
  } catch (err) {
    console.error('Erreur chargement options :', err)
    return {
      vehicles: [],
      retrofits: [],
      users: [],

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
        <h1 class="text-4xl font-bold text-indigo-800">Gestion du Planning - Mécano</h1>
      </header>

      <AddPlanning @refresh="loadItems" />

      <UpdateModal v-if="showUpdateModal" :modelValue="selectedItem" :title="'✏️ Modifier le planning'"
        :config="planningMecaFormConfig" :fetchOptions="loadOptions" @submit="handleUpdate" @cancel="closeUpdate" />

      <ConfirmDeleteModal v-if="showConfirm"
        :message="`Es-tu sûr de vouloir supprimer le planning du ${itemToDelete?.jour_debut} au ${itemToDelete?.jour_fin} pour ${itemToDelete?.users?.map(u => u.prenom + ' ' + u.nom).join(', ') || 'cet utilisateur'} ?`"
        @confirm="handleConfirm" @cancel="handleCancel" />

      <PlanningMecano :plannings="plannings" @edit="handleEdit" @delete="handleDelete" />
    </div>
  </DashboardLayout>
</template>
