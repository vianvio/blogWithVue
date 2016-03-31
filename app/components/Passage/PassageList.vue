<template>
	<div class='passage-list-holder'>
		<div class='tool-bar float-left' v-if='appModel.bAuthed'>
			<button class='new-passage-btn float-left' v-on:click='newPassage'>新建日志</button>
		</div>
		<div class='content float-left'>
			<div v-for='passage in appModel.arrPassages' track-by='$index' class='passage-holder'>
				<h4 class='passage-title' v-on:click='showPassage(passage.id)'>{{passage.title}}</h4>
				<div class='passage-date-holder'>
					<span>创建日期: {{passage.createdAt | moment}}</span>
					<span>最后更新: {{passage.updatedAt | moment}}</span>
				</div>
				<div class='passage-content' v-html='passage.content | marked'></div>
			</div>
		</div>
	</div>
</template>

<script>
var appModel = require('../../app.model.js');
var appAction = require('../../app.action.js');
var marked = require('marked');
var moment = require('moment');

module.exports = {
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods:{
		newPassage: function(){
			this.$route.router.go('/manage/newPassage');
		},
		showPassage: function(passageId){
			this.$route.router.go('/passages/' + passageId);
		}
	},
	created: function(){
		
	},
	route: {
		data: function(transition){
			if(transition.to.path !== '/manage/passage'){
				var that = this;
				appAction.GET_PASSAGE_TYPES().then(function(res){
					var _childNodes = [];
					res.data.forEach(function(type){
						_childNodes.push({
							name: type.name,
							nodeClass: 'child-node',
							selectable: true,
							fnc: function(){
								appAction.GET_PASSAGE_LIST_BY_TYPE(type.id).then(function(){
									that.$route.router.go('/passages');
								});
							},
							nodes: []
						})
					});
					that.$data.appModel.sideBarModel = {
						name: '文章目录',
						forceOpen: true,
						open: true,
						nodeClass: 'root-node',
						nodes: _childNodes
					};
					that.$data.appModel.bAuthed = !!sessionStorage.getItem('token');
					that.$data.appModel.navBarModel.currentTab = 'passage';
				})
			}else{
				appAction.GET_PASSAGE_LIST();
			}
		}
	},
	filters: {
		marked: marked,
	    newMarked: function(content){
	    	return marked(content).replace(/<[^>]+>/g, '');
	    },
	    moment: function (date) {
		    return moment(date).format('YYYY-MM-DD');
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.passage-list-holder{
	@extend %content-holder;
	padding: 0 10rem;
	.tool-bar {
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
	.passage-holder{
		margin-top: 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid $shadow-dark;
	}
	.passage-title{
		cursor: pointer;
		color: $basic-blue;
		font-size: 25px;
	}
	.passage-content{
		margin-top: 1.5rem;
	}
	.passage-date-holder{
		color: $shadow-dark;
		span {
			font-size: 12px;
			margin: 0 2rem 0 0;
		}
	}
}

</style>