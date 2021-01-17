<template>
  <div class='container-fluid'>
      <div class="row">
          <div class="main-navigation">
            <div class="logo">
                Basic Nice
            </div>
            <div class="signout" @click="signout">
                <i class="bi bi-box-arrow-right"></i>
            </div>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/dashboard" @click.native="updateNav('/dashboard')">{{ $t('Dashboard') }}</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/projects" @click.native="updateNav('/projects')">{{ $t('Projects') }}</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/pm2" @click.native="updateNav('/pm2')">PM2</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/nginx" @click.native="updateNav('/nginx')">NGINX</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/github" @click.native="updateNav('/github')">GitHub</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link disabled" to="/vnc" @click.native="updateNav('/vnc')">{{ $t('Terminal') }}</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/settings" @click.native="updateNav('/settings')">{{ $t('Settings') }}</NuxtLink>
                </li>
            </ul>
            <div class="langs">
                <button v-for="locale in availableLocales" :key="locale" @click="switchLanguage(locale)">{{ locale }}</button>
            </div>
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
  computed: {
    availableLocales () {
        return this.$i18n.availableLocales;
    }
    },
  data(){
    return {
      
    }
  },
  methods: {
    signout(){
        localStorage.bncicdpassword = '';
        this.$router.push("/login");
    },
    updateNav(path){
        if(!path) path = '/'+document.location.pathname.split('/')[1];
        console.log('path', path)
        let els = document.querySelectorAll('.main-navigation .nav-item a');
        for(let el of els) el.classList.remove('active');
        let active = document.querySelector('.main-navigation a[href="'+path+'"]');
        if(active) active.classList.add('active');
    },
    switchLanguage(locale){
        this.$cookies.set("locale", locale, {
            path: "/"
        });
        window.location.reload(true);
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