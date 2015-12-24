<template>
	<sidebar></sidebar>
	<div class='content-holder full-height'>
		<navbar></navbar>
	</div>
	<router-view></router-view>
</template>

<script>

var sidebar = require('../shared/sidebar.vue');
var navbar = require('../shared/navbar.vue');

var mapTabContent = {
	'passage': '文章目录',
	'test': '实验列表'
}

module.exports = {
	components: {
		navbar,
		sidebar
	},
	events:{
		'nav-tab-swich': function(tabName){
			if(mapTabContent[tabName]){
				this.$broadcast('update-content-title', mapTabContent[tabName]);
			}
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.content-holder {
	padding-left: $side-width;
	overflow-x: hidden;
	overflow-y: auto;
}

</style>