import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/earnings',
      name: 'earnings',
      component: () => import(/* webpackChunkName: "earnings" */ './views/Earnings.vue')
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: () => import(/* webpackChunkName: "expenses" */ './views/Expenses.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import(/* webpackChunkName: "categories" */ './views/Categories.vue')
    }
  ]
})
