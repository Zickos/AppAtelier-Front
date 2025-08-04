<template>
  <!-- Overlay mobile -->
  <div v-if="isOpen" class="fixed inset-0 bg-[#59585859] bg-opacity-40 z-30 md:hidden" @click="$emit('close')" />

  <!-- Sidebar -->
  <aside
    class="fixed z-40 inset-y-0 left-0 w-72 md:w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0"
    :class="{ '-translate-x-full': !isOpen }">
    <div class="flex flex-col h-full justify-between px-4 py-6 space-y-6">
      <!-- 🟣 Header (mobile close) -->
      <div class="flex justify-between items-center md:hidden">
        <p class="text-lg font-semibold text-white">Navigation</p>
        <button @click="$emit('close')" aria-label="Fermer">
          <X class="w-6 h-6 text-white" />
        </button>
      </div>

      <!-- 👤 Utilisateur + Sections -->
      <div class="space-y-6 overflow-y-auto flex-1">
        <!-- Utilisateur -->
        <div class="flex items-center gap-3 px-1">
          <img src="../../assets/img/User.png" alt="Utilisateur" class="w-10 h-10 rounded-full border border-white" />
          <div>
            <p class="text-xs text-gray-400">Bienvenue</p>
            <p class="text-sm font-medium text-white">{{ auth.user?.prenom || 'Utilisateur' }}</p>
          </div>
        </div>

        <!-- Sections dynamiques -->
        <NavSection title="Me concernant" :links="meLinks" />
        <NavSection v-if="auth.user?.role_id === 1" title="Atelier" :links="mecanicLinks" />
        <NavSection v-if="[1, 3].includes(auth.user?.role_id)" title="Magasin" :links="magasinLinks" />
      </div>

      <!-- 🔒 Déconnexion -->
      <button @click="logout" class="logout-button mt-2">
        <LogOut class="w-5 h-5 inline mr-2" />
        Se déconnecter
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import router from '../../router'
import { X, LogOut, Truck, FilePlus, Calendar, Folder, Bell, Users, Tv } from 'lucide-vue-next'
import NavSection from './NavSection.vue'

defineProps({ isOpen: Boolean })
defineEmits(['close'])

const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push('/')
}

// 🧩 Liens
const meLinks = [
  { label: 'Me concernant', icon: Calendar, to: '/planningpersonnel' }
]

// ✅ Magasin links avec contrôle par rôle
const magasinLinks = computed(() => [
  {
    label: 'Gestion des demandes',
    icon: FilePlus,
    to: '/gestiondemande'
  },
  {
    label: 'Administration',
    icon: Users,
    children: [
      ...(auth.user?.role_id === 1
        ? [
          { label: 'Parc Véhicule', to: '/vehiclelist', icon: Truck },
          { label: 'Gestion des Plannings', to: '/gestionplanningmagasin', icon: FilePlus },
          { label: 'Parc Société', to: '/vehiclelist', icon: Folder }
        ]
        : []),
    ]
  }
])


// ✅ Mécanique links avec contrôle par rôle
const mecanicLinks = computed(() => [
  {
    label: 'Planning Général',
    icon: Calendar,
    to: '/planninggeneral'
  },
  {
    label: 'Administration',
    icon: Users,
    children: [
      { label: 'Liste Véhicule', to: '/vehiclelist', icon: Folder },
      ...(auth.user?.role_id === 1
        ? [
          { label: 'Gestion des Véhicules', to: '/gestionvehicle', icon: FilePlus },
          { label: 'Gestion des Retrofits', to: '/gestionretrofit', icon: FilePlus },
          { label: 'Gestion des Plannings', to: '/gestionplanningmecano', icon: FilePlus },
          { label: 'Gestion des Demandes', to: '/gestiondemande', icon: FilePlus }
        ]
        : []),
    ]
  }
])
</script>


<style scoped>
.logout-button {
  width: 100%;
  padding: 0.6rem 1rem;
  background-color: #dc2626;
  color: white;
  font-weight: 500;
  border-radius: 6px;
  transition: background-color 0.2s;
  text-align: left;
}

.logout-button:hover {
  background-color: #b91c1c;
}
</style>
