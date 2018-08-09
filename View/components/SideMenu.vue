<template>
  <el-aside class="aside">
    <el-menu class="aside__menu">
      <el-menu-item index="1">Jurys</el-menu-item>
      <el-menu-item index="2">Etudiants</el-menu-item>
      <el-menu-item index="3">Membres du jury</el-menu-item>
      <el-menu-item index="4">Projets</el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: "SideMenu",
}
</script>
<style lang="scss" scoped>
.aside {
  max-width: 200px;
  background-color: white;
  &__menu {
    border-right: none;
  }
}
</style>
