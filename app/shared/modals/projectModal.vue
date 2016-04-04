<template>
	<modal-holder modal-title='项目经历' modal-class='project-modal'>
		<div slot='modal-body' class='vn-modal-body'>
			<message-box :message-content='message' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
			<div class='col-xs-6'>
				<input type='text' placeholder='from' class='project-input' v-model='appModel.newProject.from' />
			</div>
			<div class='col-xs-6'>
				<input type='text' placeholder='to' class='project-input' v-model='appModel.newProject.to' />
			</div>
			<div class='col-xs-6'>
				<input type='text' placeholder='name' class='project-input' v-model='appModel.newProject.name' />
			</div>
			<div class='col-xs-6'>
				<input type='text' placeholder='technology' class='project-input' v-model='appModel.newProject.technology' />
			</div>
			<textarea class='project-content' placeholder='description' v-model='appModel.newProject.description' rows='4'></textarea>
			<textarea class='project-content' placeholder='responsibility' v-model='appModel.newProject.responsibility' rows='4'></textarea>
			<nbutton btn-class='create-btn' :nbutton-click='create' :show-loading.sync='showLoading' >确 认</nbutton>
		</div>
	</modal-holder>
</template>

<script>
var modalHolder = require('../modalHolder.vue');
var messageBox = require('../messageBox.vue');
var nbutton = require('../nbutton.vue');
var appModel = require('../../app.model.js');

var _initNewProject = function(){
	appModel.newProject = {
	    id: '',
	    from: '',
	    to: '',
	    name: '',
	    title: '',
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
			var _method = this.$data.appModel.newProject.id ? 'put' : 'post';
			this.$data.showLoading = true;
			this.$http[_method]('/api/projects', this.$data.appModel.newProject).then(function(res){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'message';
				this.$data.message = '成功了';

				var that = this;
				setTimeout(function() {
					_initNewProject();
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
		if(!this.$data.appModel.newProject.id){
			_initNewProject();
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.project-modal {
	@include modalDisplayTransition(.3s, 10rem, 12rem);
	.vn-modal {
		width: 80rem;
		margin-left: -40rem;
	}
	.vn-modal-title {
		font-weight: bold;
		font-size: 22px;
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
	.project-input {
		padding: 1rem;
		margin-top: 1rem;
		width: 100%;
		@include border-radius(4px);
	}
	.project-content{
		margin-top: 1rem;
		width: 100%;
		padding: 1rem;
	}
}
</style>