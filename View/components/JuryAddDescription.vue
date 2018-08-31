<template>
  <el-row type="flex" justify="center" class="box">
    <el-col :span="20" class="jury-create">
      <el-form :inline="true" label-position="top" :model="formInline" class="demo-form-inline">
        <el-form-item label="Nom du jury">
          <el-input v-model="newJury.juryname"></el-input>
        </el-form-item>
        <el-form-item label="Année scolaire">
          <template>
            <el-select v-model="newJury.academicYear" placeholder="Select">
              <el-option v-for="(academicYear, index) in academicYears"
              :key="index"
              :label="academicYear"
              :value="academicYear">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="Début">
        <el-date-picker v-model="newJury.start" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="Select date and time">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>
<script>
export default {
  props: ['newJury', 'academicYears', 'formInline'],
  name: "juryAddDescription"
}
</script>
<style lang="scss" scoped>
</style>
