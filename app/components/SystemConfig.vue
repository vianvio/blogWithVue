<template>
	<div class='system-config-holder'>
		<table>
			<thead>
				<td></td>
			</thead>
		</table>
	</div>
</template>

<script>
// var appConfig = require('../config.service.js');

module.exports = {
	components: {
		
	},
	data: function(){
		return {
			
		}
	},
	methods:{
		
	},
	created: function(){
		
	},
	route: {
		activate: function(transition){
			if(!sessionStorage.getItem('token')){
				this.$route.router.go('/login');
			}
			transition.next();
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.system-config-holder{
	padding: 1rem 1rem 0 1rem;
	.tool-bar {
		padding-bottom: 1.5rem;
		width: 100%;
		display: table-cell;
		vertical-align: middle;
	}
	.content{
		width: 100%;
	}
}
</style>