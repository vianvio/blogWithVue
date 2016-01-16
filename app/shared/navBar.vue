<template>
	<nav class='nav'>
		<a v-link='"/manage"' class='float-left nav-tab' v-if='authInfo.bAuthed' v-bind:class='currentTab === "manage" ? "current-tab": ""'>管理</a>
		<a v-link='' class='float-right nav-tab' v-bind:class='currentTab === "babyRecord" ? "current-tab": ""'>成长记录</a>
		<a v-link="" class='float-right nav-tab' v-bind:class='currentTab === "test" ? "current-tab": ""'>试验田</a>
		<a v-link="" class='float-right nav-tab' v-bind:class='currentTab === "resume" ? "current-tab": ""'>简历</a>
		<a v-link='"/passages"' class='float-right nav-tab' v-bind:class='currentTab === "passage" ? "current-tab": ""'>文章</a>
	</nav>
</template>

<script>
var appConfig = require('../config.service.js');

module.exports = {
	data: function(){
		return {
			currentTab: '',
			authInfo: appConfig.authInfo
		}
	},
	methods:{
	},
	events:{
		'nav-tab-swich': function(tabName){
			this.$data.currentTab = tabName;
		}
	},
	created: function(){
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.nav {
	background-color: $dark-blue;
	height: $nav-height;
}

.nav-tab {
	font-size: 16px;
	padding: 4rem;
	line-height: 20px;
	text-decoration: none;
	color: $shadow-dark;
	cursor: pointer;
	&:hover {
		background-color: $basic-blue;
		color: #fff;

	}
}

.nav .current-tab {
	background-color: $basic-blue;
	color: #fff;
}

</style>