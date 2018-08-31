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
// Import components
import JuryAddDescription from './JuryAddDescription.vue'
import JuryAddProjects from './JuryAddProjects.vue'
import JuryAddStudents from './JuryAddStudents.vue'
import JuryAddMembers from './JuryAddMembers.vue'
// Import Querys
import { QUERY_FEW_EVENTS } from '../querys/Events.gql'
// Import EventBus
import EventBus from '../event-bus'
export default {
  components: {
    'jury-add-description': JuryAddDescription,
    'jury-add-projects': JuryAddProjects,
    'jury-add-students': JuryAddStudents,
    'jury-add-members': JuryAddMembers
  },
  data(){
    return{
      active: 0,
      buttontitle: {
        titles:[
          'Modifier la description',
          'Choisir les projets de ce jury',
          'Choisir les etudiants de ce jury',
          'Choisir les membres de ce jury',
          'Creer le jury'
        ]
      },
      currentComponent: 'jury-add-description',
      newJury: {
        thememberId: null,
        juryname: null,
        academicYear: null,
        start: null,
        softDelete: false,
        students:[],
        projects:[],
        members:[]
      },
      juryevents:[],
      academicYears: []
    }
  },
  apollo: {
    // Query with parameters
    juryevents: {
      // gql query
      query: QUERY_FEW_EVENTS,
      update(data){
        return data.allEvents
      }
    }
  },
  mounted() {
    //execute createAcademicYears function
    this.createAcademicYears()
  },
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
        academicYear: this.newJury.academicYear,
        courseName: this.newJury.juryname,
        eventStart: this.newJury.start,
        softDelete: this.newJury.softDelete,
        authorId: this.$store.state.theuserId,
        jurysIds: this.newJury.members.map(member => member.id),
        studentsIds: this.newJury.students.map(student => student.id),
        projects: this.newJury.projects
      }
      EventBus.$emit('createEvent',evenement);
    createAcademicYears(){
      let currentDate = new Date()
      let formatedYear = (currentDate.getFullYear() - 1) + " - " + (currentDate.getFullYear())
      this.academicYears.push(formatedYear)
      for (var i = 1; i < 4; i++) {
        let formatedYear = (currentDate.getFullYear() + i-1) + " - " + (currentDate.getFullYear() + i)
        this.academicYears.push(formatedYear)
      }
    },
    next() {
      if (this.active++ > 3) this.active = 1;
      switch (this.active) {
          case 0:
              this.currentComponent = 'jury-add-description';
              break;
          case 1:
              this.currentComponent = 'jury-add-projects';
              break;
          case 2:
              this.currentComponent = 'jury-add-students';
              break;
          case 3:
              this.currentComponent = 'jury-add-members';
      }
    },
    previous() {
      if (this.active-- < 1) this.active = 1;
      switch (this.active) {
          case 0:
              this.currentComponent = 'jury-add-description';
              break;
          case 1:
              this.currentComponent = 'jury-add-projects';
              break;
          case 2:
              this.currentComponent = 'jury-add-students';
              break;
          case 3:
              this.currentComponent = 'jury-add-members';
      }
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
