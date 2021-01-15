<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>Processes</h1>
      </div>
    </div>
    <div class="row">
        <div class="col">
            <button @click="load">Update</button>
        </div>
    </div>
    <div class="row">
        <div class="col-12 project" v-for="process of list" v-bind:key="process.pm_id">
            {{process.pm_id}} {{process.name}} {{process.monit.cpu}}% {{(process.monit.memory / (1024*1024)).toFixed(2)}}MB
            <button @click="restart(process.name)">Restart</button>
            <button @click="stop(process.name)">Stop</button>
        </div>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../components/apiDriver");

export default {
  layout: 'dashboard',
  data(){
    return {
      list: []
    }
  },
  methods: {
    async load(){
      let list = await apiDriver.pm2.list();
      console.log(list)
      this.list = list;
    },
    async restart(pname){
        let restart = await apiDriver.pm2.restart(pname);
        if(!restart) return this.$toast.error("Can't restart "+pname)
        this.$toast.success("Process restarted!");
        this.load();
    },
    async stop(pname){
        let stop = await apiDriver.pm2.stop(pname);
        if(!stop) return this.$toast.error("Can't stop "+pname)
        this.$toast.success("Process stoped!");
        this.load();
    }
  },
    mounted(){
      this.load();
    }
}
</script>

<style lang="stylus" scoped>


</style>
