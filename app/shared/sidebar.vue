<template>
	<div class='side-bar full-height'>
		<div class='info-holder'>
			<img src="../images/logo.png">
		</div>
		<hr/>
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

.side-bar .child-node {
	cursor: pointer;
	padding-left: 2rem;
	font-size: 14px;
	&:hover{
		background-color: $hover-dark;
	}
}
</style>