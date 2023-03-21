import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import InvoicesItem from '../components/InvoicesItem.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/invoices/:id',
    component: InvoicesItem,
    props: true
  },
  {
    path: '/invoices',
    name: 'Invoices',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
