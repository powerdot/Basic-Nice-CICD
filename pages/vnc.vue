<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>VNC</h1>
      </div>
    </div>
    <div class="row">
        <canvas height="600" width="600"></canvas>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../components/apiDriver");
let svnc = {
    Client: require('simplevnc/client/Client'),
    Screen: require('simplevnc/client/Screen')
};


export default {
  layout: 'dashboard',
  components: {},
  data(){
    return {
      projects: {}
    }
  },
  methods: {
    
  },
  async mounted(){
      var canvas = document.getElementsByTagName('canvas')[0],
        screen = new svnc.Screen(canvas),
        client = new svnc.Client(screen);
    
    client.connect({
        host: document.location.hostname,
        port: document.location.port||"80",
        password: '995564'
    }).then(function(){
        console.log('hooray')
    })
  }
}
</script>

<style lang="stylus" scoped>


</style>
