<template>
	<div class='baby-record-detail-holder'>
		<div class='baby-record-content' v-for='record in appModel.arrRecord'>
			<img :src="recordImg.imgUrl" class='baby-record-img' v-for='recordImg in record.recordImages' track-by='$index'>
			<div class=''>
				<h5 :id='record.id'>{{record.eventDate | moment}}</h5> - {{record.content}}
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
			appModel: appModel
		}
	},
	methods:{
		
	},
	ready: function(){
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
		padding: 1.5rem;
		margin: 1.5rem;
		@extend %material-shadow;
		h5 {
			display: inline;
		}
	}
	.baby-record-img{
		padding: 0.5rem;
	}
}

</style>