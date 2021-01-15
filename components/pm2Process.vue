<template>
	<div>
		{{current.pm_id}} {{current.name}} {{current.monit.cpu}}% {{(current.monit.memory / (1024*1024)).toFixed(2)}}MB
		<button @click="restart">Restart</button>
		<button @click="stop">Stop</button>
	</div>
</template>

<script>
let apiDriver = require("../components/apiDriver");

export default {
	name: 'pm2Process',
	props: {
		process: {
			type: Object,
			default: {
				pm_id: -1,
				name: '',
				monit: {
					cpu: 0,
					memory: 0
				}
			}
		},
		autoRefresh: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			timer: undefined,
			current: Object.assign({}, this.process)
		}
	},
	methods: {
	async update(){
		let list = await apiDriver.pm2.list();
		let process = list.find(x=>x.pm_id==this.current.pm_id);
		this.current = process;
	},
	async restart(){
		let restart = await apiDriver.pm2.restart(this.current.name);
		if(!restart) return this.$toast.error("Can't restart "+this.current.name)
		this.$toast.success("Process restarted!");
		this.update();
	},
	async stop(){
		let stop = await apiDriver.pm2.stop(this.current.name);
		if(!stop) return this.$toast.error("Can't stop "+this.current.name)
		this.$toast.success("Process stoped!");
		this.update();
	}
  },
	mounted(){
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
