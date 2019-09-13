<template>
    <b-input-group>
      <b-input-group-prepend class="d-none d-md-flex">
        <b-form-input type="date" v-model="date"></b-form-input>
      </b-input-group-prepend>
      <b-form-input type="text" :placeholder="$root.getDisplayableName(entryStoreName)" v-model="name"></b-form-input>
      <money v-model="amount" class="form-control"></money>
      <b-input-group-append>
        <vue-bootstrap-typeahead
          class="d-none d-sm-block"
          placeholder="Category"
          v-model="categoryName"
          :data="$root[categoryStoreName].state.resources"
          :serializer="category => category.name">
        </vue-bootstrap-typeahead>
        <b-button :variant="variant" v-on:click='log()'>Log</b-button>
      </b-input-group-append>
    </b-input-group>
</template>
<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
export default {
  components: {
    VueBootstrapTypeahead
  },
  props: {
    entryStoreName: String,
    categoryStoreName: String,
    variant: String
  },
  data () {
    return {
      categoryName: null,
      name: '',
      date: new Date().toISOString().slice(0, 10),
      amount: 0.00
    }
  },
  methods: {
    clearLogger () {
      let self = this
      self.categoryName = null
      self.name = ''
      self.amount = 0.00
    },
    log () {
      let self = this
      let newEntry = {
        category_id: null,
        name: self.name,
        amount: self.amount,
        date: self.date
      }
      if (!self.categoryName) {
        self.$root[self.entryStoreName].create(newEntry).then((created) => {
          self.clearLogger()
        }).catch((error) => {
          console.error(error)
          self.$router.push('/')
        })
      } else {
        self.$root[self.categoryStoreName].firstOrNull((category) => category.name === self.categoryName).then((category) => {
          if (!category) {
            let newEarningCategory = {
              name: self.categoryName,
              color: '#BDC3C8'
            }
            return self.$root[self.categoryStoreName].create(newEarningCategory)
          } else {
            return Promise.resolve(category)
          }
        }).then((category) => {
          newEntry.category_id = category.id
          return self.$root[self.entryStoreName].create(newEntry)
        }).then((data) => {
          self.clearLogger()
        }).catch((error) => {
          console.error(error)
          self.$router.push('/')
        })
      }
    }
  }
}
</script>
