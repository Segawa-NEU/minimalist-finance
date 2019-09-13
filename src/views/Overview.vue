<template>
  <b-container v-if="$root.earningCategories.state.initialized && $root.earnings.state.initialized && $root.expenseCategories.state.initialized && $root.expenses.state.initialized">
    <b-row>
    </b-row>
  </b-container>
</template>
<script>
import AuthenticationInitializationMixin from 'client/views/AuthenticationInitializationMixin.js'
import EarningCategoriesInitializationMixin from 'client/views/EarningCategoriesInitializationMixin.js'
import EarningsInitializationMixin from 'client/views/EarningsInitializationMixin.js'
import ExpenseCategoriesInitializationMixin from 'client/views/ExpenseCategoriesInitializationMixin.js'
import ExpensesInitializationMixin from 'client/views/ExpensesInitializationMixin.js'
export default {
  components: {
    EarningLogger,
    //    ExpenseLogger,
    EarningList
    //    ExpenseList
  },
  mixins: [
    AuthenticationInitializationMixin,
    EarningCategoriesInitializationMixin,
    EarningsInitializationMixin,
    ExpenseCategoriesInitializationMixin,
    ExpensesInitializationMixin
  ]
}
</script>
