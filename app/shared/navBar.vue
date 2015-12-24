<template>
	<nav class='nav'>
		<!-- <a href="/" class='float-left nav-tab'>首页</a> -->
		<a href="#" class='float-right nav-tab'>成长记录</a>
		<a href="#" class='float-right nav-tab'>试验田</a>
		<a href="#" class='float-right nav-tab'>简历</a>
		<a href="#" class='float-right nav-tab'>文章</a>
	</nav>
</template>

<script>
console.log('from nav bar~');

module.exports = {
	name: 'navbar'
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.nav {
	background-color: $dark-blue;
	height: $nav-height;
}

.nav-tab{
	font-size: 16px;
	padding: 4rem;
	line-height: 20px;
	text-decoration: none;
	color: $shadow-dark;
}

</style>