<template>
	<sidebar v-if='!bLoginPage'></sidebar>
	<div class='content-holder' v-bind:class='bLoginPage ? "content-holder-noside" : ""'>
		<navbar></navbar>
		<router-view></router-view>
	</div>
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
	data: function() {
		return {
			bLoginPage: false
		}
	},
	events: {
		'nav-tab-swich': function(tabName) {
			if(mapTabContent[tabName]){
				this.$broadcast('update-content-title', mapTabContent[tabName]);
			}
		},
		'show-hide-side-nav': function() {
			if(this.$route.path === '/login') {
				this.$set('bLoginPage', true);
			} else {
				this.$set('bLoginPage', false);
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

.content-holder.content-holder-noside {
	padding-left: 0;
}

</style>