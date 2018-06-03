<template>
  <div>
  <nav class="navbar is-link">
  <div class="navbar-brand">
    <router-link class="navbar-item" :to="{name:'jury'}">Jiri</router-link>
    <div class="navbar-burger burger" data-target="navMenuColorlink-example">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div id="navMenuColorlink-example" class="navbar-menu">
    <div class="navbar-start">
      <router-link  class="navbar-item" :to="{name:'students'}">Students</router-link>
      <router-link  class="navbar-item" :to="{name:'members'}">Members</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
          <div class="button is-primary" @click="logout()">logout</div>
      </div>
    </div>
  </div>
</nav>
</div>
</template>
<script>
export default {
  name: 'AppHeader',
  computed: {
    userId () {
      return this.$root.$data.userId

    }
  },
  methods: {
    logout () {
      localStorage.removeItem('userToken')
      this.$router.push({name: 'login'})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
