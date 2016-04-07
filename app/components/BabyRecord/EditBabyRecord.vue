<template>
	<div class='record-edit-holder'>
		<message-box :message-content='message' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
		日期: <datepicker :value.sync="appModel.newRecord.eventDate | moment" format="yyyy-MM-dd"></datepicker>
		<textarea class='record-content' placeholder="内容" v-model='appModel.newRecord.content' rows='5'></textarea>
		<nbutton btn-class='save-btn' :nbutton-click='save' :show-loading.sync='showLoading'>保存基础信息</nbutton>

	</div>
</template>

<script>
var messageBox = require('../../shared/messageBox.vue');
var marked = require('marked');
var moment = require('moment');
var datepicker = require('vue-strap').datepicker;
var nbutton = require('../../shared/nbutton.vue');
var appModel = require('../../app.model.js');
var appAction = require('../../app.action.js');

var _initNewRerecord = function(){
    appModel.newRecord.id = '';
    appModel.newRecord.content = '';
    appModel.newRecord.eventDate = '';
};

module.exports = {
	components: {
		messageBox,
		nbutton,
		datepicker
	},
	data: function(){
		return {
			message: '',
			messageType: 'message',
			showLoading: false,
			bShowMessage: false,
			appModel: appModel
		}
	},
	methods:{
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		},
		save: function(){
			var _method = appModel.newRecord.id ? 'put' : 'post';
			this.$data.showLoading = true;
			this.$http[_method]('/api/records', appModel.newRecord).then(function(res){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'message';
				this.$data.message = '成功了';

				var that = this;
				this.$route.router.go('/manage/editRecord/' + res.data.id);
			}, function(err){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'error';
				if(err.status === 401){
					this.$dispatch('close-modal');
					this.$route.router.go('/login');
				} else {
					this.$data.message = '出错了';
				}
			});
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
		data: function(transition){
			if(transition.to.path !== '/manage/newRecord') {
				// edit
				appAction.GET_RECORD_BY_ID(this.$route.params.recordId);
			}else{
				_initNewRerecord();
			}
		}
	},
	ready: function(){

	},
	filters: {
	    marked: marked,
	    moment: function (date) {
		    return date ? moment(date).format('YYYY-MM-DD') : '';
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.record-edit-holder{
	@extend %content-holder;
	padding: 1rem 1rem 0 $side-width;
	min-height: 40rem;
	.save-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
		width: 12rem;
	}
	.record-input {
		padding: 1rem;
		margin-top: 1rem;
		width: 100%;
		@include border-radius(4px);
	}
	.record-content{
		margin-top: 1rem;
		width: 100%;
		padding: 1rem;
	}
}
</style>