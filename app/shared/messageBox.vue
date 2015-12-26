<template>
	<div class='message-box-holder' v-bind:class='messageBoxClass'>
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
		messageContent: String
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
	font-size: 14px;
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
</style>