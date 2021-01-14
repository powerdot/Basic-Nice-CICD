<template>
  <div class="container"></div>
</template>

<script>
let apiDriver = require("../components/apiDriver");

export default {
  async mounted(){
    let settings = await apiDriver.settings.get();
    this.$router.push(settings?'/dashboard':'/login');
  }
}
</script>

<style lang="stylus" scoped>
</style>
