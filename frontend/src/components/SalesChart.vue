<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <div class="flex flex-wrap justify-center mb-6 gap-4">
      <div class="flex flex-col items-center">
        <label for="startDate" class="text-sm font-semibold text-gray-600 mb-2">Date de début</label>
        <FlatPickr
          id="startDate"
          v-model="startDate"
          :config="startDateConfig"
          class="w-56 p-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition-all"
        />
      </div>
      <div class="flex flex-col items-center">
        <label for="endDate" class="text-sm font-semibold text-gray-600 mb-2">Date de fin</label>
        <FlatPickr
          id="endDate"
          v-model="endDate"
          :config="endDateConfig"
          class="w-56 p-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition-all"
        />
      </div>
    </div>

    
    <div class="flex justify-center">
      <button
        @click="fetchTotalSales"
        class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
      >
        Appliquer
      </button>
    </div>

    
    <div v-if="totalSales !== null" class="text-center mt-6">
      <h3 class="text-2xl font-semibold text-gray-700">Total des Ventes</h3>
      <p class="text-xl font-bold text-blue-600">{{ totalSales.toFixed(2) }} MAD</p>
    </div>
    <div v-else class="text-center text-red-500 mt-6">
      <p>Aucune donnée disponible</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.min.css';


const defaultDate = '2024-07-19';
const startDate = ref(defaultDate);
const endDate = ref(defaultDate);
const totalSales = ref(null);

const today = new Date().toISOString().split('T')[0];


const startDateConfig = {
  dateFormat: 'Y-m-d',
   maxDate: today,
  locale: {
    firstDayOfWeek: 1,
  },
};


const endDateConfig = {
  dateFormat: 'Y-m-d',
  maxDate: today, 
  locale: {
    firstDayOfWeek: 1,
  },
};

const validateDates = () => {
  if (new Date(startDate.value) > new Date(endDate.value)) {
    alert('La date de début ne peut pas être supérieure à la date de fin.');
    return false;
  }
  return true;
};

const fetchTotalSales = async () => {
  if (!validateDates()) return;

  try {
    const response = await axios.get('http://localhost:3000/api/analytics/total_sales', {
      params: {
        startDate: startDate.value,
        endDate: endDate.value,
      },
    });

    totalSales.value = response.data.total;
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes :', error);
    alert('Erreur lors de la récupération des données.');
  }
};

onMounted(() => {
  fetchTotalSales();
});
</script>
