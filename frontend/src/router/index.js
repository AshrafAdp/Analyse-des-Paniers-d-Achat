  import { createRouter, createWebHistory } from 'vue-router'
  import DashboardPage  from '../views/DashboardPage.vue'
  import ProductsPage from '../views/ProductsPage.vue' 
  import TeamPage from '../views/TeamPage.vue'

  const routes = [
    {
      path: '/',
      redirect: '/dashboard', 
    },
    {
      path: '/dashboard',
      name: 'dashboard ',
      component: DashboardPage , 
    },
    {
      path: '/Team',
      name: 'Team ',
      component: TeamPage , 
    },
    {
      path: '/products', 
      name: 'products',
      component: ProductsPage, 
    }

  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router
