<template>
  <div class="">
    <el-row class="box box--light box--space-small box--medium" align="bottom" type="flex">
      <el-col :span="8">
        <div class="sub-title">Nom du membre</div>
        <el-autocomplete popper-class="my-autocomplete" v-model="newmember.name" :fetch-suggestions="querySearch" placeholder="Please input" @select="handleSelect">
          <template slot-scope="{ item }">
            <div class="value">{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="addMemberToArray">Ajouter le membre</el-button>
      </el-col>
    </el-row>
    <el-row class="el-row--margin-top-medium">
      <el-col :span="9" :xs="12" :sm="12" class="box box--tiny box--light box--space-small el--space-right el--space-bottom box--aligned-center" v-for="(member, index) in newJury.members" :key="member.id">
        <div class="el--space-right">
          <div class="sub-title sub-title--uppercase">Nom du membre</div>
          <p class="el--magin-v-tiny">{{ member.name }}</p>
        </div>
        <div class="">
          <el-button type="danger" v-on:click="removeMemberFromArray(index)" size="mini">Enlever</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// Import querys
import { QUERY_ALL_USERS } from '../querys/Users.gql'
export default {
  props: ['newJury'],
  name: "juryaddmembers",
  data() {
    return {
      members: [],
      newmember: {
        id: null,
        name: null,
      }
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
  methods: {
    addMemberToArray() {
      // store if the newmember name is empty
      let nameempty = this.newmember.name === '' || this.newmember.name === null;
      // checks if the newmember is not in the temporary array
      let isthere = (el) => el.id === this.newmember.id
      if (!this.newJury.members.find(isthere) && !nameempty) {
        // push the element to newJury.members if it's not in newJury.members
        this.newJury.members.push(this.newmember)
        // reset values after pushing the new member
        this.newmember = {
          id: null,
          name: null
        }
      }
    },
    removeMemberFromArray(element) {
      //checks if the element exists in the target array
      this.newJury.members.splice(element, 1)
    },
    querySearch(queryString, cb) {
      let members = this.members;
      let results = queryString ? members.filter(this.createFilter(queryString)) : members;
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (member) => {
        return (member.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.newmember.id = item.id;
      this.newmember.name = item.name;
    }
  }
}
</script>
<style lang="scss" scoped>
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
    justify-content: space-between;
  }
  &--tiny {
    max-width: 265px;
  }
  &--small {
    max-width: 380px;
  }
  &--medium {
    max-width: 500px;
  }
  &--margin-top-medium {
    margin-top: 32px;
  }
}
.el-row {
  &--margin-top-medium {
    margin-top: 32px;
  }
}
.el-title {
  &--uppercase {
    text-transform: uppercase;
  }
}
.sub-title {
  font-size: 11px;
  font-weight: bold;
  &--uppercase {
    text-transform: uppercase;
  }
}
.el {
  &--space-right {
    margin-right: 16px;
  }
  &--magin-v-tiny {
    margin: 8px 0;
  }
  &--space-bottom {
    margin-bottom: 16px;
  }
}
</style>
