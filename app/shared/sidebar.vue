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
	name: 'sidebar',
	components:{
		ntree
	},
	data: function(){
		return {
			contentTree: {
				name: '',
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
	},
	events: {
		'update-content-title': function(contentTitle){
			this.$data.contentTree.name = contentTitle;
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