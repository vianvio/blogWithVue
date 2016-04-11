<template>
	<div class='page-loading' v-show='appModel.bLoading'>
        <div class='cssload-ball'></div>
    </div>
	<navbar></navbar>
	<sidebar v-show='!appModel.bLoginPage'></sidebar>
	<router-view></router-view>
	</div>
</template>

<script>

var sidebar = require('../shared/sidebar.vue');
var navbar = require('../shared/navBar.vue');
var appModel = require('../app.model.js');

module.exports = {
	components: {
		navbar,
		sidebar,
		appModel
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

</style>