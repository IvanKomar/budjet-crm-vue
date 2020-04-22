import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'auth'},
    component: () => import('./../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('./../views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('./../views/Home.vue')
  }, 
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main'},
    component: () => import('./../views/Categories.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {layout: 'main'},
    component: () => import('./../views/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main'},
    component: () => import('./../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main'},
    component: () => import('./../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: () => import('./../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main'},
    component: () => import('./../views/Record.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
