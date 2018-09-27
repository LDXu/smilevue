<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
        :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />

      <div class="register-button">
          <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'
  export default {
    data () {
      return {
        username:'',
        password:'',
        openLoading:false,//登录的loading状态
        usernameErrorMsg:'',//当用户出现错误时出现的错误
        passwordErrorMsg:'',//当密码出现错误
      }
    },
    created(){
      if(localStorage.userInfo){
        Toast.success('您已登录')
        this.$router.push('/')
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },

      loginAction(){
        this.checkForm()&&this.axiosLoginUser();
      },

      axiosLoginUser(){
        this.openLoading=true;
        axios({
          url:url.login,
          method:'post',
          data:{
            userName:this.username,
            passWord:this.password,
          }
        })
        .then((response) => {
          if(response.data.code==200&&response.data.message==true){
            new Promise((resolve, reject) => {
            localStorage.userInfo = {userName:this.username}
            setTimeout(() => {
              resolve()
            }, 500);
            }).then(() => {
              Toast.success(response.data.message);
              this.$router.push('/')
            }).catch(err=>{
              console.log(err);
              Toast.fail('本地状态保存失败');
            });
          }else{
            console.log(response.data.message);
            this.openLoading=false;
            Toast.fail('登录失败');
          }
        })
        .catch((err)=>{
          console.log(err);
          Toast.fail('登录失败');
          this.openLoading=false;
        })
      },
      //表单验证
      checkForm(){
        let isOk = true
        if(this.username.length<5){
          this.usernameErrorMsg="用户名不能小于5位";
          isOk=false;
        }else{
          this.usernameErrorMsg="";
        }
        if(this.password.length<6){
          this.passwordErrorMsg="密码不能小于6位"
          isOk=false;
        }else{
          this.passwordErrorMsg=""
        }
        return isOk;
      }
    }
  }
</script>

<style scoped>
.register-panel{
  width: 96%;
  border-radius: .3125rem;
  margin: 20px auto;
  padding-bottom: 80px;
}
.register-button{
  padding-top: 10px;
}
</style>
