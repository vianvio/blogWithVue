<template>
	<div class='baby-record-detail-holder'>
		<div class='baby-record-content' v-for='record in appModel.arrRecord' track-by='$index'>
			<h3 v-if='!appModel.bDesktop' class='hidden-date' :id='record.id'>{{record.eventDate | moment}}</h3>
			<div class='record-content-left'>
				<img :src="recordImg.imgUrl" class='baby-record-img' v-for='recordImg in record.recordImages'>
			</div>
			<div class='record-content-right position-relative' v-bind:class='$index === currentFixIndex ? "record-content-fix" : ""'>
				<div class='record-content-tool fa fa-close' v-if='bShowContent' v-on:click='bShowContent = !bShowContent'></div>
				<div class='record-content-tool fa fa-angle-double-up' v-if='!bShowContent' v-on:click='bShowContent = !bShowContent'></div>
				<h1 v-if='appModel.bDesktop' :id='record.id'>{{record.eventDate | moment}}</h1>
				<div class='record-content-text'><div v-bind:class='bShowContent ? "" : "record-content-single-line"'>{{record.eventDate | moment}} - {{record.content}}</div></div>
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
			currentFixIndex: -1,
			bShowContent: true
		}
	},
	methods:{
	},
	ready: function(){
		if(!appModel.bDesktop){
			this.$data.currentFixIndex = 0;
		}
		this.$watch('appModel.css.bodyScroll', function (val) {
		  var _arrLeftHolder = [].slice.apply(document.querySelectorAll('.record-content-left'));
		  var bInit = true;
		  for(var i = 0; i<_arrLeftHolder.length; i++){
		  	if(appModel.bDesktop && val >= _arrLeftHolder[i].offsetTop && val < _arrLeftHolder[i].offsetTop + _arrLeftHolder[i].offsetHeight - 200){
		  		this.$data.currentFixIndex = i;
		  		bInit = false;
		  		break;
		  	}else if(!appModel.bDesktop && val >= _arrLeftHolder[i].offsetTop - 300 && val <= _arrLeftHolder[i].offsetTop + _arrLeftHolder[i].offsetHeight - 300){
		  		this.$data.currentFixIndex = i;
		  		bInit = false;
		  		break;
		  	}
		  };
		  if(bInit){
		  	this.$data.currentFixIndex = appModel.bDesktop ? -1 : 0;
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
		@include mobile-screen{
			margin: 0;
		}
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
		@include mobile-screen{
			width: 100%;
			padding: 0;
			.baby-record-img{
				width: 100%;
			}
		}
		@include tablet-screen{
			.baby-record-img{
				width: 100%;
				margin: 0 auto;
			}
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
		.record-content-tool{
			display: none;
		}
		@include mobile-screen{
			display: none;
		}
	}
	.record-content-fix{
		position: fixed;
		top: 0;
		right: 13rem;
		@include mobile-screen{
			display: block;
			width: 100%;
			right: 0;
			bottom: 0;
			top: auto;
			background-color: rgba(0,0,0,0.7);
			.record-content-text{
				max-height: 20rem;
				overflow: auto;
				color: $white;
				font-size: 1.6rem;
				margin: 0;
				div {
					padding: 1.5rem;
				}
			}
			.record-content-single-line{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.record-content-tool{
				position: absolute;
				display: block;
				top: -5rem;
				right: 0;
				height: 5rem;
				width: 5rem;
				line-height: 5rem;
				text-align: center;
				background-color: rgba(0,0,0,0.7);
				color: $white;
				font-size: 2.5rem;
			}
		}
	}
	.hidden-date{
		height: 0;
		overflow: hidden;
		margin: 0;
	}
}

</style>