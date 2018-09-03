<template>
  <el-main>
    <h1 class="title title--bold title--top-spaced">Étudiant</h1>
    <!--START add member form-->
    <div>
      <el-row class="el-row--max-big">
        <el-col :xs="24" :sm="14" :md="11" class="el-col--max-small el-col--space-right-bottom-small box box--aligned-center box--light box--space-small">
          <img src="/dist/assets/temp-placeholder.jpg" width="auto" height="96" class="el-image">
          <div class="">
            <h2>{{student.name}}</h2>
            <p>{{student.email}}</p>
            <p>{{student.group.name}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
    <h2>Les jurys auquel l’étudiant participe</h2>
    <el-row v-if="student.studentEvents.length" type="flex" :gutter="20">
      <el-col :span="8" class="el-col--max-small" v-for="singleevent in student.studentEvents" :key="singleevent.id">
        <div class="grid-content box box--light box--space-small shadow--hover">
          <h3>
            <router-link :to="{ name: 'singleJury', params: { juryId: singleevent.id}}" class="el-col__link">{{singleevent.courseName}}</router-link>
          </h3>
          <p class="jury-info">
            <span class="jury-info__date">
              <b>debut:</b> {{eventDateStrings(singleevent.start)}}
            </span>
            <span class="jury-info__time">
              <b>heure:</b> {{eventHourString(singleevent.start)}}
            </span>
          </p>
        </div>
      </el-col>
    </el-row>
    <p v-else>L’étudiant ne participe à aucun jury</p>
    </div>
  </el-main>
</template>
<script>
import Vue from 'vue';
import { QUERY_SINGLE_STUDENT } from '../querys/AllStudents.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      authorId: this.$store.state.theuserId,
      studentId: this.$route.params.studentId,
      editfield: false,
      newstudent:{
      },
      newproject:{
        title:'',
        linklive:'',
        linkrepo:''
      },
      student:{
      },
    }
  },
  apollo: {
    // Query with parameters
    student: {
      // gql query
      query: QUERY_SINGLE_STUDENT,
      variables() {
        // Use vue reactive properties here
        return {
          studentId: this.studentId,
          authorId: this.authorId
        }
      },
      update(data){
        this.$data.newstudent.email = data.Student['email']
        this.$data.newstudent.name = data.Student['name']
        return data.Student
      }
    },
  },
  methods:{
    updateStudent(){
      let student = {
        studentId: this.studentId,
        name: this.newstudent.name !== '' ? this.newstudent.name : this.student.name,
        email: this.newstudent.email !== '' ? this.newstudent.email : this.student.email,
        softDelete: this.softDelete,
      }
      EventBus.$emit('updateStudent',student);
      this.editfield = '';
    },
    focusField(name){
      this.editfield = name;
    },
    blurField(){
      this.editfield = '';
    },
    showField(name){
      return (this.student[name] == '' || this.editfield == name)
    },
    eventDateStrings(startingtime) {
      let thetime = new Date(startingtime);
      let dateoptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return thetime.toLocaleDateString('fr-FR', dateoptions);
    },
    eventHourString(startingtime){
      let thetime = new Date(startingtime);
      let houroptions = { hour: 'numeric', minute: 'numeric' };
      return thetime.toLocaleTimeString('fr-FR', houroptions);
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
}
.el-row {
  &--max-big {
    max-width: 1200px;
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
.shadow--hover{
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
}
</style>
