<template>
  <b-container v-if="$root.earningCategories.state.initialized && $root.earnings.state.initialized && $root.expenseCategories.state.initialized && $root.expenses.state.initialized">
    <b-row>
      <b-col cols=12 class="py-2">
        <entry-logger variant="outline-danger" entryStoreName="expenses" categoryStoreName="expenseCategories"></entry-logger>
      </b-col>
      <b-col cols=12 class="py-2">
        <entry-list entryStoreName="expenses" categoryStoreName="expenseCategories"></entry-list>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import EntryLogger from 'client/components/EntryLogger.vue'
import EntryList from 'client/components/EntryList.vue'
import AuthenticationInitializationMixin from 'client/views/mixins/AuthenticationInitializationMixin.js'
import EarningCategoriesInitializationMixin from 'client/views/mixins/EarningCategoriesInitializationMixin.js'
import EarningsInitializationMixin from 'client/views/mixins/EarningsInitializationMixin.js'
import ExpenseCategoriesInitializationMixin from 'client/views/mixins/ExpenseCategoriesInitializationMixin.js'
import ExpensesInitializationMixin from 'client/views/mixins/ExpensesInitializationMixin.js'
export default {
  components: {
    EntryLogger,
    EntryList
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
