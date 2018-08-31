<template>
  <div id="app">
    <router-view name="header"></router-view>
    <el-container>
      <router-view name="side-menu"></router-view>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
body, html{
  height: 100%;
}
body {
  margin: 0;
  background-color: #F4F6F9;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.el-container{
  &--wrap {
    height: 100%;
  }
}
.el-main {
  padding-bottom: 100px;
  padding-left: 32px;
  padding-right: 32px;
}
.hide-visually {
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
h3 {
  margin-bottom: 8px;
}
h3 + p {
  margin-top: 8px;
}
</style>
