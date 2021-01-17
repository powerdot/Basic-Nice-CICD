<template>
	<div v-if='loaded'>
		{{current.pm_id}} {{current.name}} {{current.monit.cpu}}% {{(current.monit.memory / (1024*1024)).toFixed(2)}}MB
		<span :class="{badge: true, 'badge-secondary':current.pm2_env.status==='stopped', 'badge-danger':current.pm2_env.status==='errored', 'badge-success':current.pm2_env.status==='online'}">{{$t(current.pm2_env.status)}}</span>
		<button @click="start" :disabled="current.monit.memory!=0"><i class="bi bi-play-fill"></i></button>
		<button @click="restart" :disabled="current.monit.memory==0"><i class="bi bi-arrow-clockwise"></i></button>
		<button @click="stop" :disabled="current.monit.memory==0"><i class="bi bi-stop-circle"></i></button>
		<button @click="openLogs">{{$t('Logs')}}</button>
	</div>
</template>

<script>
let apiDriver = require("../components/apiDriver");

export default {
	name: 'pm2Process',
	props: {
		process: {
			type: Object,
			default() {
				return{
					pm_id: -1,
					name: '',
					monit: {
						cpu: 0,
						memory: 0
					}
				}
			}
		},
		autoRefresh: {
			type: Boolean,
			default: false
		},
		pm_id: {
			type: Number,
			default: -1
		}
	},
	data(){
		return {
			timer: undefined,
			current: {},
			loaded: false
		}
	},
	methods: {
	async update(){
		let list = await apiDriver.pm2.list();
		let process = list.find(x=>x.pm_id==this.current.pm_id);
		this.current = Object.assign(this.current, process);
		this.loaded = true;
	},
	async restart(){
		let restart = await apiDriver.pm2.restart(this.current.name);
		if(!restart) return this.$toast.error(this.$t("Cant_restart")+" "+this.current.name)
		this.$toast.success( this.$t("Process_restarted") );
		this.update();
	},
	async stop(){
		let stop = await apiDriver.pm2.stop(this.current.name);
		if(!stop) return this.$toast.error(this.$t("Cant_stop")+" "+this.current.name)
		this.$toast.success( this.$t("Process_stopped") );
		this.update();
	},
	async start(){
		this.restart();
	},
	openLogs(){
		this.$router.push(`/pm2/${this.current.pm_id}`);
	}
  },
	mounted(){
		this.current = Object.assign({}, this.process)
		if(this.pm_id!=-1){
			this.current.pm_id = Number(this.pm_id);
		}
		this.update();
		if(this.autoRefresh){
			this.timer = setInterval(()=>{
				this.update();
			}, 1000);
		}
	},
	destroyed(){
		if(this.autoRefresh){
			clearInterval(this.timer);
		}
	}
}
</script>

<style lang="stylus" scoped>


</style>
