export default {
  created: function () {
    let self = this
    self.axios.defaults.headers.common['Authorization'] = 'Bearer ' + self.$cookies.access_token
    if (!self.$root.earningCategories.state.initialized) {
      self.$root.earningCategories.initialize(self.axios).catch((error) => {
        console.error(error)
        self.$router.push('/')
      })
    }
  }
}
