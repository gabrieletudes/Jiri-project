<template>
  <el-header class="menu-wrapper">
    <el-menu mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" class="logo"><a href="#"><img src="/dist/assets/Logo-jiri.svg" width="auto" height="54"><span class="hide-visually">Jiri</span></a></el-menu-item>
      <el-menu-item index="2" class="no-padding"><a href="#">Admin</a></el-menu-item>
    </el-menu>
  </el-header>
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
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: white;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
}
.el-menu {
  display: flex;
  justify-content: flex-end;
  max-width: 1500px;
}

.logo.el-menu-item {
  margin: 0 auto;
}

.no-padding {
  padding: 0;
}
</style>
