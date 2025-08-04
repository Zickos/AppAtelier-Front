<script setup>
import PGeneralVeh from '../components/planning/PGeneralVeh.vue'
import PGeneralUser from '../components/planning/PGeneralUser.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
</script>

<template>
  <DashboardLayout>
    <PGeneralUser />
    <PGeneralVeh />
  </DashboardLayout>
</template>
