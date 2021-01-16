<template>
  <div class="container-fluid" v-if='pm_id!=-1'>
    <div class="row heading">
      <div class="col">
        <h1>PM2 Logs</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <pm2Process :pm_id="Number(pm_id)" :autoRefresh="true"></pm2Process>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Logs</h2>
        <div class="path">{{logs.out.path}}</div>
        <div class="logs">{{logs.out.data}}</div>
      </div>
      <div class="col">
        <h2>Errors</h2>
        <div class="path">{{logs.err.path}}</div>
        <div class="logs">{{logs.err.data}}</div>
      </div>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../../components/apiDriver");
import pm2Process from "../../components/pm2Process";

export default {
  layout: 'dashboard',
  components: {pm2Process},
  data(){
    return {
      scroller: undefined,
      list: [],
      pm_id: -1,
      logs: {
        out: {
          path: "",
          data: ""
        },
        err: {
          path: "",
          data: ""
        },
        lines: 0
      }
    }
  },
  methods: {
    async load(){
      let logs = await apiDriver.pm2.logs(this.pm_id);
      console.log(logs)
      this.logs = logs;
    }
  },
    mounted(){
      this.pm_id = this.$route.params.id;
      this.load();
      this.scroller = setInterval(function(){
        let log_els = document.querySelectorAll(".logs");
        for(let log_el of log_els){
          log_el.scrollTop = log_el.scrollHeight;
        }
      }, 500);
    },
    beforeDestroy(){
      clearInterval(this.scroller);
    }
}
</script>

<style lang="stylus" scoped>
.logs{
  white-space: pre-line;
  font-family: monospace;
  background: #eee;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 11pt;
  max-height: calc(100vh - 250px);
  overflow: hidden;
  overflow-y: scroll;
}
.path{
  color: gray;
  font-size 10pt;
  margin-bottom: 5px;
  font-family: monospace;
}

</style>
