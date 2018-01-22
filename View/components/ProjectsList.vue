<template>
  <div class="is-medium">
    <AppHeader/>
    <h2 class="subtitle">Les differents projets</h2>
    <div class="columns">
      <div class="column box-style is-4 is-bold" v-for="project in projects">
        <h3 class="" :key="project.key">{{project.title}}</h3>
        <p>{{project.description}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {AppHeader} from './Header.vue'
export default {
  data: () => ({
    projects:[
      {title:'CV', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'},
      {title:'Saint Leon’art', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'},
      {title:'CSSZG', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'}
    ]
  }),
  component:{

  }

}
</script>
<style lang="scss" scoped>

</style>
