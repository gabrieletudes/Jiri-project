<template>
  <el-main>
    <h1 class="title title--bold title--top-spaced">Jurys</h1>
    <div>
      <h2>Les récents et passés jurys</h2>
      <el-row class="el-row--flex el-row--max-big">
        <el-col v-if="juryevents" :span="8" :xs="25" :sm="12" class="el-col--max-small el-col--space-right-bottom-small box box--light box--space-small shadow--hover" v-for="singleevent in juryevents" :key="singleevent.id">
          <h3><router-link :to="{ name: 'singleJury', params: { juryId: singleevent.id}}" class="grid-content el-col__link">{{singleevent.courseName}}</router-link></h3>
          <p class="jury-info">
            <span class="jury-info__date">
              <b>date:</b> {{eventDateStrings(singleevent.start)}}
            </span>
            <span class="jury-info__time">
              <b>heure:</b> {{eventHourString(singleevent.start)}}
            </span>
          </p>
          <ul class="jury-extra">
            <li class="jury-extra__item">
              {{singleevent.students.length}} étudiants
            </li>
            <li class="jury-extra__item">
              {{singleevent.jurys.length}} membres
            </li>
            <li class="jury-extra__item">
              {{singleevent.projects.length}} projets
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>
<script>
// Import Querys
import { QUERY_ALL_EVENTS } from '../querys/Events.gql'
// Import EventBus
import EventBus from '../event-bus'
export default {
  data(){
    return{
      authorId: this.$store.state.theuserId,
      juryevents:[]
    }
  },
  apollo: {
    // Query with parameters
    juryevents: {
      // gql query
      query: QUERY_ALL_EVENTS,
      variables() {
        // Use vue reactive properties here
        return {
          authorId: this.authorId,
        }
      },
      update(data){
        return data.allEvents
      }
    }
  },
  methods:{
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
  &--centered {
    text-align: center;
  }
  &--bold {
    font-weight: bold;
  }
}
.box {
  &--light {
    background-color: white;
  }
  &--space {
    padding: 24px 16px;
  }
  &--space-small {
    padding: 16px;
  }
}
.el-row {
  &--flex {
    display: flex;
    flex-wrap: wrap;
  }
  &--max-big {
    max-width: 1400px;
  }
}
.el-col {
  &--max-small {
    max-width: 302px
  }
  &--space-right-bottom-small {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  &__link {
    color: inherit;
    text-decoration: none;
    display: block;

  }
}
.shadow--hover {
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
</style>
