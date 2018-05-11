<template>
<div>
<transition
      appear
      enter-active-class="animated rollIn"
      leave-active-class="animated zoomOutRight"
      appear-active-class="animated rollIn"
      >
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-alert
    :title="errorTitle"
    v-if="errorTitle"
    type="error"
    :closable="false"
    center
    show-icon>
  </el-alert>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码 <span  style="margin-left: 5px;">一周内有效</span></el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2"
       :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</transition>
</div>
</template>

<script>
import * as api from '@/http/api'
export default {
  data () {
    return {
      logining: false,
      checked: false,
      errorTitle: '',
      ruleForm2: {
        account: '',
        checkPass: '123456'
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { validator: validaePass2 }
        ]
      }
    }
  },
  mounted () {
    this.getCookie()
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 (ev) {
      // let tabs = {'name': 'home', title: '主页面'}
      // this.$store.dispatch('increment', user)
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
              if (this.checked === true) {
                // 传入账号名，密码，和保存天数3个参数
                this.setCookie(this.ruleForm2.account, this.ruleForm2.checkPass, 7, '/', '', true, true)
              }
              this.getCookie();
              console.log('上面的cookid')
              this.logining = true;
              let postData = {
                'userName': this.ruleForm2.account,
                'password': this.ruleForm2.checkPass
              }
              api.requestLogin(postData).then(data => {
                let user = data.data
                if (user.userName !== null) {
                  let obj = {'userName': user.userName, 'password': user.password}
                  this.$store.commit('increment', obj)
                  this.$router.push({name: 'home'})
                } else {
                    this.errorTitle = '用户名或密码错误'
                }
                this.logining = false;
              });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 设置cookie
    setCookie (cname, cpwd, exdays, path, domian, secure, httponly) {
    var exdate = new Date()
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
    // 字符串拼接cookie
    window.document.cookie = 'userName' + '=' + cname + ';path=/;expires=' + exdate.toGMTString()
    window.document.cookie = 'password' + '=' + cpwd + ';path=/;expires=' + exdate.toGMTString()
    },
    // 读取cookie
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')// 这里显示的格式需要切割一下自己可输出看下
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')// 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            this.ruleForm2.account = arr2[1]// 保存到保存数据的地方
          } else if (arr2[0] === 'password') {
            this.ruleForm2.checkPass = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie () {
      this.setCookie("", "", -1);// 修改2值都为空，天数为负1天就好了
    }
  }
}
</script>
<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
