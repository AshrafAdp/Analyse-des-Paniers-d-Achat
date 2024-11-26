<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-lg font-semibold text-center mb-4">Produits les Plus Vendus</h2>
    <Bar v-if="chartDataReady" :data="chartData" :options="chartOptions" />
    <p v-else class="text-center">Chargement des données...</p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import axios from 'axios'


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const chartData = reactive({
  labels: [], 
  datasets: [
    {
      label: 'Produits',
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
      text: 'Top 5 des Produits les Plus Vendus',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Quantité Vendue',
      font: {
                  weight: 'bold', 
           },
      },
    },
    x: {
      title: {
        display: true,
        text: 'Produits',
      font: {
                  weight: 'bold', 
           },
      
      },
      

    },
  },
}
const chartDataReady = ref(false)


const fetchTrendingProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/analytics/trending_products')
    const products = response.data


    chartData.labels = products.map((product) => product.productName)
    chartData.datasets[0].data = products.map((product) => product.totalQuantity)

    chartDataReady.value = true
  } catch (error) {
    console.error('Erreur lors de la récupération des produits tendance :', error)
    chartDataReady.value = true
  }
}


onMounted(fetchTrendingProducts)
</script>
