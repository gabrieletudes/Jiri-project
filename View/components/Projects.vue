<template>
  <el-main>
    <h1 class="title title--bold title--top-spaced">Projets</h1>
    <div>
    <h2>Ajouter un nouveau projet</h2>
    <el-row type="flex" justify="start" align="bottom" class="box box--light el-row--max-medium box--space">
      <el-col :xs="24" :sm="18" :md="7" class="el-space--rigth-small">
        <label for="projecttitle" class="el-space--bottom-tiny project-create__label">Titre</label>
        <el-input v-model="name" id="projecttitle"></el-input>
      </el-col>
      <el-col :xs="24" :sm="18" :md="10" class="project-create el-space--rigth-small">
        <label for="projectdescription" class="el-space--bottom-tiny project-create__label">Description</label>
        <el-input v-model="description" id="projectdescription" type="textarea"></el-input>
      </el-col>
      <el-col :xs="24" :sm="6" :md="4">
        <el-button type="primary" @click="createProject">Ajouter le projet</el-button>
      </el-col>
    </el-row>
    </div>
    <div>
    <h2>Tout les projets</h2>
    <el-row class="el-row--max-big">
      <el-col :xs="24" :sm="8" class="el-col--max-small el-col--space-right-bottom-small box box--aligned-center box--light box--space-small" v-for="project in projects" :key="project.id">
          <div class="">
            <h3>{{project.name}}</h3>
            <p>{{project.description}}</p>
          </div>
      </el-col>
    </el-row>
  </div>
  </el-main>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import { CREATE_PROJECT_MUTATION, QUERY_ALL_PROJECTS } from '../querys/Projects.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      name: '',
      description: '',
      softDelete: false,
      projects:{},
    }
  },
  apollo: {
    // Query with parameters
    projects: {
      // gql query
      query: QUERY_ALL_PROJECTS,
      update(data){
        return data.allProjects
      }
    },
  },
  methods:{
    createProject(){
      let project = {
        name: this.name,
        email: this.email,
        group: this.group,
        softDelete: this.softDelete
      }
        EventBus.$emit('createProject',project);
        this.name = null,
        this.email = null,
        this.group = null
      }
    }
}
</script>
<style lang="scss" scoped>
.title {
  text-transform: uppercase;
  &--top-spaced {
    margin-top: 10rem;
  }
  &--bold {
    font-weight: bold;
  }
}
.box {
  flex: 1;
  &--light {
    background-color: white;
  }
  &--space {
    padding: 24px 16px;
  }
  &--space-small {
    padding: 16px;
  }
  &--aligned-center {
    display: flex;
    align-items: center;
  }
}
.el-row {
  &--max-big {
    max-width: 1200px;
  }
  &--max-medium {
    max-width: 768px;
  }
}
.el-col {
  &--space-right-bottom-small{
    margin-right: 16px;
    margin-bottom: 16px;
  }
  &__link{
    color: inherit;
    text-decoration: none;
  }
}
.jury-extra {
  list-style: none;
  padding-left: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  &__item {
    padding-right: 16px;
  }
}
.el-button-group {
  &--margin-top-small {
    margin-top: 2rem;
  }
}
.el-image {
  margin-right: 16px;
  border-radius: 100%;
}
.el-space {
  &--bottom-tiny {
    margin-bottom: 8px;
  }
  &--bottom-small {
    margin-bottom: 16px;
  }
  &--right-bottom-small {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  &--rigth-small {
    margin-right: 16px;
  }
  &--rigth-medium {
    margin-right: 24px;
  }
}
.project-create {
  &__label {
    display: flex;
  }
}
</style>
