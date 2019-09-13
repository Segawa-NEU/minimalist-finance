<template>
  <b-container v-if="$root.earningCategories.state.initialized && $root.expenseCategories.state.initialized">
    <b-row>
      <b-col class="p-2" cols=12 md=6>
        <b-card>
          <category-create-card
            variant="outline-primary"
            storeName="earningCategories"
            >
          </category-create-card>
          <category-list-card
            storeName="earningCategories"
            >
          </category-list-card>
        </b-card>
      </b-col>
      <b-col class="p-2" cols=12 md=6>
        <b-card>
          <category-create-card
            variant="outline-danger"
            storeName="expenseCategories"
            >
          </category-create-card>
          <category-list-card
            storeName="expenseCategories"
            >
          </category-list-card>
        </b-card>
      </b-col>
      <b-col cols=12>
      </b-col>
      <b-col cols=12>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
// import ExpenseCategoryListCard from 'client/components/ExpenseCategoryListCard.vue'
import CategoryListCard from 'client/components/CategoryListCard.vue'
import CategoryCreateCard from 'client/components/CategoryCreateCard.vue'
import AuthenticationInitializationMixin from 'client/views/mixins/AuthenticationInitializationMixin.js'
import EarningCategoriesInitializationMixin from 'client/views/mixins/EarningCategoriesInitializationMixin.js'
import ExpenseCategoriesInitializationMixin from 'client/views/mixins/ExpenseCategoriesInitializationMixin.js'
export default {
  components: {
    // ExpenseCategoryListCard,
    CategoryListCard,
    CategoryCreateCard
  },
  mixins: [
    AuthenticationInitializationMixin,
    EarningCategoriesInitializationMixin,
    ExpenseCategoriesInitializationMixin
  ]
}
</script>
