<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>Projects</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        Project list:
      </div>
    </div>
    <div class="row">
        <div class="col-12 project" v-for="(p,pid) of projects" v-bind:key="pid">
            <h3>{{pid}}</h3>
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
