import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
