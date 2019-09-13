<template>
  <b-row>
    <b-col class="py-2" cols=9 xl=4>
      <b-form-input v-model="name" placeholder="Set category name">
      </b-form-input>
    </b-col>
    <b-col class="py-2" cols=3 xl=2>
      <swatches
        class="m-auto"
        v-model="color"
        shapes="circles"
        :trigger-style="{ width: '32px', height: '32px', margin: 'auto'}"
        :row-length="5"
        :swatch-size="16"
        >
      </swatches>
    </b-col>
    <b-col class="py-2" cols=12 xl=6>
      <b-button class="w-100" style="overflow=y: hidden; font-size: 12px" v-on:click="createCategory()" :variant="variant">Create {{$root.getDisplayableName(storeName)}}</b-button>
    </b-col>
  </b-row>
</template>
<script>
import Swatches from 'vue-swatches'
export default {
  components: {
    Swatches
  },
  props: {
    storeName: String,
    variant: String
  },
  data () {
    return {
      name: '',
      color: '#BDC3C8'
    }
  },
  methods: {
    createCategory () {
      let self = this
      if (self.name && self.color) {
        let category = {
          name: self.name,
          color: self.color
        }
        self.$root[self.storeName].create(category).then((created) => {
          self.name = ''
          self.color = '#BDC3C8'
        })
      }
    }
  }
}
</script>
