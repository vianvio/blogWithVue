<template>
	<div>
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
				this.$set('node.open', !this.node.open);
			}
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.tree-node {
	border-bottom: 1px solid $shadow-dark;
	padding: 1rem 1rem;
	line-height: 2rem;
	overflow: hidden;
}
</style>