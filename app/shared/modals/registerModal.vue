<template>
	<modal-holder modal-title='注 册' modal-class='register-modal'>
		<div slot='modal-body' class='vn-modal-body'>
			<message-box :message-content='registerMessage' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
			<input type='text' placeholder='用户名' class='register-input' v-model='registerObj.username' />
			<input type='password' placeholder='密码' class='register-input' v-model='registerObj.password' />
			<input type='text' placeholder='识别码' class='register-input' v-model='secretCode' />
			<nbutton btn-class='register-btn' :nbutton-click='register' :show-loading.sync='showLoading' >确 认</nbutton>
		</div>
	</modal-holder>
</template>

<script>
var modalHolder = require('../modalHolder.vue');
var messageBox = require('../messageBox.vue');
var nbutton = require('../nbutton.vue');

module.exports = {
	components: {
		modalHolder,
		messageBox,
		nbutton
	},
	data: function(){
		return {
			registerObj: {
				username: '',
				password: ''
			},
			secretCode: '',
			bShowMessage: false,
			registerMessage: '',
			messageType: 'message',
			showLoading: false
		}
	},
	methods: {
		register: function(){
			// front-end check secret code
			if(this.secretCode === 'vBlog') {
				this.$data.showLoading = true;
				this.$http.post('/api/userModels', this.registerObj).then(function(resp){
					this.$data.showLoading = false;
					this.$data.bShowMessage = true;
					this.$data.messageType = 'message';
					this.$data.registerMessage = resp.data.message;
					var that = this;
					setTimeout(function() {
						that.$dispatch('close-modal');
					}, 1000);
				}, function(err){
					this.$data.showLoading = false;
					this.$data.bShowMessage = true;
					this.$data.messageType = 'error';
					if(err.status === 422){
						this.$data.registerMessage = '用户名已存在';
					} else {
						this.$data.registerMessage = '服务器崩了';
					}
				});
			} else {
				this.$data.bShowMessage = true;
				this.$data.messageType = 'error';
				this.$data.registerMessage = '识别码错误，需要账号请联系gloomy_wind@hotmail.com';
			}
		},
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		}
	},
	ready: function(){

	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.register-modal {
	@include modalDisplayTransition(.3s, 17rem, 19rem);
	.vn-modal {
		width: 38rem;
		margin-left: -19rem;
	}
	.vn-modal-title{
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
	.vn-modal-body{
		padding: 1.5rem;
	}
	.register-btn {
		
		background-color: $basic-blue;
		color: #fff;
		width: 100%;
		margin: 2rem 0 0 0;
	}
}

.register-input {
	padding: 1rem;
	margin-top: 1rem;
	width: 100%;
	@include border-radius(4px);
}
</style>