<template>
	<div class='side-bar full-height'>
		<ntree :node='appModel.sideBarModel'></ntree>
	</div>
</template>

<script>
var ntree = require('../shared/ntree.vue');
var appModel = require('../app.model.js');

module.exports = {
	components:{
		ntree
	},
	data: function(){
		return {
			appModel: appModel
		}
	},
	events: {

	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.side-bar {
	float: left;
	width: $side-width;
	padding-left: 5rem;
	.tree-node-holder{
		min-height: 3rem;
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
	.tree-node-text:hover{
		color: $basic-blue;
	}
}
</style>