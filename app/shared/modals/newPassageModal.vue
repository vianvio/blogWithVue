<template>
	<modal-holder modal-title='写文章' modal-class='new-passage-modal'>
		<div slot='modal-body' class='vn-modal-body'>
			<message-box :message-content='registerMessage' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
			<input type='text' placeholder='标题' class='new-passage-input' v-model='newPassage.title' />
			<input type='text' placeholder='标签，用;分隔' class='new-passage-input new-passage-label' v-model='newPassage.label' />
			<dropdown dropdown-id='passage' class='new-passage-dropdown'>
			  <button type="button" class="select-btn" data-toggle="dropdown">
			    {{selectedType ? selectedType : '选择分类'}}
			    <span class="caret" v-show='!selectedType'></span>
			  </button>
			  <ul name="dropdown-menu" class="dropdown-menu">
			    <li><a v-on:click='selectType($event, "test")'>Action</a></li>
			    <li><a v-on:click.prevent='selectType($event, "test")'>Another action</a></li>
			    <li><a v-on:click.prevent='selectType($event, "test")'>Something else here</a></li>
			    <li><a v-on:click.prevent='selectType($event, "test")'>Separated link</a></li>
			  </ul>
			</dropdown>
			<div class='new-passage-content-holder'>
				<textarea class='new-passage-content' v-model='newPassage.content' rows='12'></textarea>
				<div class='new-passage-preview' v-html="newPassage.content | marked"></div>
			</div>
			<button class='create-btn' v-on:click.stop='create'>确 认</button>
		</div>
	</modal-holder>
</template>

<script>
var modalHolder = require('../modalHolder.vue');
var messageBox = require('../messageBox.vue');
var dropdown = require('vue-strap').dropdown;
var marked = require('marked');

module.exports = {
	components: {
		modalHolder,
		messageBox,
		dropdown
	},
	data: function(){
		return {
			newPassage: {
				title: '',
				label: '',
				content: '',
				selectedTypeId: ''
			},
			bShowMessage: false,
			registerMessage: '',
			messageType: 'message',
			selectedType: ''
		}
	},
	methods: {
		create: function(){
			this.$broadcast('toggleDropdown', 'passage');
		},
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		},
		selectType: function(event, _type){
			this.$data.selectedType = _type;
			this.$broadcast('toggleDropdown', 'passage');
			// event.target.parentElement.parentElement.parentElement.classList.remove('open');
		}
	},
	ready: function(){

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
		font-size: 22px;
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
		margin: 2rem 0 0 0;
	}
	.select-btn {
		@extend %blog-btn;
		height: 4.3rem;
		background-color: $basic-blue;
		color: #fff;
		margin: 1rem 0 0 0;
	}
}

.new-passage-dropdown{
	float: left;
	margin-right: 0.4rem;
}

.new-passage-input.new-passage-label{
	width: 80%;
}

.new-passage-input {
	padding: 1rem;
	margin-top: 1rem;
	width: 100%;
	@include border-radius(4px);
}
.new-passage-content-holder{
	margin-top: 1rem;
	height: 280px;
	border: 1px solid $shadow-dark;
	@include border-radius(4px);
	.new-passage-content {
		float: left;
		width: 48%;
		border: none;
		padding: 1rem 1rem 0 1rem;
	}
	.new-passage-preview {
		overflow: auto;
		height: 100%;
		border-left: 1px solid $shadow-dark;
		padding-left: 1rem;
	}
}
</style>