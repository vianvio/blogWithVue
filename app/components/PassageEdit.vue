<template>
	<div class='passage-edit-holder'>
		<div class='tool-bar float-left'>
			<button class='new-passage-btn float-right' v-on:click='showCreatePassage'>新 建</button>
		</div>
		<div class='content float-left'>
			
		</div>
	</div>
	<new-passage-modal v-if='bShowCreatePassageModal' v-on:close-modal='closeModal'></new-passage-modal>
</template>

<script>
var newPassageModal = require('../shared/modals/newPassageModal.vue');
// var appConfig = require('../config.service.js');

module.exports = {
	components: {
		newPassageModal
	},
	data: function(){
		return {
			bShowCreatePassageModal: false
		}
	},
	methods:{
		showCreatePassage: function(){
			this.$data.bShowCreatePassageModal = true;
		},
		closeModal: function(){
			this.$data.bShowCreatePassageModal = false;
		}
	},
	created: function(){
		
	},
	route: {
		activate: function(transition){
			if(!sessionStorage.getItem('token')){
				this.$route.router.go('/login');
			}
			transition.next();
		}
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.passage-edit-holder{
	padding: 1rem 1rem 0 1rem;
	.tool-bar {
		padding-bottom: 1.5rem;
		width: 100%;
		display: table-cell;
		vertical-align: middle;
	}
	.content{
		width: 100%;
	}
}

.new-passage-btn{
	@extend %blog-btn;
	width: 10rem;
	background-color: $basic-blue;
	color: #fff;
}
</style>