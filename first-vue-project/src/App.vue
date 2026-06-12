<script setup>
import DataTable from './components/DataTable.vue'
import data from './api/data.json'
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <DataTable :items="data" />
  </div>
</template>