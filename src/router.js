import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/authentication/Login'
import Dashboard from './components/dashboard/Dashboard'
import Brand from './components/brand/BrandMain'
import Category from './components/category/CategoryMain'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/brand',
      name: 'brand',
      component: Brand,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})
