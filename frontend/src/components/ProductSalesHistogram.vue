<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-lg font-semibold text-center mb-4">Histogramme des Ventes de Produits</h2>
    <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
    <Bar v-else-if="chartData.labels.length" :data="chartData" :options="chartOptions" />
    <p v-else>Chargement des données...</p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Quantité Vendue',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
})

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Histogramme des Ventes de Produits',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Produits',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Quantité Vendue',
      },
      beginAtZero: true,
    },
  },
}

const error = ref('')

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/ventes-par-produit')

   
    const productSalesData = response.data

   
    chartData.labels = productSalesData.map(item => item.productName) 
    chartData.datasets[0].data = productSalesData.map(item => item.totalQuantity) 

  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Impossible de charger les données.'
  }
})
</script>
