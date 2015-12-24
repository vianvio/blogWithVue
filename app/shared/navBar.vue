<template>
	<nav class='nav'>
		<!-- <a href="/" class='float-left nav-tab'>首页</a> -->
		<a href="#" class='float-right nav-tab' v-bind:class='currentTab === "babyRecord" ? "current-tab": ""' v-on:click='switchTab("babyRecord")'>成长记录</a>
		<a href="#" class='float-right nav-tab' v-bind:class='currentTab === "test" ? "current-tab": ""' v-on:click='switchTab("test")'>试验田</a>
		<a href="#" class='float-right nav-tab' v-bind:class='currentTab === "resume" ? "current-tab": ""' v-on:click='switchTab("resume")'>简历</a>
		<a href="#" class='float-right nav-tab' v-bind:class='currentTab === "passage" ? "current-tab": ""' v-on:click='switchTab("passage")'>文章</a>
	</nav>
</template>

<script>
console.log('from nav bar~');

module.exports = {
	name: 'navbar',
	data: function(){
		return {
			currentTab: ''
		}
	},
	methods:{
		switchTab: function(tabName){
			this.$data.currentTab = tabName;
			this.$dispatch('nav-tab-swich', tabName);
		}
	},
	created: function(){
		this.$data.currentTab = 'passage';
		this.$dispatch('nav-tab-swich', 'passage');
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