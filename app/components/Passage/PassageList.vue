<template>
	<div class='passage-list-holder'>
		<div class='tool-bar float-left' v-if='appModel.bAuthed'>
			<button class='new-passage-btn float-left' v-on:click='newPassage'>新建日志</button>
		</div>
		<div class='content float-left'>
			
		</div>
	</div>
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
		newPassage: function(){
			this.$route.router.go('/manage/newPassage');
		}
	},
	created: function(){
		
	},
	route: {
		activate: function(transition) {
			if(transition.to.path !== '/manage/passage'){
				this.$data.appModel.sideBarModel = {
					name: '文章目录',
					forceOpen: true,
					open: true,
					nodeClass: 'root-node',
					nodes: []
				};
				this.$data.appModel.bAuthed = !!sessionStorage.getItem('token');
				this.$data.appModel.navBarModel.currentTab = 'passage';
			}
			transition.next();
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.passage-list-holder{
	@extend %content-holder;
	.tool-bar {
		padding-bottom: 1.5rem;
		width: 100%;
		display: table-cell;
		vertical-align: middle;
	}
	.content{
		width: 100%;
	}
	.new-passage-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff; 
	}
}

</style>