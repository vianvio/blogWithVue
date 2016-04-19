<template>
	<modal-holder modal-title='新增日志类型' modal-class='new-passage-type-modal'>
		<div slot='modal-body' class='vn-modal-body'>
			<message-box :message-content='message' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
			<input type='text' placeholder='类型名称' class='new-passage-type-input' v-model='newPassageType.name' />
			<nbutton btn-class='create-btn' :nbutton-click='create' :show-loading.sync='showLoading' >确 认</nbutton>
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
			newPassageType: {
				name: ''
			},
			bShowMessage: false,
			message: '',
			messageType: 'error',
			showLoading: false
		}
	},
	methods: {
		create: function(){
			this.$data.showLoading = true;
			this.$http.post('/api/passageTypes', this.newPassageType).then(function(res){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'message';
				this.$data.message = '成功了';
				var that = this;
				setTimeout(function() {
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

	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.new-passage-type-modal {
	@include modalDisplayTransition(.3s, 10rem, 12rem);
	.vn-modal {
		width: 50rem;
		margin-left: -25rem;
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
}

.new-passage-type-input {
	padding: 1rem;
	margin-top: 1rem;
	width: 100%;
	@include border-radius(4px);
}
</style>