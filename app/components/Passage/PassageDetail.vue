<template>
	<div class='passage-detail-holder'>
		<div class='tool-bar float-left' v-if='appModel.bAuthed'>
			<button class='edit-passage-btn float-left' v-on:click='editPassage'>修改日志</button>
		</div>
		<div class='content float-left'>
			<h4 class='passage-title'>{{appModel.newPassage.title}}</h4>
			<div class='passage-date-holder'>
				<span class='passage-info-span'>创建日期: {{appModel.passageRelatedInfo.createdAt | moment}}</span>
				<span class='passage-info-span'>最后更新: {{appModel.passageRelatedInfo.updatedAt | moment}}</span>
				<div class='passage-info-span'>作者: Vian | gloomy_wind@hotmail.com</div>
			</div>
			<hr/>
			<div class='passage-content' v-html='appModel.newPassage.content | marked'></div>
		</div>
	</div>
</template>

<script>
var appModel = require('../../app.model.js');
var appAction = require('../../app.action.js');
var marked = require('marked');
var moment = require('moment');
var sideBarGenerator = require('../../shared/sideBarGenerator.js');

module.exports = {
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods:{
		editPassage: function(){
			this.$route.router.go('/manage/editPassage/' + this.$route.params.passageId);
		}
	},
	ready: function(){
	},
	route: {
		data: function(transition){
			var that = this;
			sideBarGenerator.initChildNodes();
			sideBarGenerator.initIndexObj();
			appAction.GET_PASSAGE_BY_ID(this.$route.params.passageId).then(function(){
				[].slice.apply(document.querySelectorAll('.passage-content h1,.passage-content h2,.passage-content h3,.passage-content h4,.passage-content h5,.passage-content h6')).forEach(function(ele){
					// construct current object
					var _currentNode = {
						name: ele.innerText || ele.textContent,
						nodeClass: 'child-node',
						selectable: true,
						forceOpen: true,
						open: true,
						fnc: sideBarGenerator.scrollMethod(ele),
						nodes: []
					}
					sideBarGenerator.insertNode(_currentNode, parseInt(/\d+/.exec(ele.tagName)));
				});
				appModel.sideBarModel = [{
					name: '目录',
					forceOpen: true,
					open: true,
					nodeClass: 'root-node',
					nodes: sideBarGenerator.getChildNodes()
				}];
			});
			appModel.navBarModel.currentTab = 'passage';
		}
	},
	filters: {
	    marked: marked,
	    moment: function (date) {
		    return moment(date).format('YYYY-MM-DD');
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.passage-detail-holder{
	@extend %content-holder;
	.tool-bar {
		width: 100%;
		display: table-cell;
		vertical-align: middle;
	}
	.content{
		width: 100%;
	}
	.edit-passage-btn {
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
		font-size: 3.5rem;
		text-align: center;
		margin-top: 5rem;
		@include mobile-screen{
			margin-top: 1.5rem;
		}
	}
	.passage-content{
		margin-top: 5rem;
		@include mobile-screen{
			margin-top: 1.5rem;
		}
		p {
			word-break: break-all;
		}
	}
	.passage-date-holder{
		color: $shadow-dark;
		text-align: center;
		margin-bottom: 5rem;
		@include mobile-screen{
			margin-bottom: 1.5rem;
		}
		.passage-info-span{
			font-size: 1.2rem;
			margin: 0 1rem 0 1rem;
			@include mobile-screen{
				display: block;
			}
		}
	}
}

</style>