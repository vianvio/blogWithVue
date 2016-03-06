<template>
	<div></div>
</template>

<script>
var appConfig = require('../config.service.js');
var appModel = require('../app.model.js');

module.exports = {
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods:{
		
	},
	created: function(){
		
	},
	route: {
		activate: function(transition) {
			this.$data.appModel.sideBarModel = {
				name: '文章目录',
				forceOpen: true,
				open: true,
				nodeClass: 'root-node',
				nodes: []
			};
			this.$data.appModel.bAuthed = !!sessionStorage.getItem('token');
			this.$data.appModel.navBarModel.currentTab = 'passage';
			transition.next();
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

</style>