<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
    <div class="text-center max-w-xl">
      <p class="text-sm font-medium text-indigo-600">Erreur 404</p>
      <h1 class="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Page introuvable
      </h1>
      <p class="mt-6 text-lg text-gray-600">
        Désolé, la page que vous recherchez n’existe pas ou a été déplacée.
      </p>
      <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          Retour à l’accueil
        </RouterLink>
        <RouterLink
          to="/contact"
          class="inline-flex items-center justify-center text-sm font-medium text-gray-900 hover:underline"
        >
          Contacter le support →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
