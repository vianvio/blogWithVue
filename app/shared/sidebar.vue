<template>
	<div class='side-bar' v-show='appModel.css.bShowSide' transition='show-side' v-on:click='hideSideOnMobile'>
		<navlist class='nav-list-display'></navlist>
		<ntree :node='rootNodes' v-for='rootNodes in appModel.sideBarModel' track-by='$index'></ntree>
	</div>
</template>

<script>
var ntree = require('../shared/ntree.vue');
var appModel = require('../app.model.js');
var navlist = require('./navList.vue');

module.exports = {
	components:{
		ntree,
		navlist
	},
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods: {
		hideSideOnMobile: function(){
			if(!appModel.bDesktop){
				appModel.css.bShowSide = false;
			}
		}
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
	.node-btn-coffee {
		@extend %blog-btn;
		background-color: $light-coffee;
		color: #fff;
		line-height: 4rem;
		margin-bottom: 1rem;
	}
	.nav-list-display {
		display: none;
	}
	@include mobile-screen {
		position: fixed;
		width: 90%;
		top: 0;
		padding-top: $nav-height-mobile;
		padding-right: 1.5rem;
		padding-left: 1.5rem;
		height: 100%;
		z-index: 99;
		background-color: $white;
		overflow: auto;
		/*@extend %material-shadow;*/
		@include box-shadow(0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12));
		.nav-list-display {
			display: block;
		}
	}
}

@include mobile-screen {
	.show-side-transition {
	    transition: all 0.5s ease;
	    opacity: 1;
	    left: 0;
	}
	.show-side-enter,
	.show-side-leave {
	    left: -90%;
	    opacity: 0;
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
	font-size: 1.4rem;
	color: $shadow-dark;
	.tree-node-text:hover{
		color: $basic-blue;
	}
}
</style>