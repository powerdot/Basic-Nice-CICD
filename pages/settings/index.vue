<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>Settings</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12"><h2>System</h2></div>
      <div class="col">
          Password: <input type="password" v-model="settings.password">
          <br>
          To update your password, Enter current password: <input type="password" v-model="password.old_password">
          <br>
          And new password: <input type="password" v-model="password.new_password">
          <button @click="updatePassword">Update password</button>
          <hr>
          Projects directory: <input type="text" v-model="settings.projects_folder">
          <hr>
          Service port: <input type="text" v-model="settings.port">
          <hr>
          Github webhook port: <input type="text" v-model="settings.webhook_port">
      </div>
    </div>
    <div class="row">
      <div class="col-12"><h2>RSA Keys</h2></div>
      <div class="col-12">
        <button @click="newRSA">Create new</button>
      </div>
      <div class="col">
          <div class='rsa_key' v-for="k of rsa_keys" v-bind:key="k">
              <button @click="removeKeys(k)"><i class="bi bi-x"></i></button> {{k}}
          </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12"><h2>Ports</h2></div>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../../components/apiDriver");

export default {
  layout: 'dashboard',
  data(){
    return {
        loaded: false,
        password: {
            old_password: '',
            new_password: ''
        },
        settings: {
            password: "",
            port: "",
            webhook_port: "",
            projects_folder: ""
        },
        rsa_keys: [],
        available_ports: []
    }
  },
  methods: {
    async load(){
        let settings = await apiDriver.config.settings.get();
        console.log(settings);
        this.settings = settings;

        let rsa_keys = await apiDriver.ssh.keys();
        this.rsa_keys = rsa_keys;

        this.loaded = true;
    },
    async updatePassword(){
        let a = await apiDriver.config.settings.updatePassword(this.password.old_password, this.password.new_password);
        if(!a){
            this.$toast.error('Cant update the password.')
            return;
        }
        this.$toast.success('Password updated.');
        localStorage.bncicdpassword = this.password.new_password;
        this.password.old_password = "";
        this.password.new_password = "";
        this.load();
    },
    newRSA(){
      this.$router.push('/settings/new_rsa');
    },
    async removeKeys(name){
      let a = await apiDriver.ssh.removeKeys(name);
        if(!a){
            this.$toast.error('Cant remove the key')
            return;
        }
        this.$toast.success('Key removed!');
        this.load();
    }
  },
  async mounted(){
      this.load();
  }
}
</script>

<style lang="stylus" scoped>


</style>
