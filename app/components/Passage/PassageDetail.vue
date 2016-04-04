<template>
	<div class='passage-detail-holder'>
		<div class='tool-bar float-left' v-if='appModel.bAuthed'>
			<button class='edit-passage-btn float-left' v-on:click='newPassage'>修改日志</button>
		</div>
		<div class='content float-left'>
			<h4 class='passage-title'>{{appModel.newPassage.title}}</h4>
			<div class='passage-date-holder'>
				<span>创建日期: {{appModel.passageRelatedInfo.createdAt | moment}}</span>
				<span>最后更新: {{appModel.passageRelatedInfo.updatedAt | moment}}</span>
				<br/>
				<span>作者: Vian | gloomy_wind@hotmail.com</span>
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
		newPassage: function(){
			this.$route.router.go('/manage/editPassage');
		}
	},
	ready: function(){
	},
	route: {
		data: function(transition){
			var that = this;
			sideBarGenerator.initChildNodes([]);
			sideBarGenerator.initIndexObj({
			  _level1: {index: -1, tagLevel: 7},
			  _level2: {index: -1, tagLevel: 7},
			  _level3: {index: -1, tagLevel: 7},
			  _level4: {index: -1, tagLevel: 7},
			  _level5: {index: -1, tagLevel: 7},
			  _level6: {index: -1, tagLevel: 7}
			});
			appAction.GET_PASSAGE_BY_ID(this.$route.params.passageId).then(function(){
				[].slice.apply(document.querySelectorAll('.passage-content h1,.passage-content h2,.passage-content h3,.passage-content h4,.passage-content h5,.passage-content h6')).forEach(function(ele){
					// construct current object
					var _currentNode = {
						name: ele.innerText,
						nodeClass: 'child-node',
						selectable: true,
						forceOpen: true,
						open: true,
						fnc: sideBarGenerator.scrollMethod(ele),
						nodes: []
					}
					sideBarGenerator.insertNode(_currentNode, parseInt(/\d+/.exec(ele.tagName)));
				});
				that.$data.appModel.sideBarModel = {
					name: '目录',
					forceOpen: true,
					open: true,
					nodeClass: 'root-node',
					nodes: sideBarGenerator.getChildNodes()
				};
			});
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
		font-size: 35px;
		text-align: center;
		margin-top: 5rem;
	}
	.passage-content{
		margin-top: 5rem;
	}
	.passage-date-holder{
		color: $shadow-dark;
		text-align: center;
		margin-bottom: 5rem;
		span {
			font-size: 12px;
			margin: 0 1rem 0 1rem;
		}
	}
}

</style>