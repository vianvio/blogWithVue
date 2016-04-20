<template>
	<div class='baby-record-detail-holder'>
		<div class='baby-record-content' v-for='record in appModel.arrRecord' track-by='$index'>
			<div class='record-content-left'>
				<img :src="recordImg.imgUrl" class='baby-record-img' v-for='recordImg in record.recordImages'>
			</div>
			<div class='record-content-right' v-bind:class='$index === currentFixIndex ? "record-content-fix" : ""'>
				<h1 :id='record.id'>{{record.eventDate | moment}}</h1>
				<div class='record-content-text'>{{record.content}}</div>
			</div>
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
			appModel: appModel,
			currentFixIndex: -1
		}
	},
	methods:{
	},
	ready: function(){
		this.$watch('appModel.css.bodyScroll', function (val) {
		  var _arrLeftHolder = [].slice.apply(document.querySelectorAll('.record-content-left'));
		  var bInit = true;
		  for(var i = 0; i<_arrLeftHolder.length; i++){
		  	if(val >= _arrLeftHolder[i].offsetTop && val < _arrLeftHolder[i].offsetTop + _arrLeftHolder[i].offsetHeight - 200){
		  		this.$data.currentFixIndex = i;
		  		bInit = false;
		  		break;
		  	}
		  };
		  if(bInit){
		  	this.$data.currentFixIndex = -1;
		  }
		})
	},
	route: {
		data: function(transition){
			var that = this;
			sideBarGenerator.initChildNodes();
			sideBarGenerator.initIndexObj();
			appAction.GET_RECORD_LIST_WITH_IMAGE().then(function(){
				[].slice.apply(document.querySelectorAll('.baby-record-content h1,.baby-record-content h2,.baby-record-content h3,.baby-record-content h4,.baby-record-content h5,.baby-record-content h6')).forEach(function(ele){
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
					name: '日期',
					forceOpen: true,
					open: true,
					nodeClass: 'root-node',
					nodes: sideBarGenerator.getChildNodes()
				}];
			});
			appModel.navBarModel.currentTab = 'babyRecord';
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

.baby-record-detail-holder{
	@extend %content-holder;
	padding-bottom: 1rem;
	.baby-record-content{
		float: left;
		width: 100%;
		margin: 1.5rem;
	}
	.record-content-left{
		float: left;
		width: 55%;
		padding: 0 3rem 3rem 3rem;
		.baby-record-img{
			border-radius: 3px;
			@extend %material-shadow;
			max-width: 100%;
			padding: 1.5rem;
			margin: 1.5rem 0;
			display: block;
		}
	}
	.record-content-right {
		float: left;
		width: 40rem;
		h1 {
			color: $basic-blue;
		}
		.record-content-text{
			margin-top: 3rem;
			font-size: 1.6rem;
			color: $basic-dark;
		}
	}
	.record-content-fix{
		position: fixed;
		top: 0;
		right: 13rem;
	}
}

</style>