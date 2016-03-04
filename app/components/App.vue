<template>
	<div class='content-holder' v-bind:class='bLoginPage ? "content-holder-noside" : ""'>
		<navbar></navbar>
		<router-view></router-view>
	</div>
	<sidebar v-show='!bLoginPage'></sidebar>
</template>

<script>

var sidebar = require('../shared/sidebar.vue');
var navbar = require('../shared/navbar.vue');

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
		'nav-route-change': function(tabName, treeObj) {
			this.$broadcast('nav-tab-swich', tabName);
			this.$broadcast('update-tree', treeObj);
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
	/*padding-left: $side-width;*/
	overflow-x: hidden;
	overflow-y: auto;
}

.content-holder.content-holder-noside {
	padding-left: 0;
}

</style>