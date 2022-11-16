<template>
  <div class="hello">
    <div class="header">
      <span class="login-title"><img src="../assets/logo.png" class="header-logo" />望云
      </span>
      <div class="header-end">
        <h3 class="header-item">关于望云</h3>
        <h3 class="header-login" @click="toggleLoginShow" v-show="!loginYet">登 陆</h3>
        <h3 class="header-login" @click="loginOut" v-show="loginYet">退 出</h3>
      </div>
    </div>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <div class="content">
      <h1>凭栏而望 云载梦想</h1>
      <el-button plain class="login-btn" @click="toggleLoginShow" v-show="!loginYet">登 陆</el-button>
      <el-button plain class="login-btn" @click="toggleLoginShow2" v-show="loginYet">进入主页</el-button>
      <h2>记录转瞬即逝的灵感火花</h2>
      <li>
        <a href="https://vuejs.org" target="_blank">
          Core Docs
        </a>
      </li>
    </div>
    <div class="login-form" v-show="loginShow">
      <img src="../assets/close.svg" class="close-icon" @click="toggleLoginShow" />
      <div class="login-logo">
        <img src="../assets/logo.png" />
        <span class="login-title">望云</span>
      </div>
      <el-input v-model="acc" placeholder="账户名/邮箱" class="input1"></el-input>
      <el-input placeholder="密码" v-model="psw" show-password class="input1"></el-input>
      <el-button plain class="login-btn2" @click="loginNow">立即登录</el-button>
      <h3 type="text" class="forget-btn">忘记密码</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      acc: '',
      psw: '',
      loginShow: false, // 默认不显示登录框
      loginYet: localStorage.getItem('userID') && localStorage.getItem('userID') !== '' // 登陆状态
    }
  },
  methods: {
    toggleLoginShow () {
      this.loginShow = !this.loginShow
    },
    toggleLoginShow2 () {
      this.$router.push({ name: 'home' })
    },
    loginNow () {
      let that = this
      let data = qs.stringify({'account': this.acc, 'psw': this.psw})
      axios.post('http://localhost:22222/login', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            that.loginYet = true
            localStorage.setItem('userID', res.data.token)
            that.$router.push({ name: 'home' })
          } else {
            alert(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginOut () {
      let that = this
      axios.post('http://localhost:22222/loginout', null, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            that.loginYet = false
            localStorage.setItem('userID', '')
            alert('退出成功')
          } else {
            alert(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    console.log(this.loginYet)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 3rem;
  color: aliceblue;
}

h2 {
  font-weight: normal;
  font-size: 1.2rem;
}

h3 {
  font-weight: 400;
  font-size: 0.6rem;
}

h4 {
  font-weight: 350;
  font-size: 1.4rem;
  color: aliceblue;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #9ae3c2;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  margin-left: 20px;
  margin-right: 20px;
}

.header-item {
  margin-right: 20px;
}

.header-login {
  border: 1px solid rgb(107, 187, 241);
  border-radius: 12px;
  padding: 3px 8px;
  color: aliceblue;
  background-color: #42b983;
  margin-right: 20px;
  cursor: pointer;
}

.header-end {
  display: flex;
  align-items: center;
}

.bg {
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg,
      rgb(159, 231, 123) 50%,
      rgb(47, 169, 251) 50%);
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}

.bg3 {
  animation-duration: 5s;
}

.content {
  box-sizing: border-box;
  left: 50%;
  padding: 10vmin;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
}

.close-icon {
  float: right;
  height: 25px;
  cursor: pointer;
}

.login-logo {
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.login-btn {
  color: white;
  font-weight: 400;
  background-color: #42b983;
  border: #42b983;
}

.login-title {
  color: #fff;
  font-weight: 350;
  font-size: 1.2rem;
  margin-left: 10px;
}

.login-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: rgba(106, 193, 250, 1);
  height: 300px;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 10px 6px 5px rgba(0, 0, 0, 0.5);
}

.input1 {
  width: 80%;
  margin-bottom: 30px;
}

.login-btn2 {
  color: rgb(255, 255, 255);
  font-weight: 400;
  background-color: #0b68b4;
  border: #71acdd;
}

.forget-btn {
  cursor: pointer;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(25%);
  }
}
</style>
