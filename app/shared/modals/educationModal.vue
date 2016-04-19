<template>
	<modal-holder modal-title='教育经历' modal-class='education-modal'>
		<div slot='modal-body' class='vn-modal-body'>
			<message-box :message-content='message' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
			<div class='col-xs-6'>
				<input type='text' placeholder='from' class='education-input' v-model='appModel.newEducation.from' />
			</div>
			<div class='col-xs-6'>
				<input type='text' placeholder='to' class='education-input' v-model='appModel.newEducation.to' />
			</div>
			<div class='col-xs-6'>
				<input type='text' placeholder='name' class='education-input' v-model='appModel.newEducation.name' />
			</div>
			<div class='col-xs-6'>
				<input type='text' placeholder='major' class='education-input' v-model='appModel.newEducation.major' />
			</div>
			<textarea class='education-content' v-model='appModel.newEducation.description' rows='4'></textarea>
			<nbutton btn-class='create-btn' :nbutton-click='create' :show-loading.sync='showLoading' >确 认</nbutton>
		</div>
	</modal-holder>
</template>

<script>
var modalHolder = require('../modalHolder.vue');
var messageBox = require('../messageBox.vue');
var nbutton = require('../nbutton.vue');
var appModel = require('../../app.model.js');

var _initNewEducation = function(){
	appModel.newEducation = {
	    id: '',
	    from: '',
	    to: '',
	    name: '',
	    major: '',
	    description: '',
	    resumeId: appModel.newResume.id
	};
};

module.exports = {
	components: {
		modalHolder,
		messageBox,
		nbutton
	},
	data: function(){
		return {
			bShowMessage: false,
			message: '',
			messageType: 'error',
			showLoading: false,
			appModel: appModel
		}
	},
	methods: {
		create: function(){
			var _method = this.$data.appModel.newEducation.id ? 'put' : 'post';
			this.$data.showLoading = true;
			this.$http[_method]('/api/educations', this.$data.appModel.newEducation).then(function(res){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'message';
				this.$data.message = '成功了';

				var that = this;
				setTimeout(function() {
					_initNewEducation();
					that.$dispatch('close-modal');
				}, 1000);
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
		},
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		}
	},
	ready: function(){
		if(!this.$data.appModel.newEducation.id){
			_initNewEducation();
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.education-modal {
	@include modalDisplayTransition(.3s, 10rem, 12rem);
	.vn-modal {
		width: 80rem;
		margin-left: -40rem;
	}
	.vn-modal-title {
		font-weight: bold;
		font-size: 2.2rem;
		color: $dark-coffee;
		padding: 1rem 0 1rem 1rem;
		display: inline-block;
	}
	.vn-modal-closer {
		margin-top: 1.2rem;
		margin-right: 0.2rem;
	}
	.vn-modal-body {
		padding: 1.5rem;
	}
	.create-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
		display: block;
		width: 15rem;
		margin: 2rem auto 0 auto;
	}
	.education-input {
		padding: 1rem;
		margin-top: 1rem;
		width: 100%;
		@include border-radius(4px);
	}
	.education-content{
		margin-top: 1rem;
		width: 100%;
		padding: 1rem;
	}
}
</style>