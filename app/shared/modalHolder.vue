<template>
	<div class='modal-holder full-height' v-bind:class='modalClass'>
		<div class='modal' v-if='bShowModal' transition='show-modal'>
			<slot name='modal-header'>
				<div class='modal-header'>
					<span class='modal-title'>{{modalTitle}}</span>
					<div class='fa fa-remove modal-closer float-right' v-on:click='close'></div>
				</div>
			</slot>
			<slot name='modal-body'></slot>
			<slot name='modal-footer'>
				<div class='modal-footer'>
					
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
module.exports = {
	name: 'modalHolder',
	data: function(){
		return {
			bShowModal: false
		}
	},
	props: {
		modalTitle: String,
		modalClass: String
	},
	methods:{
		close: function(){
			this.$data.bShowModal = false;
		}
	},
	ready: function(){
		this.$data.bShowModal = true;
	},
	transitions: {
		showModal: {
			afterLeave: function(el){
				this.$dispatch('close-modal');
			}
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.modal-holder {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 999;
	overflow: auto;
	&:before { 
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0.4;
		background-color: #000;
		width: 100%;
		height: 100%;
	}
}

.modal {
	position: absolute;
	width: 60rem;
	left: 50%;
	margin-left: -30rem;
	background-color: #fff;
	padding: 0.5rem 0;
	@include border-radius(4px);
	overflow: hidden;
	transition: all .3s ease;
	opacity: 1;
	top: 8rem;
}

.modal-header {
	min-height: 3rem;
	font-size: 20px;
	padding: 0 1rem;
	border-bottom: 1px solid $shadow-dark;
}

.modal-closer {
	cursor: pointer;
	height: 25px;
	width: 25px;
	text-align: center;
	line-height: 25px;
	&:hover {
		@include border-radius(50%);
		background-color: $shadow-dark;
	}
}

.show-modal-transition {
	}

.show-modal-enter, 
.show-modal-leave {
	top: 6rem;
  	opacity: 0;
}

</style>