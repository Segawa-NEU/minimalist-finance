<template>
  <b-navbar toggleable="md" variant="faded" type="light">
    <b-navbar-brand to="/">Minimalist Finance</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isLoggedIn">
        <b-nav-item to="/expenses">Expenses</b-nav-item>
        <b-nav-item to="/earnings">Earnings</b-nav-item>
        <b-nav-item to="/categories">Categories</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="isLoggedIn" class="ml-auto">
        <b-nav-item v-on:click="logOut()">Logout</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="!isLoggedIn" class="ml-auto">
        <b-nav-item to="/login">Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  methods: {
    logOut () {
      let self = this
      self.$removeCookie('access_token')
      self.$router.push('/')
      self.$forceUpdate()
    }
  },
  computed: {
    isLoggedIn () {
      let self = this
      if (self.$cookies.access_token) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
