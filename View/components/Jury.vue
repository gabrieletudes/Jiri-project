<template>
  <div class="container">
    <h1 class="title has-text-centered is-bold">Bonjour Dominique</h1>
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
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { QUERY_ALL_STUDENTS } from '../querys/AllStudents.gql'
export default {
  data(){
    return{
      name: '',
      email: '',
      softDelete: false,
      thestudentId:'',
      eventstudents:[],
      students:{},
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
  },
  methods:{
    addStudentToArray(){
      //checks if the student is not in the temporary array
      if(!this.eventstudents.includes(this.thestudentId)){
        console.log('The student is not added yet')
        //push the student if it is not in the array
        this.eventstudents.push(this.thestudentId)
      }else{
        console.log('The student is already here')
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
