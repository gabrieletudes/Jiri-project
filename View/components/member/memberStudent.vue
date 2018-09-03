<template>
  <el-main>
    <h1 class="title title--bold title--top-spaced">Étudiant</h1>
    <!--START add member form-->
    <div>
      <el-row class="el-row--max-big  box  box--light box--space-small">
        <el-col :xs="24" :sm="24" :md="24" class="el-col--max-small el-col--space-right-bottom-small box--aligned-center">
            <img src="/dist/assets/temp-placeholder.jpg" width="auto" height="96" class="el-image">
            <div class="">
              <h2>{{memberstudent.name}}</h2>
              <p>{{memberstudent.group.name}}</p>
            </div>
        </el-col>
        <h2>Les projets de l'étudiant</h2>
        <el-col :xs="24" :sm="24" :md="24">
          <template>
            <el-tabs v-model="activeName">
              <el-tab-pane :label="implementation.project.name" :name="'project'+index" v-for="(implementation, index ) in memberstudent.implementations" :key="implementation.project.id">
                <div class="student-evaluation">
                  <a v-if="implementation.urlRepo" class="student-evaluation__item el-space--right-small student-evaluation__link" :href="implementation.urlRepo">Repo</a>
                  <a v-if="implementation.urlProject" class="student-evaluation__item el-space--right-small  student-evaluation__link" :href="implementation.urlProject">Lien du projet</a>
                  <p v-else>Pas de liens, encore, enregistre, signale-le, a l'administrateur.</p>
                </div>
                <h2>Cote et commentaire</h2>
                <el-row>
                  <el-col :xs="4" :sm="3" :md="3" v-model="newmeeting[index].scores.implementationId=implementation.id" class="el-space--bottom-small">
                    <label for="score-project">Score</label>
                    <el-input class="student-evaluation__item student-evaluation__score" v-model="newmeeting[index].scores.score">
                      <template slot="append">/20</template>
                    </el-input>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" class="el-space--bottom-small">
                    <label for="score-project">Commentaire</label>
                    <el-input type="textarea" :rows="2" placeholder="Commentaier pour l'etudiant" v-model="newmeeting[index].scores.comment">
                    </el-input>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-row>
                <el-button type="primary" @click="createMeeting">Sauvegarder</el-button>
              </el-row>
            </el-tabs>
          </template>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>
<script>
import Vue from 'vue';
import { QUERY_MEMBER_STUDENT } from '../../querys/AllStudents.gql'
import EventBus from '../../event-bus'
export default {
  name: 'memberStudent',
  data(){
    return{
      activeName: 'project0',
      studentId: this.$route.params.studentId,
      authorId: this.$route.params.memberId,
      eventId: this.$route.params.juryId,
      newmeeting: [{
        softDelete: false,
        scores: {
          softDelete: false,
          comment: null,
          score: null,
          implementationId: null,
        }
      }],
      memberstudent:{
      },
    }
  },
  apollo: {
    // Query with parameters
    memberstudent: {
      // gql query
      query: QUERY_MEMBER_STUDENT,
      variables() {
        // Use vue reactive properties here
        return {
          thestudentId: this.studentId,
          theauthorId: this.authorId
        }
      },
      update(data){
        return data.Student
      }
    }
  },
  watch: {
    memberstudent: function(value){
      let implementationsamount = this.memberstudent.implementations.length
      for( let i = 1; i < implementationsamount; i++ ){
         this.newmeeting.push({
           softDelete: false,
           scores: {
             softDelete: false,
             comment: null,
             score: null,
             implementationId: null,
           }
         });
      }
    }
  },
  methods:{
    createMeeting(){
      let meeting = {
        authorId: this.authorId,
        eventId: this.eventId,
        studentId: this.studentId,
        newmeeting: this.newmeeting
      }
      EventBus.$emit('createMeeting', meeting);
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
  &--space-right-bottom-small{
    margin-right: 16px;
    margin-bottom: 16px;
  }
  &__link{
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
.shadow--hover{
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
}
.el-space {
  &--right-small {
    margin-right: 16px;
  }
}
.student-evaluation {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    &__link {
      color: inherit;
    }
    &__score {
      max-width: 120px;
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
