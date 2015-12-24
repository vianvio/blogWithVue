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

module.exports = {
	components: {
		navbar,
		sidebar
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