<template>
	<modal-holder modal-title='写文章' modal-class='new-passage-modal'>
		<div slot='modal-body' class='modal-body'>
			<message-box :message-content='registerMessage' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
			<input type='text' placeholder='标题' class='new-passage-input' v-model='registerObj.username' />
			<input type='text' placeholder='标签，用;分隔' class='new-passage-input' v-model='registerObj.username' />
			<textarea class='new-passage-content' rows='20'></textarea>
			<button class='register-btn' v-on:click='register'>确 认</button>
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
				password: '',
				secretCode: ''
			},
			bShowMessage: false,
			registerMessage: '',
			messageType: 'message'
		}
	},
	methods: {
		register: function(){
			
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

.new-passage-modal {
	.modal{
		width: 80rem;
		margin-left: -40rem;
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
		top: 6rem;
	}
	.show-modal-enter,
	.show-modal-leave {
		top: 4rem;
	  	opacity: 0;
	}
	.register-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
		margin: 2rem 0 0 0;
	}
}

.new-passage-input {
	padding: 1rem;
	margin-top: 1rem;
	width: 100%;
	@include border-radius(4px);
}

.new-passage-content {
	width: 100%;
	@include border-radius(4px);
	margin-top: 1rem;
	padding: 0.5rem;
}
</style>