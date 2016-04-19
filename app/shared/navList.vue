<template>
	<nav class='nav'>
		<a v-link='"/babyRecords"' class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "babyRecord" ? "current-tab": ""'>成长记录</a>
		<a v-link='' class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "test" ? "current-tab": ""'>试验田</a>
		<a v-link='"/resume/1"' class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "resume" ? "current-tab": ""'>简历</a>
		<a v-link='"/passages"' class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "passage" ? "current-tab": ""' v-on:click='clickPassages()'>日志</a>
		<a v-link='"/manage"' class='float-right nav-tab' v-if='appModel.bAuthed' v-bind:class='appModel.navBarModel.currentTab === "manage" ? "current-tab": ""'>管理</a>
	</nav>
</template>

<script>
var appModel = require('../app.model.js');
var appAction = require('../app.action.js');

module.exports = {
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods:{
		clickPassages: function(){
			this.$data.appModel.treeNodeSelected = '';
			appAction.GET_PASSAGE_LIST();
		}
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


.nav {
	/*background-color: $dark-blue;*/
	/*color: $dark-blue;*/
	height: $nav-height;
	@include mobile-screen {
		display: none;
		border-bottom: 1px solid $shadow-dark;
		margin-bottom: 1.5rem;
		height: auto;
	}
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
	@include mobile-screen {
		width: 100%;
		line-height: 1;
		padding: 1.5rem;
		margin: 0;
	}
}

.nav .current-tab {
	/*background-color: $basic-blue;*/
	color: $dark-blue;
	border-bottom: 2px solid $basic-blue;
}

</style>