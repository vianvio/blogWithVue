<template>
	<div class='vn-modal-holder full-height' v-bind:class='modalClass'>
		<div class='vn-modal' v-if='bShowModal' transition='show-modal'>
			<slot name='modal-header'>
				<div class='vn-modal-header'>
					<span class='vn-modal-title'>{{modalTitle}}</span>
					<div class='fa fa-remove vn-modal-closer float-right' v-on:click='close'></div>
				</div>
			</slot>
			<slot name='modal-body'></slot>
			<slot name='modal-footer'>
				<div class='nv-modal-footer'>
					
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

.vn-modal-holder {
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

.vn-modal {
	position: absolute;
	width: 60rem;
	left: 50%;
	margin-left: -30rem;
	background-color: #fff;
	padding: 0.5rem 0;
	@include border-radius(4px);
	overflow: hidden;
}

.vn-modal-header {
	min-height: 3rem;
	font-size: 2rem;
	padding: 0 1rem;
	border-bottom: 1px solid $shadow-dark;
}

.vn-modal-closer {
	cursor: pointer;
	height: 2.5rem;
	width: 2.5rem;
	text-align: center;
	line-height: 2.5rem;
	&:hover {
		@include border-radius(50%);
		background-color: $shadow-dark;
	}
}

</style>