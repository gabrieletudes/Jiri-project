<template>
  <el-main>
    <h1 class="title title--centered title--bold title--top-spaced">Souhaitez vous organizer un nouveau jury?</h1>
    <!--Starts Jury add step-->
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="Description du jury"></el-step>
      <el-step title="Projets du jury"></el-step>
      <el-step title="Etudiants participants"></el-step>
      <el-step title="Membres participants"></el-step>
    </el-steps>
    <component v-if="active < 4" :is="currentComponent" :newJury="newJury" :academicYears="academicYears" :formInline="formInline"></component>
    <p v-else class="el-icon-circle-check-outline">Le jury a etait crée</p>
    <el-button-group class="el-button-group--margin-top-small">
      <el-button v-if="active > 0 && active < 3" type="primary" icon="el-icon-arrow-left" @click="previous">{{buttontitle.titles[active-1]}}</el-button>
      <el-button v-if="active < 3" type="primary" @click="next">{{buttontitle.titles[active+1]}}<i class="el-icon-arrow-right el-icon-right"></i></el-button>
      <el-button v-if="active === 3" type="primary" @click="createEvent">{{buttontitle.titles[active+1]}}</el-button>
    </el-button-group>
    <!--End Jury add step-->
    <div v-show="active == 0">
    <h2>Les jurys en cours ou a venir</h2>
    <el-row type="flex" :gutter="20">
      <el-col :span="8" class="el-col--max-small" v-for="singleevent in juryevents" :key="singleevent.id">
        <div class="grid-content box box--light box--space-small shadow--hover">
          <h3><router-link :to="{ name: 'singleJury', params: { juryId: singleevent.id}}" class="grid-content el-col__link">{{singleevent.courseName}}</router-link></h3>
          <p class="jury-info">
            <span class="jury-info__date">
              <b>date:</b> {{eventDateStrings(singleevent.start)}}
            </span>
            <span class="jury-info__time">
              <b>heure:</b> {{eventHourString(singleevent.start)}}
            </span>
          </p>
          <ul class="jury-extra">
            <li class="jury-extra__item">
              {{singleevent.students.length}} étudiants
            </li>
            <li class="jury-extra__item">
              {{singleevent.jurys.length}} membres
            </li>
            <li class="jury-extra__item">
              {{singleevent.projects.length}} projets
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    </div>
  </el-main>
</template>
<script>
import { QUERY_ALL_STUDENTS } from '../querys/AllStudents.gql'
import { QUERY_ALL_USERS } from '../querys/Users.gql'
import { QUERY_ALL_PROJECTS } from '../querys/Projects.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      academicYear:'2017 - 2018 testing',
      juryname:'This is the test title',
      softDelete:false,
      thestudentId:null,
      thememberId:null,
      theproject:{
        id:null,
        weight: null
      },
      eventstudents:[],
      eventmembers:[],
      eventprojects:{
        ids:[],
        weights:[]
      },
      students:{},
      members:{},
      projects:{}
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
    members: {
      // gql query
      query: QUERY_ALL_USERS,
      update(data){
        return data.allUsers
      }
    },
    projects: {
      // gql query
      query: QUERY_ALL_PROJECTS,
      update(data){
        return data.allProjects
      }
    }
  },
  methods:{
    addProjectToArray(){
      //checks if the memeber is not in the temporary array
      if(!this.eventprojects.ids.includes(this.theproject.id)){
        console.log('The project is not added yet')
        console.log(this.eventprojects);
        //push the member if it is not in the array
        this.eventprojects.ids.push(this.theproject.id)
        this.eventprojects.weights.push(this.theproject.weight)
      }else{
        console.log('The project is already here')
      }
    },
    addStudentToArray(){
      //checks if the student is not in the temporary array
      if(!this.eventstudents.includes(this.thestudentId)){
        console.log('The student is not added yet')
        //push the student if it is not in the array
        this.eventstudents.push(this.thestudentId)
      }else{
        console.log('The student is already here')
      }
    },addMemberToArray(){
      //checks if the memeber is not in the temporary array
      if(!this.eventmembers.includes(this.thememberId)){
        console.log('The member is not added yet')
        //push the member if it is not in the array
        this.eventmembers.push(this.thememberId)
      }else{
        console.log('The member is already here')
      }
    },removeElementFromArray(target,element){
      //stocks the index of the element that is in the target array
      let theelementindex = target.indexOf(element);
      //checks if the element exists in the target array
      if(target.includes(element)){
        //removes the element from the target array
        target.splice(theelementindex, 1)
      }else{
        console.log('The ' + target + ' is not in the array')
      }
    },removeProjectFromArray(target,element){
      //stocks the index of the element that is in the target array
      let theelementindex = target.ids.indexOf(element);
      //checks if the element exists in the target array
      if(target.ids.includes(element)){
        //removes the element from the target array
        target.ids.splice(theelementindex, 1)
        target.scores.splice(theelementindex, 1)
      }else{
        console.log('The ' + target + ' is not in the array')
      }
    },createEvent(){
      let evenement = {
        academicYear: this.academicYear,
        courseName: this.juryname,
        softDelete: this.softDelete,
        authorId: this.$store.state.theuserId,
        jurysIds: this.eventmembers,
        studentsIds: this.eventstudents,
        //only for the implementation
        projectsIds: this.eventprojects.ids,
        weights: this.eventprojects.weights
      }
      EventBus.$emit('createEvent',evenement);
    }
  }
}
</script>
<style lang="scss" scooped>
.input-width {
  width: 4rem;
}
.box-style{
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.is-half {
  width: 50%;
}
</style>
