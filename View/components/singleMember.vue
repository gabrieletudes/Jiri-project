<template>
  <el-main>
    <h1 class="title title--bold title--top-spaced">Membre</h1>
    <!--START add member form-->
    <div>
      <el-row class="el-row--max-big">
        <el-col :xs="24" :sm="14" :md="11" class="el-col--max-small el-space-right-bottom-small box box--aligned-center box--light box--space-small">
          <img src="/dist/assets/temp-member.jpg" width="auto" height="96" class="el-image">
          <div class="">
            <h2>{{member.name}}</h2>
            <p>{{member.email}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
    <h2>Les jurys auquel le membre participe</h2>
    <el-row v-if="member.juryEvents.length" class="el-row--max-big">
      <el-col :xs="24" :sm="12" :md="7" class="el-col--max-small el-space--right-bottom-small box box--aligned-center box--light box--space-small box--small shadow--hover" v-for="singleevent in member.juryEvents" :key="singleevent.id">
        <div class="grid-content box box--light">
          <h3><router-link :to="{ name: 'singleJury', params: { juryId: singleevent.id}}" class="el-col__link">{{singleevent.courseName}}</router-link></h3>
          <p class="jury-info">
            <span class="jury-info__date">
              <b>debut:</b> {{eventDateStrings(singleevent.start)}}
            </span>
            <span class="jury-info__time">
              <b>heure:</b> {{eventHourString(singleevent.start)}}
            </span>
          </p>
        </div>
      </el-col>
    </el-row>
    <p v-else>Le membre ne participe à aucun jury</p>
    </div>
  </el-main>
</template>
<script>
import Vue from 'vue';
import { QUERY_SINGLE_USER } from '../querys/Users.gql'
import EventBus from '../event-bus'
export default {
  data(){
    return{
      authorId: this.$store.state.theuserId,
      memberId: this.$route.params.memberId,
      editfield: false,
      newmember:{
      },
      member:{
      }
    }
  },
  apollo: {
    // Query with parameters
    member: {
      // gql query
      query: QUERY_SINGLE_USER,
      variables() {
        // Use vue reactive properties here
        return {
          userId: this.memberId,
          authorId: this.authorId,
        }
      },
      update(data){
        this.$data.newmember.email = data.User['email']
        this.$data.newmember.name = data.User['name']
        return data.User
      }
    },
  },
  methods:{
    updateMember(){
      let member = {
        memberId: this.memberId,
        name: this.newmember.name !== '' ? this.newmember.name : this.member.name,
        email: this.newmember.email !== '' ? this.newmember.email : this.member.email,
        softDelete: this.softDelete,
      }
      EventBus.$emit('updateMember',member);
      this.editfield = '';
    },
    focusField(name){
      this.editfield = name;
    },
    blurField(){
      this.editfield = '';
    },
    showField(name){
      return (this.member[name] == '' || this.editfield == name)
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
.el-image {
  margin-right: 16px;
  border-radius: 100%;
}
.shadow--hover{
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
</style>
