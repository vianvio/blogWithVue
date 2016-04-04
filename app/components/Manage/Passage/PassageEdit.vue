<template>
	<div class='passage-edit-holder'>
		<message-box :message-content='message' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
		<input type='text' placeholder='标题' class='new-passage-input' v-model='appModel.newPassage.title' />
		<dropdown dropdown-id='passage' class='new-passage-dropdown'>
		  <button type="button" class="select-btn" data-toggle="dropdown">
		    {{appModel.passageRelatedInfo.passageType ? appModel.passageRelatedInfo.passageType : '选择分类'}}
		    <span class="caret" v-show='!appModel.passageRelatedInfo.passageType'></span>
		  </button>
		  <ul name="dropdown-menu" class="dropdown-menu">
		    <li v-for='passageType in appModel.arrPassageTypes' track-by='$index'><a v-on:click='selectType($event, passageType.id, passageType.name)'>{{passageType.name}}</a></li>
		  </ul>
		</dropdown>
		<div class='new-passage-label-holder'>
			<input type='text' placeholder='标签，用;分隔' class='new-passage-input' v-model='appModel.newPassage.tag' />
		</div>
		<textarea class='new-passage-content' v-model='appModel.newPassage.content' rows='18'></textarea>
		<nbutton btn-class='create-btn float-right' :nbutton-click='save' :show-loading.sync='showLoading'>保 存</nbutton>
		<nbutton btn-class='preview-btn float-right' :nbutton-click='showCreatePassage'>预 览</nbutton>
	</div>
	<new-passage-modal v-if='bShowPreviewModal' v-on:close-modal='closeModal'></new-passage-modal>
</template>

<script>
var newPassageModal = require('../../../shared/modals/newPassageModal.vue');
var messageBox = require('../../../shared/messageBox.vue');
var dropdown = require('vue-strap').dropdown;
var marked = require('marked');
var nbutton = require('../../../shared/nbutton.vue');
var appModel = require('../../../app.model.js');
var appAction = require('../../../app.action.js');

var _initNewPassage = function(){
	appModel.newPassage = {
		id: '',
	    title: '',
	    label: '',
	    content: '',
	    passageTypeId: ''
	};
};

module.exports = {
	components: {
		newPassageModal,
		messageBox,
		dropdown,
		nbutton
	},
	data: function(){
		return {
			bShowPreviewModal: false,
			message: '',
			messageType: 'message',
			showLoading: false,
			bShowMessage: false,
			appModel: appModel
		}
	},
	methods:{
		showCreatePassage: function(){
			this.$data.bShowPreviewModal = true;
		},
		closeModal: function(){
			this.$data.bShowPreviewModal = false;
		},
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		},
		selectType: function(event, selectedId, selectedName){
			this.$data.appModel.newPassage.passageTypeId = selectedId;
			this.$data.appModel.passageRelatedInfo.passageType = selectedName;
			this.$broadcast('toggleDropdown', 'passage');
			// event.target.parentElement.parentElement.parentElement.classList.remove('open');
		},
		save: function(){
			var _methods = this.$route.path === '/manage/newPassage' ? 'post' : 'put';
			this.$data.showLoading = true;
			this.$http[_methods]('/api/passages', this.$data.appModel.newPassage).then(function(res){
				this.$data.showLoading = false;
				_initNewPassage();
				this.$data.appModel.passageRelatedInfo.passageType = '';
				this.$route.router.go('/manage/passage');
			}, function(error){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'error';
				if(error.status === 401){
					this.$route.router.go('/login');
				}else{
					this.$data.message = '出错了';
				}
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
		data: function(transition){
			appAction.GET_PASSAGE_TYPES();
		}
	},
	ready: function(){
		if(!this.$data.appModel.newPassage.id){
			_initNewPassage();
		}
	}
};
</script>

<style lang='sass'>
@import '../../../variables.scss';
@import '../../../common.scss';

.passage-edit-holder{
	@extend %content-holder;
	.create-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
		width: 12rem;
	}
	.preview-btn {
		@extend %blog-btn;
		width: 12rem;
		background-color: $light-coffee;
		color: #fff;
		margin-right: 1rem;
	}
	.select-btn {
		@extend %blog-btn;
		height: 4.3rem;
		width: 15rem;
		background-color: $basic-blue;
		color: #fff;
		margin: 1rem 0 0 0;
		float: left;
	}
	.new-passage-dropdown{
		float: left;
		margin-right: 0.4rem;
	}

	.new-passage-label-holder{
		overflow: hidden;
	}

	.new-passage-input {
		padding: 1rem;
		margin-top: 1rem;
		width: 100%;
		@include border-radius(4px);
	}
	.new-passage-content{
		margin-top: 1rem;
		width: 100%;
		padding: 1rem;
	}
}
</style>