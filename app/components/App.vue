<template>
	<div class='content-holder' v-bind:class='bLoginPage ? "content-holder-noside" : ""'>
		<navbar></navbar>
		<router-view></router-view>
	</div>
	<sidebar v-show='!appModel.bLoginPage'></sidebar>
</template>

<script>

var sidebar = require('../shared/sidebar.vue');
var navbar = require('../shared/navbar.vue');
var appModel = require('../app.model.js');

module.exports = {
	components: {
		navbar,
		sidebar
	},
	data: function() {
		return {
			appModel: appModel
		}
	},
	events: {
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