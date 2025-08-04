<script setup>
import {
  fetchDemandeList,
  updateDemande
} from '@/services/demandeService.js'

import { useCrud } from '@/composables/useCrud.js'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ListDemande from '@/components/demande/ListDemande.vue'
import UpdateModal from '@/components/modal/UpdateModal.vue'

const {
  items: demandes,
  showUpdateModal,
  selectedItem,
  handleEdit,
  closeUpdate,
  handleUpdate,
  handleDelete
} = useCrud({
  fetchFn: fetchDemandeList,
  updateFn: updateDemande
})

const DemandeConfig = {
  fields: [
    {
      key: 'etat',
      label: '⚙️ État',
      type: 'select',
      optionKey: 'etatOptions',
      optionValue: 'value',
      optionLabel: 'label'
    }
  ]
}


const loadOptions = async () => {
  try {
    return {
      etatOptions: [
        { value: 'true', label: 'Terminé' },
        { value: 'false', label: 'En cours' }
      ]
    }
  } catch (err) {
    console.error('Erreur chargement options :', err)
    return {
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
        <h1 class="text-4xl font-bold text-indigo-800">Gestion des demandes</h1>
      </header>

      <UpdateModal v-if="showUpdateModal" :modelValue="selectedItem" :title="'✏️ Modifier la demande'"
        :config="DemandeConfig" :fetchOptions="loadOptions" @submit="handleUpdate" @cancel="closeUpdate" />

      <ListDemande :demandes="demandes" @edit="handleEdit" @delete="handleDelete" />
    </div>
  </DashboardLayout>
</template>
