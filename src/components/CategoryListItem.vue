<template>
  <div class='w-100 h-100'>
    <div v-show="!updateMode" class='w-100 h-100'>
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="m-0" v-on:click="enterUpdateMode()" :style="{ color: color }">{{name}}</h5>
      </div>
    </div>
    <div v-show="updateMode" class='w-100 h-100'>
      <div class="d-flex justify-content-between align-items-center">
        <swatches
          class="mr-1"
          v-model="color"
          shapes="circles"
          :trigger-style="{ width: '24px', height: '24px', margin: 'auto'}"
          :row-length="5"
          :swatch-size="16"
          ></swatches>
        <b-form-input class="mx-1" v-model="name" placeholder="Set category name">
        </b-form-input>
        <font-awesome-icon class="mx-1" v-on:click="updateCategory()" icon="check" size="lg"></font-awesome-icon>
        <font-awesome-icon class="mx-1" v-on:click="abandonUpdate()" icon="times-circle"  size="lg"></font-awesome-icon>
        <font-awesome-icon class="ml-1" v-on:click="deleteCategory()" icon="trash-alt" size="lg"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>
<script>
import Swatches from 'vue-swatches'
export default {
  components: {
    Swatches
  },
  props: {
    id: Number,
    storeName: String
  },
  data () {
    return {
      updateMode: false,
      color: '#BDC3C8',
      name: ''
    }
  },
  created () {
    let self = this
    self.$root[this.storeName].findByPk(this.id).then((category) => {
      self.color = category.color
      self.name = category.name
    })
  },
  methods: {
    enterUpdateMode () {
      this.updateMode = true
    },
    leaveUpdateMode () {
      this.updateMode = false
    },
    abandonUpdate () {
      let self = this
      self.$root[self.storeName].findByPk(this.id).then((category) => {
        self.color = category.color
        self.name = category.name
        self.leaveUpdateMode()
      })
    },
    updateCategory () {
      let self = this
      let toUpdate = {
        id: this.id,
        name: this.name,
        color: this.color
      }
      self.$root[self.storeName].update(toUpdate).then((updated) => {
        self.color = updated.color
        self.name = updated.name
        self.leaveUpdateMode()
      })
    },
    deleteCategory () {
      let self = this
      self.$root[self.storeName].deleteByPk(self.id).then((result) => {
        if (result) {
          self.$emit('remove')
        }
      })
    }
  }
}
</script>
