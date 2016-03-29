<template>
	<div class='passage-detail-holder'>
		<div class='tool-bar float-left' v-if='appModel.bAuthed'>
			<button class='edit-passage-btn float-left' v-on:click='newPassage'>修改日志</button>
		</div>
		<div class='content float-left'>
			<h4>{{appModel.newPassage.title}}</h4>
			<div v-html='appModel.newPassage.content | marked'></div>
			<!-- <div v-for='passage in appModel.arrPassages' track-by='$index' class='passage-holder'>
				<h4 class='passage-title'>{{passage.title}}</h4>
				<div class='passage-content' v-html='passage.content | newMarked'></div>
				<div class='passage-date-holder'>
					<span>创建日期: {{passage.createdAt | moment}}</span>
					<span>最后更新: {{passage.updatedAt | moment}}</span>
				</div>
			</div> -->
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
		}
	},
	created: function(){
		
	},
	route: {
		data: function(transition){
			appAction.GET_PASSAGE_BY_ID(this.$route.params.passageId);
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