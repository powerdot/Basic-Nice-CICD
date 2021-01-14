<template>
  <div class="container">
    <div class='form'>
      <Logo />
      <div class="password">
        <span>Password:</span>
        <input type="password" v-model="password" @keypress="keypress" placeholder="Enter password">
      </div>
      <div class="button_holders">
        <button class='login' :disabled='password.length===0' @click="login">Sign in</button>
      </div>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../components/apiDriver");

export default {
  data(){
    return{
      password: ""
    }
  },
  methods: {
    async login(){
      if(!this.password) return;
      console.log("login");
      localStorage.bncicdpassword = this.password;
      let settings = await apiDriver.settings.get();
      if(settings){
        this.$router.push("/dashboard");
      }else{
        localStorage.bncicdpassword = '';
        this.$toast.error('Wrong password.')
      }
    },
    keypress(e){
      if(e.keyCode === 13) return this.login();
    }
  },
  async mounted(){
    let settings = await apiDriver.settings.get();
    this.$router.push(settings?'/dashboard':'/login');
  }
}
</script>

<style lang="stylus" scoped>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.password{
  margin-top: 50px;
  span{
    color: gray;
  }
  input{
    padding 5px 10px;
    margin-left 10px;
    border none;
    box-shadow 0px 2px 10px rgba(0,0,0,.1);
  }
}

.button_holders{
  margin-top 20px;
  text-align center;

  .login{
    background: linear-gradient(-7deg, #fcc101, #f94000);
    width: 85%;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size 12pt;
    outline none;
    &:disabled{
      cursor default;
      background: linear-gradient(-7deg, #eef1f8, #d3dceb);
    }
    &:active{
      background: linear-gradient(-7deg, #fcc101, #ff0000);
    }
  }
}
</style>
