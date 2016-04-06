<template>
	<router-view></router-view>
</template>

<script>
var appModel = require('../../app.model.js');

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
		activate: function(transition){
			if(!sessionStorage.getItem('token')){
				this.$route.router.go('/login');
			}
			var that = this;
			appModel.sideBarModel = [{
				name: '内容列表',
				forceOpen: true,
				open: true,
				nodeClass: 'root-node',
				nodes: [
					{
						name: '文章',
						nodeClass: 'child-node',
						selectable: true,
						fnc: function(){
							that.$route.router.go('/manage/passage');
						},
						nodes: []
					},
					{
						name: '简历',
						nodeClass: 'child-node',
						selectable: true,
						fnc: function(){
							that.$route.router.go('/manage/resumeList');
						},
						nodes: []
					},
					{
						name: '系统设置',
						nodeClass: 'child-node',
						selectable: true,
						fnc: function(){
							that.$route.router.go('/manage/systemConfig');
						},
						nodes: []
					}
				]
			}];
			appModel.bAuthed = !!sessionStorage.getItem('token');
			appModel.navBarModel.currentTab = 'manage';
			transition.next();
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

</style>