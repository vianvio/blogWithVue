<template>
	<div class='side-bar'>
		<ntree :node='rootNodes' v-for='rootNodes in appModel.sideBarModel' track-by='$index'></ntree>
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
	position: absolute;
	top: $nav-height;
	width: $side-width;
	padding-left: 5rem;
	padding-top: 1rem;
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
	.node-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
		line-height: 4rem;
		margin-bottom: 1rem;
	}
}

.side-bar-fix {
	top: 0;
	position: fixed;
	height: 100%;
	overflow: auto;
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