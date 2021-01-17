<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>{{$t('Settings')}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12"><h2>{{$t('System')}}</h2></div>
      <div class="col">
          {{$t('Password')}}: <input type="password" v-model="settings.password">
          <br>
          {{$t('_settings.To_update_password_enter_current')}}: <input type="password" v-model="password.old_password">
          <br>
          {{$t('_settings.And_new_password')}}: <input type="password" v-model="password.new_password">
          <button @click="updatePassword">{{$t('_settings.Update_password')}}</button>
          <hr>
          {{$t('_settings.Projects_dir')}}: <input type="text" disabled v-model="settings.projects_folder">
          <button disabled>{{$t('Update')}}</button>
          <hr>
          {{$t('_settings.Service_port')}}: <input type="text" disabled v-model="settings.port">
          <button disabled>{{$t('Update')}}</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12"><h2>{{$t('RSA_Keys')}}</h2></div>
      <div class="col-12">
        <button @click="newRSA">{{$t('Create_new')}}</button>
      </div>
      <div class="col">
          <div class='rsa_key' v-for="k of rsa_keys" v-bind:key="k">
              <button @click="removeKeys(k)"><i class="bi bi-x"></i></button> {{k}}
          </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12"><h2>{{$t('_settings.Machine_ports')}}</h2></div>
      <div class="col-12">
        {{$t('Data_unavailable')}}.
      </div>
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
            projects_folder: ""
        },
        rsa_keys: [],
        available_ports: []
    }
  },
  methods: {
    async load(){
        let settings = await apiDriver.config.settings.get();
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
