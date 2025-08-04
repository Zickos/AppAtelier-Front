<template>
  <DashboardLayout>
    <div class="bg-gray-50 py-12 px-6 min-h-full">
      <div class="max-w-7xl mx-auto space-y-10">

        <!-- Titre de la page -->
        <header>
          <h1 class="text-3xl font-bold text-gray-800">Tableau de bord</h1>
          <p class="text-gray-600 mt-1">Bienvenue sur votre espace personnel</p>
        </header>

        <!-- Cartes Résumé -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="text-lg font-semibold text-gray-800">Planning</h2>
            <p class="text-sm text-gray-500 mt-2">Vous avez 3 événements à venir cette semaine.</p>
            <RouterLink to="/planning" class="mt-4 inline-block text-indigo-600 text-sm font-medium hover:underline">
              Voir
              le planning →</RouterLink>
          </div>

          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="text-lg font-semibold text-gray-800">Véhicule attribué</h2>
            <p class="text-sm text-gray-500 mt-2">Peugeot 208 - immatriculée AB-123-CD</p>
            <RouterLink to="/vehicules" class="mt-4 inline-block text-indigo-600 text-sm font-medium hover:underline">
              Gérer mes véhicules →</RouterLink>
          </div>

          <div class="rounded-lg bg-white p-6 shadow">
            <h2 class="text-lg font-semibold text-gray-800">Demandes en cours</h2>
            <p class="text-sm text-gray-500 mt-2">2 demandes en attente de traitement.</p>
            <RouterLink to="/demandes" class="mt-4 inline-block text-indigo-600 text-sm font-medium hover:underline">
              Voir
              les demandes →</RouterLink>
          </div>
        </div>

        <!-- Section détaillée (facultatif) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Événements à venir</h3>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>📍 Réunion avec le client A – 18 juillet à 10h</li>
              <li>🚗 Livraison du véhicule – 19 juillet à 14h</li>
              <li>📅 Inspection technique – 21 juillet à 9h</li>
            </ul>
          </div>

          <div class="bg-white rounded-lg p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Dernières demandes</h3>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>🔧 Révision technique – en attente</li>
              <li>🛠️ Problème signalé sur véhicule – traité</li>
              <li>💼 Demande de congé – en cours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
</script>
