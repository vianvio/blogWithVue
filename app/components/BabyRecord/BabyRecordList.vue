<template>
	<div class='record-list-holder'>
		<nbutton btn-class='new-record-btn' :nbutton-click='newRecord'>新增记录</nbutton>
		<table class="table table-hover">
			<thead>
				<td>日期</td>
				<td>内容</td>
				<td>操作</td>
			</thead>
			<tbody>
				<tr v-for='record in appModel.arrRecord'>
					<td class='record-content'>{{record.eventDate | moment}}</td>
					<td class='record-content'>{{record.content}}</td>
					<td><nbutton btn-class='new-record-btn' :nbutton-click='editRecord(record.id)'>修改</nbutton></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
var appModel = require('../../app.model.js');
var nbutton = require('../../shared/nbutton.vue');
var appAction = require('../../app.action.js');
var moment = require('moment');

module.exports = {
	components: {
		nbutton
	},
	data: function(){
		return {
			appModel: appModel,
			editRecord: function(recordId){
				var that = this;
				return function(){
					that.$route.router.go('/manage/editRecord/' + recordId);
				}
			}
		}
	},
	methods:{
		newRecord: function(){
			this.$route.router.go('/manage/newRecord');
		}
	},
	created: function(){
		
	},
	route: {
		activate: function(transition){
			if(!sessionStorage.getItem('token')){
				this.$route.router.go('/login');
			}
			transition.next();
		},
		data: function(transition) {
	 	    appAction.GET_RECORD_LIST();
		}
	},
	filters: {
	    moment: function (date) {
		    return moment(date).format('YYYY-MM-DD');
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.record-list-holder{
	@extend %content-holder;
	padding: 1rem 1rem 0 $side-width;
	.new-record-btn{
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
	}
	.record-content{
		vertical-align: middle;
	}
}
</style>