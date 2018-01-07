<template>
  <div>
      <b-field label="Email">
      <b-input type="email"
              v-model="email"
              placeholder="johndoe@email.com"
              >
          </b-input>
      </b-field>
      <b-field label="Password">
            <b-input
            v-model="password"
            placeholder="">
            </b-input>
        </b-field>
        <button type="button" @click="authenticateUser" class="button is-primary">Se connecter</button>
  </div>
</template>
<script>
import EventBus from '../event-bus'
export default {
  name: 'AppLogin',
  data () {
    return {
      email: null,
      password: null,
      login: true,
    }
  },
  methods: {
    authenticateUser(){
      let {email, password} = this;
      console.log(this.email + ' ' + this.password)
      EventBus.$emit('authenticateUser',{email, password});
      this.email = '';
      this.password = '';
    },
  }
}
</script>
