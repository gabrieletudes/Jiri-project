<template>
  <div class="columns is-multiline">
    <div class="column">
      <div class="box">
        <label class="label" for="name">Nom</label>
        <input class="input" v-model="name" type="text" name="name" id="name">
        <label class="label" for="email">EtudiantEmail</label>
        <input class="input" v-model="email" type="email" name="email" id="email">
        <button class="button is-primary"type="submit" v-on:click="createStudent">Ajouter l'etudiant</button>
      </div>
    </div>
    <router-link :to="{name: 'singleStudent', params: {studentId: student.id}}"class="column is-4" :key="student.id" v-for="(student, index, key) in students">
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
    </router-link>
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
    createStudent(){
      let student = {
        name: this.name,
        email: this.email,
        softDelete: this.softDelete,
      }
        EventBus.$emit('createStudent',student);
        this.name = null,
        this.email = null
      }
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
