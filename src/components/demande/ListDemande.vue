<script setup>
import { computed, defineEmits, defineProps } from 'vue'
import DemandeCard from './DemandeCard.vue'
import {
  ClipboardList,
} from 'lucide-vue-next'

const props = defineProps({
  demandes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const demandesTraitees = computed(() =>
  props.demandes.filter(d => d.etat === true || d.etat === 1)
)

const demandesEnCours = computed(() =>
  props.demandes.filter(d => d.etat === false || d.etat === 0)
)
</script>

<template>
  <div class="rounded-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <ClipboardList class="w-6 h-6 text-indigo-600" />
      Liste des Demandes
    </h2>

    <!-- 🟠 Demandes en attente -->
    <div class="mb-10">
      <h3 class="text-lg font-semibold text-orange-600 mb-4">🔄 En cours</h3>
      <div v-if="demandesEnCours.length" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <DemandeCard
          v-for="demande in demandesEnCours"
          :key="demande.id"
          :demande="demande"
          @edit="emit('edit', demande)"
          @delete="emit('delete', demande)"
        />
      </div>
      <p v-else class="text-sm italic text-gray-500">Aucune demande en attente.</p>
    </div>

    <!-- ✅ Demandes traitées -->
    <div>
      <h3 class="text-lg font-semibold text-green-700 mb-4">✅ Traitée</h3>
      <div v-if="demandesTraitees.length" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <DemandeCard
          v-for="demande in demandesTraitees"
          :key="demande.id"
          :demande="demande"
        />
      </div>
      <p v-else class="text-sm italic text-gray-500">Aucune demande traitée.</p>
    </div>
  </div>
</template>
