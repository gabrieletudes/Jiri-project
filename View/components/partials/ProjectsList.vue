<template>
  <el-row class="el-row--max-big">
    <el-col :xs="24" :sm="8" :md="6" class="el-col--max-small el-space--right-bottom-small" v-for="project in projects" :key="project.id">
        <div class="project-info box box--light box--space-small">
          <h3>{{project.name}}</h3>
          <span class="project-info__label">Description</span>
          <p class="project-info__label-content">{{project.description}}</p>
        </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ['projects'],
  name: 'projects-list',
  data(){
    return{
      edit: false,
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

.el-image {
  &--profile {
    border-radius: 100%;
  }
}

.project-info {
  word-break: break-word;
  &__label {
    font-weight: bold;
    color: #6c7782;
    font-size: 14px;
  }
  &__label-content {
    margin-top: 0;
    margin-bottom: 8px;
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
</style>
