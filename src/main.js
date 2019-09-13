import Vue from 'vue'
import App from './App.vue'
import router from './router'
import configure from 'client/configure.js'
import resourceStoreFactory from 'client/resourceStoreFactory.js'
import earningResourceValidator from 'client/resourceValidator/earningResourceValidator.js'
import expenseResourceValidator from 'client/resourceValidator/expenseResourceValidator.js'
import earningCategoryResourceValidator from 'client/resourceValidator/earningCategoryResourceValidator.js'
import expenseCategoryResourceValidator from 'client/resourceValidator/expenseCategoryResourceValidator.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-swatches/dist/vue-swatches.min.css'

configure(Vue)
new Vue({
  router,
  data: {
    earnings: resourceStoreFactory('earning', earningResourceValidator),
    expenses: resourceStoreFactory('expense', expenseResourceValidator),
    earningCategories: resourceStoreFactory('earningCategory', earningCategoryResourceValidator),
    expenseCategories: resourceStoreFactory('expenseCategory', expenseCategoryResourceValidator)
  },
  methods: {
    getDisplayableName (storeName) {
      switch (storeName) {
        case 'earnings':
          return 'Earnings'
        case 'expenses':
          return 'Expenses'
        case 'earningCategories':
          return 'Earning Categories'
        case 'expenseCategories':
          return 'Expense Categories'
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
