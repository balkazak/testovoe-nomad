import { createRouter, createWebHistory } from 'vue-router'
import UsersPage from '@/pages/UsersPage.vue'
import InvoicesPage from '@/pages/InvoicesPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoicesPage
    }
  ]
})

export default router

