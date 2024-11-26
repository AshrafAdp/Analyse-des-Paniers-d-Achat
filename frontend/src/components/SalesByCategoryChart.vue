<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-lg font-semibold text-center mb-4">Répartition des Ventes par Catégorie</h2>
    <div v-if="chartData.labels.length > 0" class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="text-center text-gray-500">
      <p>Aucune donnée disponible pour l'instant.</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'


ChartJS.register(Title, Tooltip, Legend, ArcElement)


const chartData = reactive({
  labels: [], 
  datasets: [
    {
      label: 'Pourcentage des Ventes',
      data: [], 
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
})


const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Répartition des Ventes par Catégorie',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const label = tooltipItem.label || ''
          const value = tooltipItem.raw || 0
          return `${label}: ${value.toFixed(2)}%`
        },
      },
    },
  },
}


const fetchCategorySalesData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/pourcentage-ventes-par-categorie')
    const data = response.data

    if (Array.isArray(data) && data.length > 0) {
      chartData.labels = data.map((item) => item.category)
      chartData.datasets[0].data = data.map((item) => item.pourcentage)
    } else {
      console.warn('Aucune donnée valide retournée par l’API.')
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
    alert('Erreur lors de la récupération des données.')
  }
}


onMounted(() => {
  fetchCategorySalesData()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
