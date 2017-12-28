<template>
  <div class="columns is-multiline">
    <div class="column">
      <div classs="box">
        <label for="name">Nom</label>
        <input v-model="name" type="text" name="name" id="name">
        <label for="email">EtudiantEmail</label>
        <input v-model="email" type="email" name="email" id="email">
        <button type="submit" v-on:click="createStudent">Ajouter l'etudiant</button>
      </div>
    </div>
    <div class="column is-4" v-for="student in students" >
      <div class="box">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content is-5">
          <div class="content is-5" :key="student.id">{{student.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import { CREATE_STUDENT_MUTATION, QUERY_ALL_STUDENTS } from '../querys/AllStudents.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      name: '',
      email: '',
      softDelete: false,
      students:{}
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
    createStudent(){
      let student = {
        name: this.name,
        email: this.email,
        softDelete: this.softDelete,
      }
        EventBus.$emit('createStudent',student);
        this.name = '',
        this.email = ''
      }
    },
created(){
  // set all students
  //this.$store.dispatch('setAllStudents');
}
}
</script>
<style lang="scss" scoped>
.box-style{
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
</style>
