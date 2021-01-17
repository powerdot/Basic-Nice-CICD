<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>{{$t('Projects')}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        {{$t('Project_list')}}:
      </div>
    </div>
    <div class="row">
        <div class="col-12 project" v-for="(p,pid) of projects" v-bind:key="pid">
            <h3>{{pid}}</h3>
            <pm2Process v-if="p.info.pm2" :process="p.info.pm2" :autoRefresh="true"></pm2Process>
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
      projects: {}
    }
  },
  methods: {
    
  },
  async mounted(){
      let projects = await apiDriver.project.list();
      console.log(projects)
      this.projects = projects;
  }
}
</script>

<style lang="stylus" scoped>


</style>
