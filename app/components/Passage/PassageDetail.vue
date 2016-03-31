<template>
	<div class='passage-detail-holder'>
		<div class='tool-bar float-left' v-if='appModel.bAuthed'>
			<button class='edit-passage-btn float-left' v-on:click='newPassage'>修改日志</button>
		</div>
		<div class='content float-left'>
			<h4 class='passage-title'>{{appModel.newPassage.title}}</h4>
			<div class='passage-date-holder'>
				<span>创建日期: {{appModel.newPassage.createdAt | moment}}</span>
				<span>最后更新: {{appModel.newPassage.updatedAt | moment}}</span>
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

var _childNodes, _indexObj;

var _initIndexObjByLevel = function(level){
	for(var key in _indexObj){
		if(parseInt(/\d/.exec(key)) > level){
			_indexObj[key] = {
				index: -1,
				tagLevel: 7
			};
		}
	}
}

var _insertNode = function(currentNode, currentNodeTagLevel){
	for(var key in _indexObj){
		if(_indexObj[key].tagLevel >= currentNodeTagLevel){
			switch(key){
				case '_level1':
					_childNodes.push(currentNode);
					_indexObj._level1.index = _childNodes.length - 1;
					_indexObj._level1.tagLevel = currentNodeTagLevel;
					_initIndexObjByLevel(1);
					break;
				case '_level2':
					_childNodes[_indexObj._level1.index].nodes.push(currentNode);
					_indexObj._level2.index = _childNodes[_indexObj._level1.index].nodes.length - 1;
					_indexObj._level2.tagLevel = currentNodeTagLevel;
					_initIndexObjByLevel(2);
					break;
				case '_level3':
					_childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes.push(currentNode);
					_indexObj._level3.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes.length - 1;
					_indexObj._level3.tagLevel = currentNodeTagLevel;
					_initIndexObjByLevel(3);
					break;
				case '_level4':
					_childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes.push(currentNode);
					_indexObj._level4.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes.length - 1;
					_indexObj._level4.tagLevel = currentNodeTagLevel;
					_initIndexObjByLevel(4);
					break;
				case '_level5':
					_childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes.push(currentNode);
					_indexObj._level5.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes.length - 1;
					_indexObj._level5.tagLevel = currentNodeTagLevel;
					_initIndexObjByLevel(5);
					break;
				case '_level6':
					_childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes[_indexObj._level5.index].nodes.push(currentNode);
					_indexObj._level6.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes[_indexObj._level5.index].nodes.length - 1;
					_indexObj._level6.tagLevel = currentNodeTagLevel;
					_initIndexObjByLevel(6);
					break;
			}
			break;
		}
	} 
}

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
			_childNodes = [];
			_indexObj = {
			  _level1: {index: -1, tagLevel: 7},
			  _level2: {index: -1, tagLevel: 7},
			  _level3: {index: -1, tagLevel: 7},
			  _level4: {index: -1, tagLevel: 7},
			  _level5: {index: -1, tagLevel: 7},
			  _level6: {index: -1, tagLevel: 7}
			};
			appAction.GET_PASSAGE_BY_ID(this.$route.params.passageId).then(function(){
				[].slice.apply(document.querySelectorAll('.passage-content h1,.passage-content h2,.passage-content h3,.passage-content h4,.passage-content h5,.passage-content h6')).forEach(function(ele){
					console.log('test');
					// construct current object
					var _currentNode = {
						name: ele.innerText,
						nodeClass: 'child-node',
						selectable: true,
						forceOpen: true,
						open: true,
						fnc: function(){
							// scroll function
							var targetScroll = document.getElementById(ele.id).offsetTop;
							var currentScroll = document.body.scrollTop;
							var scrollPerTime = Math.abs(currentScroll - targetScroll) / 50;
							var tryCount = 0;
							var scrollInterval = setInterval(function(){
								if(Math.abs(document.body.scrollTop - targetScroll) > scrollPerTime){
									if(currentScroll < targetScroll){
										document.body.scrollTop += scrollPerTime;
									} else {
										document.body.scrollTop -= scrollPerTime;
									}
									tryCount++;
									if(tryCount === 60){
										clearInterval(scrollInterval);
									}
								} else {
									document.body.scrollTop = targetScroll;
									clearInterval(scrollInterval);
								}
							}, 1);
						},
						nodes: []
					}
					_insertNode(_currentNode, parseInt(/\d+/.exec(ele.tagName)));
				});
				that.$data.appModel.sideBarModel = {
					name: '目录',
					forceOpen: true,
					open: true,
					nodeClass: 'root-node',
					nodes: _childNodes
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