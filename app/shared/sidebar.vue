<template>
	<div class='side-bar full-height'>
		<ntree :node='contentTree'></ntree>
	</div>
</template>

<script>
var ntree = require('../shared/ntree.vue');

module.exports = {
	components:{
		ntree
	},
	data: function(){
		return {
			contentTree: {}
		}
	},
	events: {
		'update-tree': function(treeObj){
			this.$data.contentTree = treeObj;
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.side-bar {
	position: fixed;
	top: $nav-height + 1rem;
	left: 0;
	width: $side-width;
	padding-left: 5rem;
	.tree-node-holder{
		height: 3rem;
		line-height: 3rem;
	}
	.root-node{
		font-weight: bold;
	}
	.tree-node {
		display: inline-block;
	}
}

.side-bar .child-node {
	cursor: pointer;
	margin-left: 1.5rem;
	font-size: 14px;
	color: $shadow-dark;
	&:hover{
		color: $basic-blue;
	}
}
</style>