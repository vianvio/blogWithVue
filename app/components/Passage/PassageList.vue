<template>
	<div class='passage-list-holder'>
		<div class='tool-bar float-left' v-if='appModel.bAuthed'>
			<button class='new-passage-btn float-left' v-on:click='newPassage'>新建日志</button>
		</div>
		<div class='content float-left'>
			<div v-for='passage in appModel.arrPassages' track-by='$index' class='passage-holder' v-on:click='showPassage(passage.id)'>
				<h4 class='passage-title'>{{passage.title}}</h4>
				<div class='passage-content' v-html='passage.content | newMarked'></div>
				<div class='passage-date-holder'>
					<span>创建日期: {{passage.createdAt | moment}}</span>
					<span>最后更新: {{passage.updatedAt | moment}}</span>
				</div>
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
		activate: function(transition) {
			appAction.GET_PASSAGE_LIST();
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
			}
			transition.next();
		},
		data: function(transition){
		}
	},
	filters: {
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
		border-bottom: 1px solid $shadow-dark;
		cursor: pointer;
	}
	.passage-title{
		color: $basic-blue;
	}
	.passage-content{
		font-size: 13px;
	}
	.passage-date-holder{
		color: $shadow-dark;
		text-align: right;
		span {
			font-size: 12px;
			margin: 0 2rem;
		}
	}
}

</style>