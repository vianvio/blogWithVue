<template>
	<h2>Hello World!</h2>
</template>

<script>
var sub = require('../shared/sub');
sub.generateText();
</script>

<style lang="sass">
@import "../shared/variables.scss";

h2 {
  color: $red;
}


</style>