<template>
    <el-row type="flex" class="row-bg login" justify="center">
      <el-col :xs="23" :sm="19" :md="14" :lg="12" :xl="8"  class="login__form-wrapper">
        <el-form style="background-color:white;" label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="login__form">
          <el-form-item>
            <h1>Accedez</h1>
          </el-form-item>
            <el-form-item prop="email" label="Email" :rules="rules.email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <div class="button-group">
            <el-button type="primary" @click="submitForm('ruleForm')">Acceder</el-button>
            <el-button>Acceder en tant qu'admin</el-button>
            <el-button>Mot de passe oublié</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
</template>
<script>
import EventBus from '../event-bus'
export default {
  name: 'AppLogin',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '' || value === null ) {
        callback(new Error('Le champ password est requis'));
      } else {
        callback();
      }
    };
    return {
      login: true,
      ruleForm: {
        email: null,
        pass: null
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Le champ email est requis',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Le adresse email n’est pas valide',
            trigger: ['blur', 'change']
          }
        ],
        pass: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {email, pass} = this.ruleForm;
          console.log(email + ' ' + pass)
          EventBus.$emit('authenticateUser',{email, pass});
          console.log(email + ' ' + pass)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  &__form-wrapper {
    margin-top: 6.25rem;
    max-width: 37.5rem;
  }
  &__form {
    padding: 2rem;
  }
}
.el-main {
  background-color: purple;
}
.el-row {
  margin-bottom: 1.25rem;
  height: 100%;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 0.25rem;
  min-height: 2.25rem;
}
.button-group {
  margin-top: 2.25rem;
}
</style>
