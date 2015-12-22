<template>
	<navBar></navBar>
	<h2>hello with font-awesome</h2>
	<i class='fa fa-plus-circle'></i>
	<router-view></router-view>
</template>

<script>
'use strict';
var navBar = require('../shared/navBar.vue');

module.exports = {
	components: navBar
};
</script>

<style lang="sass">
@import "../shared/variables.scss";

h2 {
  color: $red;
}

</style>