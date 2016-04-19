<template>
	<div class='message-box-holder' v-bind:class='messageBoxClass'>
		<div class='fa fa-remove message-box-closer float-right' v-if='closable' v-on:click='close'></div>
		<slot name='message-content'>
			{{messageContent}}
		</slot>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			
		}
	},
	computed: {
		messageBoxClass: function(){
			return 'box-type-' + this.messageType;
		}
	},
	props: {
		messageType: {
			type: String,
			default: 'message'
		},
		messageContent: String,
		closable: {
			type: Boolean,
			default: false
		}
	},
	methods:{
		close: function(){
			this.$dispatch('close-message-box');
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.message-box-holder {
	border: 1px solid;
	@include border-radius(4px);
	padding: 1rem 1.5rem;
	font-size: 1.4rem;
}
.box-type-message {
	border-color: $basic-green;
	color: $dark-green;
	background-color: $light-green;
}
.box-type-warn {
	border-color: $basic-yellow;
	color: $dark-yellow;
	background-color: $light-yellow;
}
.box-type-error {
	border-color: $basic-red;
	color: $dark-red;
	background-color: $light-red;
}
.message-box-closer {
	cursor: pointer;
	font-size: 1.2rem;
	text-align: center;
	padding-top: 0.2rem;
	color: $light-dark;
	&:hover {
		@include border-radius(50%);
		color: $basic-dark;
	}
}
</style>