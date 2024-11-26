<template>
  <div class="min-h-screen bg-gray-50">
       <header class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 shadow-md">
      <h1 class="text-2xl font-bold text-center">Dashboard - Analyse des Ventes</h1>
    </header>
    <main class="p-6 max-w-screen-xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section class="bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow p-6 flex items-center justify-center">
          <TotalSales />
        </section>
        <section class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Évolution des Ventes</h2>
          <SalesChart />
        </section>
        <section class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Produits les Plus Vendus</h2>
          <TopProductsChart />
        </section>
        <section class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Ventes par Catégorie</h2>
          <SalesByCategoryChart />
        </section>
        <section class="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Histogramme des Ventes</h2>
          <ProductSalesHistogram />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import SalesChart from '@/components/SalesChart.vue';
import TopProductsChart from '@/components/TopProductsChart.vue';
import SalesByCategoryChart from '@/components/SalesByCategoryChart.vue';
import ProductSalesHistogram from '@/components/ProductSalesHistogram.vue';
import TotalSales from '@/components/TotalSales.vue';
</script>
