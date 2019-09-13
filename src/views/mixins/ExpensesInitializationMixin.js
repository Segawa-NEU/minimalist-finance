export default {
  created: function () {
    let self = this
    self.axios.defaults.headers.common['Authorization'] = 'Bearer ' + self.$cookies.access_token
    if (!self.$root.expenses.state.initialized) {
      self.$root.expenses.initialize(self.axios).catch((error) => {
        console.error(error)
        self.$router.push('/')
      })
    }
  }
}
