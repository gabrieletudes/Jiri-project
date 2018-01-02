<template>
  <div class="column is-12">
    <div class="box columns">
      <div class="field column">
        <label for="name" class="label">Nom de l’etudiant</label>
        <div class="control">
          <span v-show="!showField('name')" @dblclick="focusField('name')" class="title is-5">{{student.name}}</span>
          <input v-show="showField('name')" @focus="focusField('name')" @blur="blurField" id="name" class="input" @keyup.enter="updateStudent" type="text" v-model.lazy="newstudent.name"  placeholder="Text input">
        </div>
      </div>
      <div class="field column">
        <label for="email" class="label">Email</label>
        <div class="control">
          <span v-show="!showField('email')" @dblclick="focusField('email')" class="subtitle">{{student.email}}</span>
          <input v-show="showField('email')" @focus="focusField('email')" @blur="blurField" id="email" class="input" @keyup.enter="updateStudent" type="text" v-model.lazy="newstudent.email"  placeholder="Text input">
        </div>
      </div>
    </div>
    <!--END student info-->
    <h3 class="title is-6 has-text-weight-normal">Ajouter un nouveau projet</h3>
    <div class="column is-6">
      <div class="box columns is-multiline is-6">
        <div class="column control is-4">
          <label for="projecttitle" class="label">Nom du projet</label>
          <input id="projecttitle" class="input" type="text" v-model.lazy="newproject.title"  placeholder="Text input">
        </div>
        <div class="column control is-4">
          <label for="projecttitle" class="label">Ponderation</label>
          <input id="projecttitle" class="input" type="text" v-model.lazy="newproject.pond"  placeholder="Text input">
        </div>
        <div class="column control is-3">
          <button type="button" class="button is-primary" name="button">Ajouter le projet</button>
        </div>
        <div class="column control is-12">
          <label for="projecttitle" class="label">Lien vers le projet</label>
          <input id="projecttitle" class="input" type="text" v-model.lazy="newproject.linklive"  placeholder="Text input">
        </div>
        <div class="column control is-12">
          <label for="projecttitle" class="label">Lien vers le repo</label>
          <input id="projecttitle" class="input" type="text" v-model.lazy="newproject.linkrepo"  placeholder="Text input">
        </div>
      </div>
    </div>
    <!--END add project for student-->
    <h3 class="title is-6 has-text-weight-normal">Les projets que cet étudiant doit presenter </h3>
    <div class="columns is-12">
      <div class="column is-6">
      <div class="box columns is-multiline">
        <div class="field column is-3">
          <label for="projectname" class="label has-text-weight-normal">Nom du projet</label>
          <span v-show="!showField('projectname')" @dblclick="focusField('projectname')" class="title is-5">CV</span>
          <input v-show="showField('projectname')" @focus="focusField('projectname')" @blur="blurField" id="projectname" class="input" @keyup.enter="updateProject" type="text"  placeholder="Text input">
        </div>
        <div class="field column is-3">
          <label for="projectpond" class="label has-text-weight-normal">Ponderation</label>
          <span v-show="!showField('projectpond')" @dblclick="focusField('projectpond')" class="title is-5">20/100</span>
          <input v-show="showField('projectpond')" @focus="focusField('projectpond')" @blur="blurField" id="projectpond" class="input" @keyup.enter="updateProject" type="text"  placeholder="Text input">
        </div>
        <div class="field column is-3">
          <button type="button" class="button is-primary" name="button">Supprimer</button>
        </div>
        <div class="field column is-12">
          <label for="projectlink" class="label has-text-weight-normal">Lien vers le projet</label>
          <p v-show="!showField('projectlink')" @dblclick="focusField('projectlink')" class="title is-5">{{project.linklive}}</p>
          <input v-show="showField('projectlink')" @focus="focusField('projectlink')" @blur="blurField" id="projectlink" class="input" @keyup.enter="updateProject" type="text"  placeholder="Text input">
        </div>
        <div class="field column is-12">
          <label for="projectgithub" class="label has-text-weight-normal">Lien vers le repo</label>
          <p v-show="!showField('projectgithub')" @dblclick="focusField('projectgithub')" class="title is-5">{{project.linkrepo}}</p>
          <input v-show="showField('projectgithub')" @focus="focusField('projectgithub')" @blur="blurField" id="projectgithub" class="input" @keyup.enter="updateProject" type="text"  placeholder="Text input">
        </div>
      </div>
      </div>
    </div>
    <!--END student projects-->
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import Vue from 'vue';
import { QUERY_SINGLE_STUDENT, CREATE_STUDENT_MUTATION} from '../querys/AllStudents.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
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
      project:{
        linklive:"http://example.com/",
        linkrepo:"http://example.com/"
      }
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
        }
      },
      update(data){
        this.$data.newstudent.email = data.Student['email']
        this.$data.newstudent.name = data.Student['name']
        console.log(this.$data)
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
