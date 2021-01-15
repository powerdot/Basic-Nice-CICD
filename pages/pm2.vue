<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>Processes</h1>
      </div>
    </div>
    <div class="row">
        <div class="col">
            <button @click="load">Refresh</button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <pm2Process v-for="process of list" v-bind:key="process.pm_id" :process="process"></pm2Process>
        </div>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../components/apiDriver");
import pm2Process from "../components/pm2Process"

export default {
  layout: 'dashboard',
  components: {pm2Process},
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
    }
  },
    mounted(){
      this.load();
    }
}
</script>

<style lang="stylus" scoped>


</style>
