<template>
	<router-view></router-view>
</template>

<script>
var appConfig = require('../config.service.js');

module.exports = {
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
			if(!!!appConfig.authInfo.bAuthed){
				this.$route.router.go('/login');
			}
			var that = this;
			var _treeObj = {
				name: '内容列表',
				forceOpen: true,
				open: true,
				nodeClass: 'root-node',
				nodes: [
					{
						name: '文章',
						nodeClass: 'child-node',
						fnc: function(){
							that.$route.router.go('/manage/passage');
						},
						nodes: []
					},
					{
						name: '简历',
						nodeClass: 'child-node',
						nodes: []
					}
				]
			};
			this.$dispatch('nav-route-change', 'manage', _treeObj);
			this.$dispatch('show-hide-side-nav');
			transition.next();
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

</style>