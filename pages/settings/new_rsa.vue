<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>New RSA Key</h1>
      </div>
    </div>
    <div class="row" v-if='!created'>
        <div class="col">
            Key Name: 
            <input type="text" v-model="name">
            <br>
            Only a-Z characters and - _ symbols.
            <hr>
            Password:
            <input type="text" v-model="password">
            <hr>
            <button @click="create">Create</button>
        </div>
    </div>
    <div class='row' v-else>
        <div class="col">
            Your Public Key is ready!
            <br>
            <br>
            Here is it:
            <div class="key">{{key}}</div>
            <br>
            Just copy and paste it on <a href='https://github.com/settings/keys' target="_blank">GitHub SSH Keys settings</a>.
        </div>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../../components/apiDriver");
const randomWords = require('random-words');
const crypto = require('crypto');

export default {
  layout: 'dashboard',
  data(){
    return {
        created: false,
        name: "",
        password: "",
        key: ""
    }
  },
  methods: {
    async create(){
        let x = await apiDriver.ssh.createKey(this.name, this.password);
        if(!x) return this.$toast.error('Error while generating.');
        this.key = x.publicKey;
        this.$toast.success('Private and Public keys created.');
        this.created = true;
    }
  },
  async mounted(){
      this.name = randomWords({exactly: 2, join: '-'});
      this.password = crypto.randomBytes(32).toString("hex");
  }
}
</script>

<style lang="stylus" scoped>
.key{
    white-space: pre-line;
    font-family: monospace;
    background: #eee;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 11pt;
}

</style>
