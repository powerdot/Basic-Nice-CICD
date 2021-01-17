<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>{{$t('Dashboard')}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        {{ $t("_dashboard.Your_PM2_Stats") }}
      </div>
      <div class="col-3">
        {{ $t("_dashboard.Your_NGINX_routings") }}
      </div>
      <div class="col-3">
        {{ $t("_dashboard.Your_Projects") }}
      </div>
      <div class="col-3">
        {{ $t("_dashboard.Your_System_Stats") }}
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
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus" scoped>


</style>
