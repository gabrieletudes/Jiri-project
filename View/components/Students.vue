<template>
  <el-main>
    <h1 class="title title--bold title--top-spaced">Étudiants</h1>
    <div>
      <h2>Ajouter un nouveau étudiant</h2>
      <el-row type="flex" justify="start" align="bottom" class="box box--light el-row--max-big box--space">
        <el-col :xs="24" :sm="14" :md="5" class="student-create el-space--rigth-small">
          <label for="studentname" class="el-space--bottom-tiny student-create__label">Nom</label>
          <el-input v-model="student.name" id="studentname"></el-input>
        </el-col>
        <el-col :xs="24" :sm="14" :md="6" class="student-create el-space--rigth-small">
          <label for="studentemail" class="el-space--bottom-tiny student-create__label">Email</label>
          <el-input v-model="student.email" id="studentemail"></el-input>
        </el-col>
        <el-col :span="4" :xs="24" :sm="4" :md="4" class="student-create el-space--rigth-small">
          <label for="studentgroup" class="el-space--bottom-tiny student-create__label">Group</label>
          <el-autocomplete popper-class="my-autocomplete" v-model="formStudent.group" :fetch-suggestions="querySearch" placeholder="Please input" @select="handleSelect" id="studentgroup">
            <template slot-scope="{ item }">
              <div class="value">{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </el-col>
        <el-col :xs="24" :sm="6" :md="4">
          <el-button type="primary" @click="createStudent">Ajouter l’étudiant</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
    <h2>Tout les étudiants</h2>
    <el-row class="el-row--max-big">
      <el-col :xs="24" :sm="14" :md="12" class="el-col--max-small el-space--right-bottom-small box box--aligned-center box--light box--space-small box--small  shadow--hover" v-for="student in students" :key="student.id">
          <router-link :to="{ name: 'singleStudent', params: { studentId: student.id}}" class="el-col__link el-space--rigth-medium">
            <img src="/dist/assets/temp-placeholder.jpg" width="auto" height="96"  class="el-image--profile">
          </router-link>
          <div class="student-info">
            <h3 class="student-info__name">
              <router-link :to="{ name: 'singleStudent', params: { studentId: student.id}}" class="el-col__link">{{student.name}}</router-link>
            </h3>
            <span class="student-info__label">Email</span>
            <p class="student-info__label-content">{{student.email}}</p>
            <span class="student-info__label">Group</span>
            <p class="student-info__label-content">{{student.group.name}}</p>
          </div>
      </el-col>
    </el-row>
  </div>
  </el-main>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import { CREATE_STUDENT_MUTATION, QUERY_ALL_STUDENTS } from '../querys/AllStudents.gql'
import { QUERY_ALL_GROUPS } from '../querys/Groups.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      formStudent:{
        group: null
      },
      student: {
        name: '',
        email: '',
        group: '',
        softDelete: false
      },
      students:{},
      groups:{}
    }
  },
  apollo: {
    // Query with parameters
    students: {
      // gql query
      query: QUERY_ALL_STUDENTS,
      update(data){
        return data.allStudents
      }
    },
    groups: {
      // gql query
      query: QUERY_ALL_GROUPS,
      update(data){
        return data.allGroups
    }
  }
},
  methods:{
    createStudent(){
      let student = {
        name: this.student.name,
        email: this.student.email,
        group: this.student.group,
        softDelete: this.student.softDelete
      }
        EventBus.$emit('createStudent',student);
        this.student.name = null,
        this.student.email = null,
        this.student.group = null,
        this.formStudent.group = null
      },
      querySearch(queryString, cb) {
        let groups = this.groups;
        let results = queryString ? (groups.filter(this.createFilter(queryString))) : groups;
        // call callback function to return suggestions
        cb(results)
      },
      createFilter(queryString) {
        return (group) => {
          return (group.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.student.group = item.id;
        this.formStudent.group = item.name;
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

.el-form-item {
  &--bottom {
    vertical-align: bottom;
  }
}

.el-input__inner {
  border-top: 0;
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
  &--smaller {
    max-width: 380px;
  }
  &--small {
    max-width: 450px;
  }
  &--medium {
    max-width: 500px;
  }
}

.el-row {
  &--max-big {
    max-width: 1200px;
  }
  &--max-bigger {
    max-width: 1308px;
  }
}

.el-col {
  &__link{
    color: inherit;
    text-decoration: none;
  }
}

.el-button-group {
  &--margin-top-small {
    margin-top: 2rem;
  }
}

.el-image {
  &--profile {
    border-radius: 100%;
  }
}

.student-info {
  word-break: break-word;
  &__label {
    font-weight: bold;
    color: #6c7782;
    font-size: 14px;
  }
  &__label-content {
    margin-top: 0;
    margin-bottom: 8px;
    color: #5e646b;
  }
}

.shadow--hover {
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
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

.student-create {
  &__label {
    display: flex;
  }
}
</style>
