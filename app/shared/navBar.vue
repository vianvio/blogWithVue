<template>
	<div class='nav-holder'>
		<div class='nav-list-btn fa fa-bars' v-on:click='changeBShowSide()'></div>
		<div class='info-holder'>
			<img src="../images/logo.png">
		</div>
		<navlist></navlist>
	</div>
</template>

<script>
var appModel = require('../app.model.js');
var appAction = require('../app.action.js');
var navlist = require('./navList.vue');

module.exports = {
	components: {
		navlist
	},
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods:{
		changeBShowSide: function(){
			appModel.css.bShowSide = !appModel.css.bShowSide;
		}
	},
	events:{
	},
	created: function(){
	},
	ready: function(){
		appModel.css.navHeight = document.querySelector('.nav-holder').offsetHeight;
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.nav-holder{
	border-bottom: 1px solid $shadow-dark;
	.nav-list-btn {
		display: none;
	}
	@include mobile-screen {
		height: $nav-height-mobile;
		position: fixed;
		top: 0;
		z-index: 999;
		width: 100%;
		background-color: $white;
		.nav-list-btn {
			display: block;
			float: left;
			height: 100%;
			line-height: 5rem;
			width: 5rem;
			text-align: center;
			font-size: 2.5rem;
		}
	}
}

.info-holder{ 
	text-align: center;
	float: left;
	img {
		display: inline-block;
		cursor: pointer;
	}
	@include mobile-screen {
		float: none;
		img {
			width: 11rem;
			margin-left: -5rem;
		}
	}
}

</style>