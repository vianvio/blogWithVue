<template>
	<modal-holder modal-title='文章预览' modal-class='new-passage-modal'>
		<div slot='modal-body' class='vn-modal-body'>
			<div class='new-passage-preview' v-html="appModel.newPassage.content | marked"></div>
		</div>
	</modal-holder>
</template>

<script>
var modalHolder = require('../modalHolder.vue');
var marked = require('marked');
var appModel = require('../../app.model.js');

module.exports = {
	components: {
		modalHolder
	},
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods: {
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		}
	},
	filters: {
	    marked: marked
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.new-passage-modal {
	@include modalDisplayTransition(.3s, 4rem, 6rem);
	.vn-modal {
		width: 80rem;
		margin-left: -40rem;
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
	}
	.new-passage-preview{
		min-height: 30rem;
		max-height: 50rem;
		overflow: auto;
		padding: 1.5rem;
	}
}
</style>