<template>
	<div class='tree-node-holder'>
		<div class='tree-node' v-bind:class='node.nodeClass' v-on:click='openChild'>
			{{node.name}}
		</div>
		<ntree v-for='childNode in node.nodes' :node='childNode' v-if='node.open'></ntree>
	</div>
</template>

<script>
module.exports = {
	name: 'ntree',
	props: {
		'node': Object
	},
	methods:{
		openChild: function(){
			if(!this.node.forceOpen){
				this.$data.node.open = !this.node.open;
			}
			if(this.node.selectable){
				this.$dispatch('tree-node-init');
				this.$data.node.nodeClass += ' tree-node-selected';
			}
			if(this.node.fnc){
				// call defined click method
				this.node.fnc();
			}
		}
	},
	ready: function(){
		this.$el.querySelector('.tree-node').classList.remove('tree-node-selected');
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.tree-node.tree-node-selected {
	color: $basic-blue;
}

</style>