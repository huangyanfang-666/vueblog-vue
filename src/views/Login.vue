<template>
  <div>
    <el-container>
      <el-header><img class="mlogo" src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png"></el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: 'markerhub',
          password: '111111',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到15个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //_this是vue项目中的地址
            const _this=this
            //this是请求里面的地址
           this.$axios.post('/login',this.ruleForm).then(res=>{
             //输出请求头里面的数据
             console.log(res.headers)
             console.log(res)

             const jwt=res.headers['authorizatin']
             const userInfo=res.data.data
             console.log(userInfo)
             //将数据提交
             _this.$store.commit("SET_TOKEN",jwt)
             _this.$store.commit("SET_USERINFO",userInfo)
            //页面跳转
             _this.$router.push("/blog")
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .mlogo{
    height: 60%;
    margin-top: 10px;
  }
  .demo-ruleForm{
    max-width: 500px;
    margin: 0 auto;
  }
</style>
