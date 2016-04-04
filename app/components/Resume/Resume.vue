<template>
	<div class='resume-holder'>
		<div class='resume-basic-holder'>
		</div>
	</div>
</template>

<script>
var appModel = require('../../app.model.js');
var appAction = require('../../app.action.js');
var marked = require('marked');
var moment = require('moment');
var sideBarGenerator = require('../../shared/sideBarGenerator.js');
var Q = require('q');

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
			appModel.bLoading = true;
			Q.all([appAction.GET_RESUME_BY_ID(this.$route.params.resumeId), appAction.GET_EDUCATION_LIST(), appAction.GET_JOB_LIST(), appAction.GET_PROJECT_LIST()]).then(function(){
				appModel.bLoading = false;
				[].slice.apply(document.querySelectorAll('.resume-content h1,.resume-content h2,.resume-content h3,.resume-content h4,.resume-content h5,.resume-content h6')).forEach(function(ele){
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
					name: '简历',
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