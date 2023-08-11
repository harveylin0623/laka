import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Register from '@/pages/Register.vue'
import Register2 from '@/pages/Register2.vue'

const hashMode = createWebHashHistory()
const historyMode = createWebHistory(import.meta.env.VITE_BASE_URL)
const router = createRouter({
  // history: hashMode,
  history: import.meta.env.DEV ? hashMode : historyMode,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: 'DefaultLayout'
      },
      redirect: '/register'
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        layout: 'DefaultLayout',
        pageName: '會員註冊',
        setpIndex: 1
      }
    },
    {
      path: '/register2',
      name: 'register2',
      component: Register2,
      meta: {
        layout: 'DefaultLayout',
        pageName: '會員註冊',
        setpIndex: 2
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router