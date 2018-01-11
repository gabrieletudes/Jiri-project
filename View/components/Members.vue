<template>
  <div class="columns is-multiline">
    <div class="column is-4" v-for="member in membres">
      <div class="box">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content is-5">
          <div class="content is-5" :key="member.id">{{member.name}}</div>
          <div class="content is-5">{{member.email}}</div>
          <div class="content is-5">{{decryptPassword(member.password)}}</div>
        </div>
      </div>
    </div>
    <div class="column">
      <label for="name">Nom</label>
      <input v-model="name" type="text" name="name" id="name" placeholder="Marie Du bois">
      <label for="email">Email</label>
      <input v-model="email" type="email" name="email" id="email" placeholder="ex. mariedubois@domain.com">
      <button type="submit" v-on:click="createUser({name,email,softDelete:false})">Ajouter l'etudiant</button>
    </div>
  </div>
</template>
<script>
import { CREATE_STUDENT_MUTATION, QUERY_ALL_USERS } from '../querys/Users.gql'
import { decrypt } from '../crypto'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      name:'',
      email:'',
      password:'',
      softDelete: false,
      membres:{},
    }
  },
  apollo: {
    // Query with parameters
    membres: {
      // gql query
      query: QUERY_ALL_USERS,
      update(data){
        return data.allUsers
        //this.$data.password = decrypt(data.allUsers.password)
      }
    },
  },
  methods:{
    createUser(){
      let user = {
        name: this.name,
        email: this.email,
        softDelete: this.softDelete,
      }
      EventBus.$emit('createUser',user);
      this.name = null,
      this.email = null
    },
    decryptPassword(pass){
      return decrypt(pass)
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
