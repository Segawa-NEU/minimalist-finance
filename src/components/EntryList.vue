<template>
  <b-card no-body>
    <h4 slot="header">{{$root.getDisplayableName(entryStoreName)}}</h4>
    <b-list-group flush>
      <b-list-group-item v-for='(entry, index) in $root[entryStoreName].state.resources' v-bind:key='entry.id'>
        <entry-list-item
          :entryStoreName="entryStoreName"
          :categoryStoreName="categoryStoreName"
          :id='entry.id'
          @updated="$root[entryStoreName].state.resources.splice(index, 1, $root[entryStoreName].state.resources[index])">
        </entry-list-item>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script>
import EntryListItem from 'client/components/EntryListItem.vue'
export default {
  components: {
    EntryListItem
  },
  props: {
    entryStoreName: String,
    categoryStoreName: String
  }
}
</script>
