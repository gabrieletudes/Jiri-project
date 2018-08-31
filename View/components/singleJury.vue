<template>
  <el-main>
    <h1 class="title title--centered title--bold title--top-spaced">{{juryevent.courseName}} {{juryevent.academicYear}}</h1>
    <div>
      <h2>Les etudiants participants</h2>
      <el-row class="el-row--max-big">
        <jury-students-list :students="juryevent.students"></jury-students-list>
      </el-row>
    </div>
    <div>
      <h2>Les membres participants</h2>
      <el-row class="el-row--max-big">
        <members-list :members="juryevent.jurys"></members-list>
      </el-row>
    </div>
    <div>
      <h2>Les projets de ce jury</h2>
      <el-row class="el-row--max-big">
        <projects-list :projects="juryevent.projects"></projects-list>
      </el-row>
    </div>
  </el-main>
</template>
<script>
// Import components
import juryStudentsList from './partials/juryStudentsList.vue'
import MembersList from './partials/MembersList.vue'
import ProjectsList from './partials/ProjectsList.vue'
// Import Querys
import { QUERY_SINGLE_EVENT } from '../querys/Events.gql'
// Import EventBus
import EventBus from '../event-bus'
export default {
  components: {
    'jury-students-list': juryStudentsList,
    'members-list': MembersList,
    'projects-list': ProjectsList
  },
  data(){
    return{
      eventId: this.$route.params.juryId,
      active: 0,
      juryevent:[],
    }
  },
  apollo: {
    // Query with parameters
    juryevent: {
      // gql query
      query: QUERY_SINGLE_EVENT,
      variables() {
        // Use vue reactive properties here
        return {
          eventId: this.eventId,
        }
      },
      update(data){
        return data.Event
      }
    }
  },
  methods:{
    removeElementFromArray(target,element) {
      //stocks the index of the element that is in the target array
      let theelementindex = target.indexOf(element);
      //checks if the element exists in the target array
      if(target.includes(element)){
        //removes the element from the target array
        target.splice(theelementindex, 1)
      }else{
        console.log('The ' + target + ' is not in the array')
      }
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
  &--centered {
    text-align: center;
  }
  &--bold {
    font-weight: bold;
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
</style>
