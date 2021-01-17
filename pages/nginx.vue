<template>
  <div class="container-fluid">
    <div class="row heading">
      <div class="col">
        <h1>
            NGINX
            <span class="badge badge-success" v-if='status.active'>{{$t('Working')}}</span>
            <span class="badge badge-secondary" v-if='!status.active'>{{$t('Stopped')}}</span>
        </h1>
      </div>
    </div>
    <div class="row mb-2">
        <div class="col">
            <button class="btn btn-success" @click="save" :disabled='!changed'><i class="bi bi-cloud-arrow-up"></i> {{$t('Save')}}</button>
        </div>
        <div class="col text-right">
            <button :disabled='status.active' class="btn btn-success" @click="start"><i class="bi bi-play-fill"></i> {{$t('Start')}}</button>
            <button :disabled='!status.active' class="btn btn-warning" @click="restart"><i class="bi bi-arrow-repeat"></i> {{$t('Restart')}}</button>
            <button :disabled='!status.active' class="btn btn-danger" @click="stop"><i class="bi bi-stop-fill"></i> {{$t('Stop')}}</button>
        </div>
    </div>
    <div class='row'>
        <div class="col-12" style='height: calc(100vh - 200px)'>
            <MonacoEditor
            height="100%"
            theme="vs-dark"
            language="javascript"
            :options="options"
            v-model="config"
            @change="onChange"
            ></MonacoEditor>
        </div>
    </div>
  </div>
</template>

<script>
let apiDriver = require("../components/apiDriver");
import MonacoEditor from 'monaco-editor-vue';;

export default {
  layout: 'dashboard',
  components: {MonacoEditor},
  data(){
    return {
      config: "",
      options: {},
      changed: false,
      dontTriggerChanger: true,
      status: {
          active: false,
          list: []
      }
    }
  },
  methods: {
    async load(){
      let status = await apiDriver.nginx.status();
      if(!status) return this.$toast.error('Cant get status.')
      this.status = status;

      let config = await apiDriver.nginx.getConfig();
      if(!config) return this.$toast.error('Cant get configuration.')
      this.config = config.toString();
    },
    async save(){
        let x = await apiDriver.nginx.writeConfg(this.config);
        this.changed = false;
        if(!x) return this.$toast.error('Saving error...');
        return this.$toast.success('Config saved! Dont forget to restart NGINX.');
    },
    onChange(){
        if(this.dontTriggerChanger) return this.dontTriggerChanger = false;
        this.changed = true;
    },
    async start(){
        let x = await apiDriver.nginx.start();
        if(!x) return this.$toast.error('Cant start.');
        await this.load();
        return this.$toast.success('Nginx service started.');
    },
    async restart(){
        let x = await apiDriver.nginx.restart();
        if(!x) return this.$toast.error('Cant restart.');
        await this.load();
        return this.$toast.success('Nginx service restarted.');
    },
    async stop(){
        let x = await apiDriver.nginx.stop();
        if(!x) return this.$toast.error('Cant stop.');
        await this.load();
        return this.$toast.success('Nginx service stopped.');
    }
  },
    mounted(){
      this.load();
    }
}
</script>

<style lang="stylus" scoped>
h1 .badge{
  font-size: 11pt;
  position: relative;
  top: -14px;
}

</style>
