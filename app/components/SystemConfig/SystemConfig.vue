<template>
	<div class='system-config-holder'>
		<nbutton btn-class='new-passage-type-btn' :nbutton-click='showCreatePassageType' :show-loading.sync='showLoading' >新增日志类型</nbutton>
		<table class="table table-striped table-hover">
			<thead>
				<td>名称</td>
				<td>失效</td>
			</thead>
			<tbody>
				<tr v-for='passageType in appModel.arrPassageTypes'>
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
var nbutton = require('../../shared/nbutton.vue');
var appAction = require('../../app.action.js');

module.exports = {
	components: {
		newPassageTypeModal,
		nbutton
	},
	data: function(){
		return {
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
			appAction.GET_PASSAGE_TYPES();
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
	 	    appAction.GET_PASSAGE_TYPES();
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
		background-color: $basic-blue;
		color: #fff;
	}
}
</style>