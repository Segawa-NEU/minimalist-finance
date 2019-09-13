<template>
  <b-list-group flush>
    <b-list-group-item
      class="py-2 px-0"
      v-for="(category, index) in $root[storeName].state.resources"
      :key="category.id">
      <category-list-item :storeName="storeName" :id="category.id" v-on:remove="$root[storeName].state.resources.splice(index, 1)">
      </category-list-item>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import CategoryListItem from 'client/components/CategoryListItem.vue'
export default {
  components: {
    CategoryListItem
  },
  props: {
    storeName: String
  }
}
</script>
