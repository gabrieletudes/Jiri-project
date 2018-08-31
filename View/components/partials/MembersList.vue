<template>
  <el-row class="el-row--max-big">
    <el-col :xs="24" :sm="14" :md="11" :lg="8" class="el-col--max-small el-col--space-right-bottom-small box box--aligned-center box--light box--space-small shadow--hover" v-for="member in members" :key="member.id">
      <router-link :to="{ name: 'singleMember', params: { memberId: member.id}}" class="el-col__link"><img src="/dist/assets/temp-member.jpg" width="auto" height="96" class="el-image"></router-link>
      <div class="">
        <h3><router-link :to="{ name: 'singleMember', params: { memberId: member.id}}" class="el-col__link">{{member.name}}</router-link></h3>
        <p>{{member.email}}</p>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ['members'],
  name: 'members-list',
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
    max-width: 1208px;
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
.shadow--hover {
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
}
</style>
