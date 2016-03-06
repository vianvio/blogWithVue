<template>
	<div class='login-holder'>
		<div class='login-label-holder'>
			<STRONG class='login-label'>登 录</STRONG>
		</div>
		<message-box :message-content='loginMessage' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
		<div class='login-input-holder position-relative'>
			<span class='fa fa-user login-input-icon'></span>
			<input type='text' class='login-input' v-model='loginObj.username' v-on:keyup.13='login' />
		</div>
		<div class='login-input-holder position-relative'>
			<span class='fa fa-lock login-input-icon'></span>
			<input type='password' class='login-input' v-model='loginObj.password' v-on:keyup.13='login' />
		</div>
		<button class='login-btn float-left' v-on:click='login'>确 认</button>
		<button class='register-btn float-right' v-on:click='showRegisterModal'>注 册</button>
	</div>
	<register-modal v-if='bShowRegisterModal' v-on:close-modal='closeModal'></register-modal>
</template>

<script>
var registerModal = require('../shared/modals/registerModal.vue');
var messageBox = require('../shared/messageBox.vue');

module.exports = {
	components: {
		registerModal,
		messageBox
	},
	data: function(){
		return {
			bShowRegisterModal: false,
			loginObj: {
				username: '',
				password: ''
			},
			bShowMessage: false,
			loginMessage: '',
			messageType: 'message'
		}
	},
	methods: {
		showRegisterModal: function(){
			this.$data.bShowRegisterModal = true;
		},
		closeModal: function(){
			this.$data.bShowRegisterModal = false;
		},
		login: function(){
			var that = this;
			this.$http.post('/api/userModels/login', this.loginObj).then(function(resp){
				// set token
				that.$http.headers.common['Authorization'] = resp.data.id;
				sessionStorage.clear();
				sessionStorage.setItem('token', resp.data.id);
				sessionStorage.setItem('userId', resp.data.userId);
				sessionStorage.setItem('userName', resp.data.userName);
				that.$route.router.go('/manage');
			}, function(err){
				this.$data.bShowMessage = true;
				this.$data.messageType = 'error';
				if(err.status === 401){
					this.$data.loginMessage = '用户名或密码错误';
				} else if(err.status === 400){
					this.$data.loginMessage = '不要留空';
				} else {
					this.$data.loginMessage = '服务器崩了';
				}
			});
		},
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		}
	},
	route: {
		activate: function(transition){
			sessionStorage.clear();
			transition.next();
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.login-holder {
	width: 40rem;
	min-height: 28rem;
	margin: 10rem auto;
	padding: 3rem 3rem 7rem 3rem;
	@extend %material-shadow;
	.login-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
	}

	.register-btn {
		@extend %blog-btn;
		background-color: $light-coffee;
		color: #fff;
	}
}

.login-label-holder {
	text-align: right;
	padding-right: 1rem;
	margin-bottom: 2rem;
}

.login-label {
	font-size: 30px;
	color: $dark-coffee;
}

.login-input-holder {
	height: 4rem;
	border: 1px solid $shadow-dark;
	margin: 1rem 0 2rem 0;
	overflow: hidden;
	@include border-radius(4px);
}

.login-input-icon {
	position: absolute;
	line-height: 4rem;
	width: 4rem;
	text-align: center;
	color: $shadow-dark;
	border-right: 1px solid $shadow-dark;
	font-size: 20px;
}

.login-input {
	border: none !important;
	width: 100%;
	padding: 1rem 1rem 0 5rem;
	color: $font-dark;
}
</style>