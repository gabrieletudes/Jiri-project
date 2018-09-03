<template>
  <el-row class="el-row--max-big">
    <el-col :xs="24" :sm="14" :md="12" class="el-col--max-small el-space--right-bottom-small box box--aligned-center box--light box--space-small box--small shadow--hover" v-for="student in students" :key="student.id">
        <router-link @click="createMeeting(student.id)" :to="{ name: 'memberStudent', params: { studentId: student.id}}" class="el-col__link el-space--rigth-medium">
          <img src="/dist/assets/temp-placeholder.jpg" width="auto" height="96"  class="el-image--profile">
        </router-link>
            <h2 @click="createMeeting(student.id)">Click me</h2>
        <div class="student-info">
          <h3 class="student-info__name">
            <router-link @click="createMeeting(student.id)" :to="{ name: 'memberStudent', params: { studentId: student.id}}" class="el-col__link">{{student.name}}</router-link>
          </h3>
          <span class="student-info__label">Group</span>
          <p class="student-info__label-content">{{student.group.name}}</p>
        </div>
    </el-col>
  </el-row>
</template>
<script>
import EventBus from '../../../event-bus'
export default {
  props: ['students'],
  name: 'jury-students-list',
  data(){
    return{
      edit: false,
      authorId: this.$route.params.memberId,
      eventId: this.$route.params.juryId,
      studentId: null,
      meetings: null,
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
  &--smaller {
    max-width: 380px;
  }
  &--small {
    max-width: 450px;
  }
  &--medium {
    max-width: 500px;
  }
}

.el-row {
  &--max-big {
    max-width: 1200px;
  }
  &--max-bigger {
    max-width: 1308px;
  }
}

.el-col {
  &__link{
    color: inherit;
    text-decoration: none;
  }
}

.el-button-group {
  &--margin-top-small {
    margin-top: 2rem;
  }
}

.el-image {
  &--profile {
    border-radius: 100%;
  }
}

.student-info {
  word-break: break-word;
  &__label {
    font-weight: bold;
    color: #6c7782;
    font-size: 14px;
  }
  &__label-content {
    margin-top: 0;
    margin-bottom: 8px;
    color: #5e646b;
  }
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

.student-create {
  &__label {
    display: flex;
  }
}
</style>
