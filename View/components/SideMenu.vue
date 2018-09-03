<template>
  <el-aside class="aside">
    <el-menu class="aside__menu">
      <el-menu-item index="1">
        <router-link :to="{ name: 'jury' }" class="el-menu-item__link" exact>Jiri</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{ name: 'jurys' }" class="el-menu-item__link">Jurys</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{ name: 'students' }" class="el-menu-item__link">Étudiants</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link :to="{ name: 'members' }" class="el-menu-item__link">Membres</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link :to="{ name: 'projects' }" class="el-menu-item__link">Projets</router-link>
      </el-menu-item>
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
  background-color: #398089;
  &__menu {
    border-right: none;
    margin-top: 60px;
    position: fixed;
    width: 200px;
    z-index: 22;
  }
}
.el-menu {
  background-color: inherit;
  &--horizontal {
    padding: 0 20px;
  }
}
.el-menu-item {
  padding: 0 !important;
  color: #FFFFFF;
  &.is-active{
    color:none;
  }
  &__link {
    padding: 0 20px;
    color: inherit;
    text-decoration: none;
    display: block;
    font-weight: bold;
    transition: background-color .3s ease-in-out;
    &:active, &:hover, &:focus {
      color: #3e3e3e;
      background-color: #FFCCBC;
      text-decoration: none;
    }
  }
  &__link.router-link-active, &:focus, &:hover {
    color: #3e3e3e;
    background-color: #FFCCBC;
    text-decoration: none;
  }
}
</style>
