import routes from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes,
})

// global interceptors
router.beforeEach((to, from) => {
  console.log(to, from)
})

export default router