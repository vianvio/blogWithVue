<template>
	<modal-holder modal-title='注 册' modal-class='register-modal'>
		<div slot='modal-body' class='modal-body'>
			<message-box :message-content='registerMessage' message-type='message' v-if='bShowMessage'></message-box>
			<input type='text' placeholder='用户名' class='register-input' v-model='registerObj.username' />
			<input type='password' placeholder='密码' class='register-input' v-model='registerObj.password' />
			<button class='register-btn' v-on:click='register()'>确 认</button>
		</div>
	</modal-holder>
</template>

<script>
var modalHolder = require('../modalHolder.vue');
var messageBox = require('../messageBox.vue');

module.exports = {
	components: {
		modalHolder,
		messageBox
	},
	data: function(){
		return {
			registerObj: {
				username: '',
				password: ''
			},
			bShowMessage: false,
			registerMessage: ''
		}
	},
	methods: {
		register: function(){
			this.$http.post('/api/userModels', this.registerObj).then(function(resp){
				this.$data.bShowMessage = true;
				this.$data.registerMessage = resp.data.message;
				var that = this;
				setTimeout(function() {
					that.$dispatch('close-modal');
				}, 1000);
			}, function(err){
				console.log(err);
			});
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
	.modal{
		width: 38rem;
		margin-left: -19rem;
	}
	.modal-closer {
		margin-top: 0.5rem;
	}
	.modal-title{
		font-weight: bold;
		font-size: 20px;
		color: $dark-coffee;
		padding: 0.5rem 0 1rem 1rem;
		display: inline-block;
	}
	.modal-body{
		padding: 1.5rem;
	}
	.show-modal-transition {
		transition: all .3s ease;
		opacity: 1;
		top: 22rem;
	}
	.show-modal-enter, .show-modal-leave {
		top: 20rem;
	  	opacity: 0;
	}
	.register-btn {
		@extend %blog-btn;
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
	border: 1px solid $shadow-dark;
	@include border-radius(4px);
}
</style>