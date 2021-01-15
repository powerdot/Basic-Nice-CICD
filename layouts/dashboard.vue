<template>
  <div class='container-fluid'>
      <div class="row">
          <div class="main-navigation">
            <div class="logo">
                Basic Nice
            </div>
            <div class="signout" @click="signout">
                Exit
            </div>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard" @click.native="updateNav">Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/projects" @click.native="updateNav">Projects</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/pm2" @click.native="updateNav">PM2</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/nginx" @click.native="updateNav">NGINX</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/github" @click.native="updateNav">GitHub</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/settings" @click.native="updateNav">Settings</router-link>
                </li>
            </ul>
          </div>
          <div class="dashboard">
              <Nuxt />
          </div>
      </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data(){
    return {
      
    }
  },
  methods: {
    signout(){
        localStorage.bncicdpassword = '';
        this.$router.push("/login");
    },
    updateNav(){
        let path = document.location.pathname;
        let els = document.querySelectorAll('.main-navigation .nav-item a');
        for(let el of els) el.classList.remove('active');
        let active = document.querySelector('.main-navigation a[href="'+path+'"]');
        active.classList.add('active');
        console.log(active, path)
    }
  },
  mounted(){
      this.updateNav();
  }
}
</script>


<style lang="stylus">
.container-fluid{
    min-height 100vh;
}

.main-navigation{
    width: 300px;
    background: #eee;
    position relative;
    .nav-link{
        display: block;
        padding: .5rem 1rem;
        background: white;
        margin-bottom: 5px;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 4px;
        color: #3f51b5;
        &.active{
            color: white;
            background #3f51b5;
        }
        &.disabled{
            color: #c7c7c7;
            opacity 0.5
            cursor default;
        }
    }
    .logo{
        font-size 20pt;
        text-align center;
        color #4caf50;
        margin 15px 0;
    }
    .signout{
        position absolute;
        top: 10px;
        right: 10px;
        color: red;
        cursor pointer;
    }
}
.dashboard{
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
}

.heading{
    h1{
        text-align center;
        margin 20px 0;
        margin-bottom 50px;
    }
}
</style>