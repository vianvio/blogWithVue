<template>
	<div class='page-loading' v-show='appModel.bLoading'>
        <div class='cssload-ball'></div>
    </div>
	<navbar></navbar>
	<div class='content-holder'>
		<sidebar v-show='!appModel.bLoginPage'></sidebar>
		<router-view></router-view>
	</div>
	</div>
</template>

<script>

var sidebar = require('../shared/sidebar.vue');
var navbar = require('../shared/navbar.vue');
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

.content-holder {
	margin-top: 1rem;
}

</style>