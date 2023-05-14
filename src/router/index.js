import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/CesiumHome',
        name: 'CesiumHome',
        component: () => import('../views/CesiumHome/cesiumIndex.vue')
      },
      {
        path: '/water',
        name: 'Water',
        component: () => import('../views/CesiumHome/water.vue')
      },
    ]


  },

]

const router = createRouter({
  mode: history,
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path === '/') {

    next({ path: '/CesiumHome' })

  } else {
    next()
  }
})

export default router
