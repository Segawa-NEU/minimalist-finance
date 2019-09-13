<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="w-100" v-show="updateMode">
      <div class="w-100 d-flex justify-content-between align-items-center">
        <b-input-group>
          <b-input-group-prepend class="d-none d-md-inline">
            <b-form-input type="date" v-model="updatedEntry.date"></b-form-input>
          </b-input-group-prepend>
          <b-form-input type="text" placeholder="What did you earn on?" v-model="updatedEntry.name"></b-form-input>
          <money v-model="updatedEntry.amount" class="form-control"></money>
          <b-input-group-append>
            <vue-bootstrap-typeahead
              class="d-none d-sm-inline"
              placeholder="Category"
              v-model="categoryName"
              :data="$root[categoryStoreName].state.resources"
              :serializer="category => category.name"
              ref="typeahead">
            </vue-bootstrap-typeahead>
          </b-input-group-append>
        </b-input-group>
        <font-awesome-icon class="mx-1" v-on:click="updateEntry()" icon="check" size="sm"></font-awesome-icon>
        <font-awesome-icon class="mx-1" v-on:click="abandonUpdate()" icon="times-circle"  size="sm"></font-awesome-icon>
        <font-awesome-icon class="mr-1" v-on:click="deleteEntry()" icon="trash-alt" size="sm"></font-awesome-icon>
      </div>
    </div>
    <div v-on:click="enterUpdateMode()" class="w-100" v-show="!updateMode">
      <div class="w-100 d-flex justify-content-between align-items-center">
        <h4 class="d-none d-md-inline">{{entry.date.slice(0,10)}}</h4>
        <h4>{{entry.name}}</h4>
        <h4>{{entry.amount}}$</h4>
        <h4 class="d-none d-sm-inline" :style="{ color: category.color}">
          {{category.name}}
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
export default {
  components: {
    VueBootstrapTypeahead
  },
  props: {
    id: Number,
    entryStoreName: String,
    categoryStoreName: String
  },
  data () {
    return {
      updateMode: false,
      categoryName: '',
      updatedEntry: null
    }
  },
  created () {
    let self = this
    self.resetData()
  },
  methods: {
    enterUpdateMode () {
      this.updateMode = true
      this.$refs.typeahead.inputValue = this.categoryName
    },
    leaveUpdateMode () {
      this.updateMode = false
    },
    resetData () {
      let self = this
      self.updateMode = false
      self.updatedEntry = {
        date: self.entry.date.slice(0, 10),
        name: self.entry.name,
        amount: self.entry.amount
      }
      if (self.entry.category_id) {
        let category = self.$root[self.categoryStoreName].state.resources.find((category) => category.id === self.entry.category_id)
        self.categoryName = category.name
      } else {
        self.categoryName = ''
      }
    },
    updateEntry () {
      let self = this
      self.createCategoryOnDemand().then((category) => {
        let newEntry = {
          id: self.entry.id,
          category_id: category.id,
          date: self.updatedEntry.date,
          name: self.updatedEntry.name,
          amount: self.updatedEntry.amount
        }
        return self.$root[self.entryStoreName].update(newEntry)
      }).then((updatedEntry) => {
        self.$emit('updated')
        self.resetData()
        self.leaveUpdateMode()
      }).catch((error) => {
        console.error(error)
      })
    },
    createCategoryOnDemand () {
      let self = this
      let isCategoryNameEqual = (category) => category.name === self.categoryName
      return new Promise((resolve, reject) => {
        if (!self.categoryName) {
          let nullCategory = {
            id: null,
            name: 'no category',
            color: '#BDC3C8'
          }
          resolve(nullCategory)
        } else if (self.$root[self.categoryStoreName].state.resources.some(isCategoryNameEqual)) {
          resolve(self.$root[self.categoryStoreName].state.resources.find(isCategoryNameEqual))
        } else {
          let newCategory = {
            name: self.categoryName,
            color: '#BDC3C8'
          }
          return self.$root[self.categoryStoreName].create(newCategory).then((created) => {
            resolve(created)
          }).catch((error) => {
            console.error(error)
          })
        }
      })
    },
    abandonUpdate () {
      let self = this
      self.resetData()
      self.leaveUpdateMode()
    },
    deleteEntry () {
      let self = this
      self.$root[self.entryStoreName].deleteByPk(self.entry.id)
    }
  },
  computed: {
    entry: function () {
      let self = this
      let entry = self.$root[self.entryStoreName].state.resources.find((entry) => entry.id === self.id)
      return entry
    },
    category: function () {
      let self = this
      let category = self.$root[self.categoryStoreName].state.resources.find((category) => category.id === self.entry.category_id)
      if (category === undefined) {
        return {
          name: 'no category',
          color: '#BDC3C8'
        }
      }
      return category
    }
  }
}
</script>
