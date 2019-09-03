import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/authentication/Login'
import Dashboard from './components/dashboard/Dashboard'

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
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})
