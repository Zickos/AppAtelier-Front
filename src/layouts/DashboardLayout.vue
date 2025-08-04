<template>
    <div class="flex h-screen w-full overflow-hidden">
        <!-- Sidebar -->
        <Sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

        <!-- Main content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header mobile -->
            <header class="flex items-center justify-between bg-white px-4 py-3 shadow md:hidden">
                <button @click="isSidebarOpen = true" aria-label="Menu">
                    <Menu class="w-6 h-6 text-gray-800" />
                </button>
                <h1 class="text-lg font-semibold">Tableau de bord</h1>
                <div class="w-6" /> <!-- pour aligner -->
            </header>

            <!-- Main layout content -->
            <main class="flex-1 overflow-y-auto overflow-x-hidden bg-gray-800">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import Sidebar from '../components/main/Navbar.vue'

const isSidebarOpen = ref(false)
</script>
