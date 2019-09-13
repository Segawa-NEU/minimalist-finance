export default {
  created: function () {
    let self = this
    if (!this.$cookies.access_token) {
      self.$router.push('/login')
    }
  }
}
