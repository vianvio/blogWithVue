<template>
	<div class='side-bar full-height'>
		<div class='info-holder'>
			<img src="../images/logo.png">
		</div>
		<hr/>
		<ntree :node='treeTest'></ntree>
	</div>
</template>

<script>
var ntree = require('../shared/ntree.vue');

module.exports = {
	name: 'sidebar',
	components:{
		ntree
	},
	data: function(){
		return {
			treeTest: {
				name: '目录',
				forceOpen: true,
				open: true,
				nodeClass: 'root-node',
				nodes: [{
					name: 'test2',
					nodes: [{
						name: 'test2,1',
						nodes: []
					}]
				},
				{
					name: 'test3',
					nodes: []
				}]
			}
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.side-bar {
	position: fixed;
	top: 0;
	left: 0;
	width: $side-width;
	@include box-shadow(2px 0 2px $shadow-dark);
}

.info-holder{ 
	text-align: center;
	img {
		display: inline-block;
		cursor: pointer;
	}
}

.side-bar .root-node{
	font-weight: bold;
	border-bottom: none;
}
</style>