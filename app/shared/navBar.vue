<template>
	<div>
		<div class='info-holder'>
			<img src="../images/logo.png">
		</div>
		<nav class='nav'>
			<a v-link='' class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "babyRecord" ? "current-tab": ""'>成长记录</a>
			<a v-link="" class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "test" ? "current-tab": ""'>试验田</a>
			<a v-link="" class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "resume" ? "current-tab": ""'>简历</a>
			<a v-link='"/passages"' class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "passage" ? "current-tab": ""'>日志</a>
			<a v-link='"/manage"' class='float-right nav-tab' v-if='appModel.bAuthed' v-bind:class='appModel.navBarModel.currentTab === "manage" ? "current-tab": ""'>管理</a>
		</nav>
	</div>
</template>

<script>
var appConfig = require('../config.service.js');
var appModel = require('../app.model.js');

module.exports = {
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods:{
	},
	events:{
	},
	created: function(){
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.info-holder{ 
	text-align: center;
	float: left;
	img {
		display: inline-block;
		cursor: pointer;
	}
}

.nav {
	/*background-color: $dark-blue;*/
	/*color: $dark-blue;*/
	height: $nav-height;
	border-bottom: 1px solid $shadow-dark;
}

.nav-tab {
	font-size: 16px;
	padding: 4rem 0.5rem 0.5rem 0.5rem;
	line-height: 20px;
	color: $shadow-dark;
	cursor: pointer;
	overflow: hidden;
	margin: 0 3rem;
	&:hover {
		color: $dark-blue;
		border-bottom: 2px solid $basic-blue;
	}
}

.nav .current-tab {
	/*background-color: $basic-blue;*/
	color: $dark-blue;
	border-bottom: 2px solid $basic-blue;
}

</style>