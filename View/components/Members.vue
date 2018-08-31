<template>
  <el-main>
    <h1 class="title title--bold title--top-spaced">Membres</h1>
    <!--START add member form-->
    <div>
      <h2>Ajouter un nouveau membre</h2>
      <el-row type="flex" justify="start" align="bottom" class="box box--light el-row--max-big box--space">
        <el-col :xs="24" :sm="14" :md="5" class="member-create el-space--rigth-small">
          <label for="membername" class="el-space--bottom-tiny member-create__label">Nom</label>
          <el-input v-model="newmember.name" id="membername"></el-input>
        </el-col>
        <el-col :xs="24" :sm="14" :md="6" class="member-create el-space--rigth-small">
          <label for="memberemail" class="el-space--bottom-tiny member-create__label">Email</label>
          <el-input v-model="newmember.email" id="memberemail" type="email"></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :md="4">
          <el-button type="primary" @click="createUser">Ajouter le membre</el-button>
        </el-col>
      </el-row>
    </div>
    <!--END add member form-->
    <div>
      <h2>Tout les membres</h2>
      <el-row class="el-row--max-big">
        <el-col :xs="24" :sm="14" :md="11" class="el-col--max-small el-col--space-right-bottom-small box box--aligned-center box--light box--space-small shadow--hover" v-for="member in members" :key="member.id">
          <router-link :to="{ name: 'singleMember', params: { memberId: member.id}}" class="el-col__link"><img src="/dist/assets/temp-member.jpg" width="auto" height="96" class="el-image"></router-link>
          <div class="">
            <h3><router-link :to="{ name: 'singleMember', params: { memberId: member.id}}" class="el-col__link">{{member.name}}</router-link></h3>
            <p>{{member.email}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>
<script>
import { CREATE_STUDENT_MUTATION, QUERY_ALL_USERS } from '../querys/Users.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      newmember: {
        name: null,
        email: null,
        password: null,
        isAdmin: false,
        softDelete: false
      },
      members:{},
    }
  },
  apollo: {
    // Query with parameters
    members: {
      // gql query
      query: QUERY_ALL_USERS,
      update(data){
        return data.allUsers
      }
    },
  },
  methods:{
    createUser(){
      let user = {
        name: this.newmember.name,
        email: this.newmember.email,
        password: this.newmember.password,
        isAdmin: this.newmember.isAdmin,
        softDelete: this.newmember.softDelete
      }

      EventBus.$emit('createUser',user);
      this.newmember = {
        name: null,
        email: null,
        password: null,
        isAdmin: false,
        softDelete: false
      }
    },
    decryptPassword(pass){
      return decrypt(pass)
    },
    replaceLink(thelink){
      return thelink.replace(/\s+/g, '-').toLowerCase();
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
  &--bold {
    font-weight: bold;
  }
}
.el-form-item {
  &--bottom {
    vertical-align: bottom;
  }
}
.el-input__inner {
  border-top: 0;
}
.box {
  flex: 1;
  &--light {
    background-color: white;
  }
  &--space {
    padding: 24px 16px;
  }
  &--space-small {
    padding: 16px;
  }
  &--aligned-center {
    display: flex;
    align-items: center;
  }
}
.el-row {
  &--max-big {
    max-width: 1200px;
  }
}
.el-col {
  &--space-right-bottom-small {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  &__link {
    color: inherit;
    text-decoration: none;
  }
}
.jury-extra {
  list-style: none;
  padding-left: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  &__item {
    padding-right: 16px;
  }
}
.el-button-group {
  &--margin-top-small {
    margin-top: 2rem;
  }
}
.el-image {
  margin-right: 16px;
  border-radius: 100%;
}
.shadow--hover {
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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

.member-create {
  &__label {
    display: flex;
  }
}
</style>
