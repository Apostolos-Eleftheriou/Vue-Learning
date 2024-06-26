<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import DataTable from './components/DataTable.vue'
import data from './api/data.json'

const items = ref(data);

// onMounted(async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   items.value = await response.json();
// })

</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <DataTable :items="data"/>
  </div>
</template>