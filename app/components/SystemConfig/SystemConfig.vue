<template>
	<div class='system-config-holder'>
		<button class='new-passage-type-btn' v-on:click='showCreatePassageType'>新增日志类型</button>
		<table class="table table-striped table-hover">
			<thead>
				<td>名称</td>
				<td>失效</td>
			</thead>
			<tbody>
				<tr v-for='passageType in arrPassageTypes'>
					<td>{{passageType.name}}</td>
					<td><input type='checkbox' v-model='passageType.bDisabled' disabled="true" /></td>
				</tr>
			</tbody>
		</table>
	</div>
	<new-passage-type-modal v-if='bShowCreatePassageTypeModal' v-on:close-modal='closeModal'></new-passage-type-modal>
</template>

<script>
var appModel = require('../../app.model.js');
var newPassageTypeModal = require('../../shared/modals/newPassageTypeModal.vue');

module.exports = {
	components: {
		newPassageTypeModal
	},
	data: function(){
		return {
			arrPassageTypes: [],
			bShowCreatePassageTypeModal: false,
			appModel: appModel
		}
	},
	methods:{
		showCreatePassageType: function(){
			this.$data.bShowCreatePassageTypeModal = true;
		},
		closeModal: function(){
			this.$data.bShowCreatePassageTypeModal = false;
			// refresh data
			this.$data.appModel.bLoading = true;
			this.$http.get('/api/passageTypes').then(function(res){
				this.$data.appModel.bLoading = false;
				this.$data.arrPassageTypes = res.data;
			});
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
		},
		data: function(transition) {
	 	  // var userId = transition.to.params.userId
	 	  this.$data.appModel.bLoading = true;
		  return this.$http.get('/api/passageTypes').then(function(res){
		  	this.$data.appModel.bLoading = false;
	      	return {
	      		arrPassageTypes: res.data
	      	}
	      });
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.system-config-holder{
	@extend %content-holder;
	.new-passage-type-btn{
		@extend %blog-btn;
		width: auto;
		padding: 0 1.5rem;
		background-color: $basic-blue;
		color: #fff;
	}
}
</style>