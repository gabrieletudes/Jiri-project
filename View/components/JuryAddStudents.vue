<template>
  <div class="">
  <el-row class="box box--light box--space-small box--small" align="bottom" type="flex">
    <el-col :span="12" class="el--space-right">
      <div class="sub-title sub-title--uppercase">Nom de l’étudiant</div>
    <el-autocomplete popper-class="my-autocomplete" v-model="newstudent.name" :fetch-suggestions="querySearch" placeholder="Please input" @select="handleSelect">
      <template slot-scope="{ item }">
        <div class="value">{{ item.name }}</div>
      </template>
    </el-autocomplete>
  </el-col>
  <el-col :span="11">
    <el-button type="primary" @click="addStudentToArray">Ajouter l’étudiant</el-button>
  </el-col>
</el-row>
<el-row class="el-row--margin-top-medium">
  <el-col :span="9" :xs="12" :sm="12" class="box box--tiny box--light box--space-small el--space-right box--aligned-center" v-for="(student, index) in newJury.students" :key="student.id">
    <div class="el--space-right">
      <div class="sub-title sub-title--uppercase">Nom de l’étudiant</div>
      <p class="el--magin-v-tiny">{{ student.name }}</p>
    </div>
    <div class="">
      <el-button type="danger" v-on:click="removeStudentFromArray(index)" size="mini">Enlever</el-button>
    </div>
  </el-col>
</el-row>
</div>
</template>
<script>
// Import querys
import { QUERY_ALL_STUDENTS } from '../querys/AllStudents.gql'
export default {
  props: ['newJury'],
  name: "juryaddstudents",
  data() {
    return {
      students: [],
      newstudent: {
        id: null,
        name: null,
      }
    }
  },
  apollo: {
    // Query with parameters
    students: {
      // gql query
      query: QUERY_ALL_STUDENTS,
      update(data){
        return data.allStudents
      }
    }
  },
  methods: {
    addStudentToArray() {
      // store if the newstudent name is empty
      let nameempty = this.newstudent.name === '' || this.newstudent.name === null;
      // checks if the newstudent is not in the temporary array
      let isthere = (el) => el.id === this.newstudent.id;
      if (!this.newJury.students.find(isthere) && !nameempty) {
        // push the element to newJury.students if it's not in newJury.students
        this.newJury.students.push(this.newstudent)
        // reset values after pushing the new student
        this.newstudent = {
          id: null,
          name: null
        }
      }
    },
    removeStudentFromArray(element) {
      //checks if the element exists in the target array
      this.newJury.students.splice(element, 1);
    },
    querySearch(queryString, cb) {
      let students = this.students;
      let results = queryString ? students.filter(this.createFilter(queryString)) : students;
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (student) => {
        return (student.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.newstudent.id = item.id;
      this.newstudent.name = item.name;
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
}
</style>
