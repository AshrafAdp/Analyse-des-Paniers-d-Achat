<template>
  <div class="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md">
        <div class="text-center mb-4">
      <h2 class="text-2xl font-semibold text-green-800">Total des Ventes</h2>
    </div>
      <div v-if="totalSales !== null" class="text-center">
      <p class="text-4xl font-bold text-green-600">
        {{ totalSales.toFixed(2) }} MAD
      </p>
    </div>
    <div v-else class="text-center text-red-500">
      <p>Chargement des données...</p>
    </div>
       <div class="text-center mt-6">
      <button
        @click="fetchTotalSales"
        class="px-6 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400 transition-all"
      >
        Actualiser
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totalSales = ref(null);

const fetchTotalSales = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/analytics/totals_sales');
    totalSales.value = response.data.totalSales; 
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes :', error);
    alert('Impossible de récupérer les données du total des ventes.');
  }
};
onMounted(() => {
  fetchTotalSales();
});
</script>
