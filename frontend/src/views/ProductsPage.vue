<template>
 <div class="min-h-screen bg-gray-50">
  <header class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 shadow-md">
      <h1 class="text-2xl font-bold text-center">Listes des Produits </h1>
    </header>
    <main class="mt-6">
      <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table class="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200 text-left">
              <th class="px-6 py-3 border border-gray-300 text-gray-700 font-medium">Nom du Produit</th>
              <th class="px-6 py-3 border border-gray-300 text-gray-700 font-medium">Catégorie</th>
              <th class="px-6 py-3 border border-gray-300 text-gray-700 font-medium">Prix</th>
              <th class="px-6 py-3 border border-gray-300 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index" class="hover:bg-gray-100">
              <td class="px-6 py-4 border border-gray-300 text-sm sm:text-base">{{ product.ProductName }}</td>
              <td class="px-6 py-4 border border-gray-300 text-sm sm:text-base">{{ product.Category }}</td>
              <td class="px-6 py-4 border border-gray-300 text-sm sm:text-base">{{ product.Price }} MAD</td>
              <td class="px-6 py-4 border border-gray-300 text-sm sm:text-base">
                <button @click="openModal('view', product)" class="text-blue-500 hover:text-blue-700">
                  <EyeIcon class="w-5 h-5 inline-block" />
                 </button>
                <button @click="openModal('edit', product)" class="text-yellow-500 hover:text-yellow-700">
                  <PencilIcon class="w-5 h-5 inline-block" />
                </button>
                <button @click="openModal('delete', product)" class="text-red-500 hover:text-red-700">
                  <TrashIcon class="w-5 h-5 inline-block" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-xl font-semibold mb-4">{{ modalTitle }}</h2>
        <form @submit.prevent="handleSubmit">
          <div v-if="action === 'edit'" class="mb-4">
            <label for="ProductName" class="block text-sm font-medium text-gray-700">Nom du Produit</label>
            <input v-model="modalProduct.ProductName" type="text" id="ProductName" class="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div v-if="action === 'edit'" class="mb-4">
            <label for="Category" class="block text-sm font-medium text-gray-700">Catégorie</label>
            <input v-model="modalProduct.Category" type="text" id="Category" class="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div class="mb-4">
            <label for="Price" class="block text-sm font-medium text-gray-700">Prix</label>
            <input v-model="modalProduct.Price" type="number" id="Price" class="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div class="mb-4">
            <label for="totalSales" class="block text-sm font-medium text-gray-700">Total des Ventes</label>
            <input v-model="modalProduct.totalSales" type="number" id="totalSales" class="mt-1 p-2 border border-gray-300 rounded w-full" disabled />
          </div>
          <div class="flex justify-between">
            <button type="button" @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Annuler</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">{{ modalButtonText }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EyeIcon,PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import axios from 'axios'

const products = ref([]) 
const modalVisible = ref(false) 
const modalProduct = ref(null) 
const modalTitle = ref('') 
const modalButtonText = ref('') 
const action = ref('') 

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products')
    products.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error)
  }
}

const openModal = (actionType, product) => {
  modalProduct.value = { ...product } 
  action.value = actionType
  if (actionType === 'view') {
    modalTitle.value = 'Voir le produit'
    modalButtonText.value = 'Fermer'
  } else if (actionType === 'edit') {
    modalTitle.value = 'Modifier le produit'
    modalButtonText.value = 'Sauvegarder'
  } else if (actionType === 'delete') {
    modalTitle.value = 'Supprimer le produit'
    modalButtonText.value = 'Supprimer'
  }
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

const handleSubmit = async () => {
  if (action.value === 'edit') {
    await editProduct(modalProduct.value)
  } else if (action.value === 'delete') {
    await deleteProduct(modalProduct.value._id)
  }
}


const editProduct = async (product) => {
  try {
    await axios.put(`http://localhost:3000/api/products/${product._id}`, product)
    fetchProducts()
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la modification du produit :', error)
  }
}

const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:3000/api/products/${productId}`)
    fetchProducts() 
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la suppression du produit :', error)
  }
}

fetchProducts()
</script>
