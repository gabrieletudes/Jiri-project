<template>
  <div class="container">
    <h1 class="title has-text-centered is-bold">Bonjour Dominique</h1>
    <!--Starts Student add step-->
    <div class="content">
      <h2>Selectionnez les étudiants participants</h2>
      <div class="field has-addons">
        <div class="select control">
          <select name="studentsforevent" id="studentsforevent" v-model="thestudentId">
            <option :disabled="eventstudents.includes(student.id)" v-for="student in students" :key="student.id" :value="student.id">{{student.name}}</option>
          </select>
        </div>
        <div class="constrol">
          <button type="button" class="button is-primary" @click="addStudentToArray">Ajouter l’étudiant</button>
        </div>
      </div>
    </div>
    <div v-show="students">
      <h2 class="subtitle">Les étudiants à juger</h2>
      <div class="columns is-multiline">
        <div v-show="eventstudents.includes(student.id)" class="column is-4" :key="student.id" v-for="(student, index, key) in students">
          <div class="box column">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content" :key="student.id">{{student.name}}</div>
              </div>
              <div class="media-right">
                <button class="button is-danger" type="button" @click="removeElementFromArray(eventstudents,student.id)">Supprimer</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <!--End Student add step-->
    <!--Start Members add step-->
    <div class="content">
      <h2>Selectionnez les membres participants</h2>
      <div class="field has-addons">
        <div class="select control">
          <select name="membersforevent" id="membersforevent" v-model="thememberId">
            <option :disabled="eventmembers.includes(member.id)" v-for="member in members" :key="member.id" :value="member.id">{{member.name}}</option>
          </select>
        </div>
        <div class="constrol">
          <button type="button" class="button is-primary" @click="addMemberToArray">Ajouter le membre</button>
        </div>
      </div>
    </div>
    <div v-show="members">
      <h2 class="subtitle">Les membres participants</h2>
      <div class="columns is-multiline">
        <div v-show="eventmembers.includes(member.id)" class="column is-4" :key="member.id" v-for="(member, index, key) in members">
          <div class="box column">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content" :key="member.id">{{member.name}}</div>
              </div>
              <div class="media-right">
                <button class="button is-danger" type="button" @click="removeElementFromArray(eventmembers,member.id)">Supprimer</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <!--End Members add step-->
  </div>
</template>
<script>
import { QUERY_ALL_STUDENTS } from '../querys/AllStudents.gql'
import { QUERY_ALL_USERS } from '../querys/Users.gql'
export default {
  data(){
    return{
      thestudentId:'',
      thememberId:'',
      eventstudents:[],
      eventmembers:[],
      students:{},
      members:{},
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
    }
  }
}
</script>
<style lang="scss" >
.box-style{
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.is-half {
  width: 50%;
}
</style>
