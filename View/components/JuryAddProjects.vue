<template>
  <div class="">
  <el-row class="box box--light box--space-small box--medium" align="bottom" type="flex">
    <el-col :span="8" class="el--space-right">
      <label class="sub-title" for="projectname">Nom du projet</label>
    <el-autocomplete id="projectname" popper-class="my-autocomplete" v-model="newproject.name" :fetch-suggestions="querySearch" placeholder="Please input" @select="handleSelect">
      <template slot-scope="{ item }">
        <div class="value">{{ item.name }}</div>
      </template>
    </el-autocomplete>
  </el-col>
  <el-col :span="8" class="el--space-right">
    <label class="sub-title" for="weight">Ponderation</label>
    <el-input id="weight" type="number" placeholder="Please input" v-model="newproject.weight" :min="0" :max="20">
      <template slot="append">/20</template>
    </el-input>
  </el-col>
  <el-col :span="8">
    <el-button type="primary" @click="addProjectToArray">Ajouter le projet</el-button>
  </el-col>
</el-row>
<el-row :gutter="20" class="el-row--margin-top-medium">
  <el-col :span="8" class="box box--light box--space-small el--space-right box--aligned-center" v-for="(project, index) in newJury.projects" :key="project.id">
    <div class="">
      <div class="sub-title">Nom du projet</div>
      <p class="el--magin-v-tiny">{{project.name}}</p>
    </div>
    <div class="">
      <div class="sub-title">Ponderation</div>
      <p class="el--magin-v-tiny">{{project.weight}} /20</p>
    </div>
    <div class="">
      <el-button type="danger" v-on:click="removeProjectFromArray(index)" size="mini">Enlever</el-button>
    </div>
  </el-col>
</el-row>
</div>
</template>
<script>
// Import querys
import { QUERY_ALL_PROJECTS } from '../querys/Projects.gql'
export default {
  props: ['newJury'],
  name: "juryaddprojects",
  data() {
    return {
      projects: [],
      newproject: {
        id: null,
        name: null,
        weight: null
      }
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
    }
  },
  methods: {
    addProjectToArray() {
      // store if the newproject name or newproject weight is empty
      let nameempty = this.newproject.name === '' || this.newproject.name === null;
      let weightempty = this.newproject.weight === '' || this.newproject.weight === null;
      console.log(weightempty)
      // checks if the newproject is not in the temporary array
      let isthere = (el) => el.id === this.newproject.id;
      if (!this.newJury.projects.find(isthere) && !nameempty && !weightempty) {
        // push the element to newJury.projects if it's not in newJury.projects
        this.newJury.projects.push(this.newproject);
        // reset values after pushing the new project
        this.newproject = {
          id: null,
          name: null,
          weight: null
        }
      }
    },
    removeProjectFromArray(element) {
      //checks if the element exists in the target array
      this.newJury.projects.splice(element, 1)
    },
    querySearch(queryString, cb) {
      let projects = this.projects;
      let results = queryString ? (projects.filter(this.createFilter(queryString))) : projects;
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (project) => {
        return (project.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.newproject.id = item.id;
      this.newproject.name = item.name;
    }
  }
}
</script>
<style lang="scss" scoped>
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
  &--tiny {
    max-width: 265px;
  }
  &--aligned-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &--small {
    max-width: 380px;
  }
  &--medium {
    max-width: 500px;
  }
  &--margin-top-medium {
    margin-top: 32px;
  }
}
.el-row {
  &--margin-top-medium {
    margin-top: 32px;
  }
}
.el-title {
  &--uppercase {
    text-transform: uppercase;
  }
}
.sub-title {
  font-size: 11px;
  font-weight: bold;
  &--uppercase {
    text-transform: uppercase;
  }
}
.el {
  &--space-right {
    margin-right: 16px;
  }
  &--magin-v-tiny {
    margin: 8px 0;
  }
}
</style>
