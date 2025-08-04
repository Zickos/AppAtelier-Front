<template>
  <div>
    <p class="text-xs uppercase tracking-wide text-gray-400 mb-2">{{ title }}</p>
    <ul class="space-y-1">
      <li v-for="link in links" :key="link.label">
        <div>
          <!-- 🔽 Cas avec sous-éléments (pas de lien principal ici) -->
          <button v-if="link.children" @click="toggle(link.label)"
            class="flex items-center justify-between w-full text-left px-2 py-2 rounded hover:bg-gray-700">
            <span class="flex items-center gap-2">
              <component :is="link.icon" class="w-5 h-5" />
              <span>{{ link.label }}</span>
            </span>
            <span>{{ openLinks[link.label] ? '▾' : '▸' }}</span>
          </button>

          <!-- Sous-liens -->
          <ul v-if="link.children && openLinks[link.label]" class="ml-6 mt-1 space-y-1">
            <li v-for="child in link.children" :key="child.label">
              <RouterLink :to="child.to"
                class="block px-2 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded">
                {{ child.label }}
              </RouterLink>
            </li>
          </ul>

          <!-- ✅ Cas sans enfants : lien direct -->
          <RouterLink v-else-if="!link.children && link.to" :to="link.to"
            class="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700">
            <component :is="link.icon" class="w-5 h-5" />
            <span>{{ link.label }}</span>
          </RouterLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  links: Array
})

const openLinks = ref({})

const toggle = (label) => {
  openLinks.value[label] = !openLinks.value[label]
}
</script>
