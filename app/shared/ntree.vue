<template>
	<div class='tree-node-holder'>
		<div class='tree-node' v-bind:class='computedNodeClass'  v-on:click.stop='openChild'>
			<span class='tree-node-text'>{{node.name}}</span>
			<ntree v-for='childNode in node.nodes' :node='childNode' v-if='node.open'></ntree>
		</div>
	</div>
</template>

<script>
var appModel = require('../app.model.js');
module.exports = {
	name: 'ntree',
	data: function() {
		return {
			appModel: appModel
		}
	},
	props: {
		'node': Object
	},
	computed: {
		computedNodeClass: function() {
			if(this.$data.appModel.treeNodeSelected === this.node.name){
				return this.$data.node.nodeClass + ' tree-node-selected';
			}else{
				return this.$data.node.nodeClass;
			}
		}
	},
	methods:{
		openChild: function(){
			if(!this.node.forceOpen){
				this.$data.node.open = !this.node.open;
			}
			if(this.node.selectable){
				this.$data.appModel.treeNodeSelected = this.node.name;

			}
			if(this.node.fnc){
				// call defined click method
				this.node.fnc();
			}
		}
	},
	ready: function(){
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