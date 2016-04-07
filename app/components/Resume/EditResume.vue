<template>
	<div class='resume-edit-holder'>
		<message-box :message-content='message' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
		<input type='text' placeholder='简历名称' class='resume-input' v-model='appModel.newResume.title' />
		<h4>基础信息</h4>
		<div class='col-xs-6'>
			<input type='text' placeholder='姓名' class='resume-input' v-model='appModel.newResume.name' />
		</div>
		<div class='col-xs-6'>
			<input type='text' placeholder='出生年月' class='resume-input' v-model='appModel.newResume.birthday' />
		</div>
		<div class='col-xs-6'>
			<input type='text' placeholder='手机' class='resume-input' v-model='appModel.newResume.phone' />
		</div>
		<div class='col-xs-6'>
			<input type='text' placeholder='邮箱' class='resume-input' v-model='appModel.newResume.email' />
		</div>
		<div class='col-xs-6'>
			<input type='text' placeholder='微信' class='resume-input' v-model='appModel.newResume.wechat' />
		</div>
		<div class='col-xs-6'>
			<input type='text' placeholder='QQ' class='resume-input' v-model='appModel.newResume.qq' />
		</div>
		<textarea class='resume-content' v-model='appModel.newResume.selfAssignment' rows='5'></textarea>
		<nbutton btn-class='save-btn' :nbutton-click='saveBasicInfo' :show-loading.sync='showLoading'>保存基础信息</nbutton>
		<hr/>
		<h4>教育经历</h4>
		<div class='resume-info-holder' v-for='education in appModel.arrEducation' track-by='$index'>
			<nbutton btn-class='save-btn' :nbutton-click='showModal("bShowEducationModal", education.id)'>修改教育经历</nbutton>
			<div>
				<span class='col-xs-4'>{{education.from}} - {{education.to}}</span>
				<span class='col-xs-4'>{{education.name}}</span>
				<span class='col-xs-4'>{{education.major}}</span>
			</div>
			<div v-html='education.description | marked'></div>
		</div>
		<nbutton btn-class='new-record-btn' :nbutton-click='showModal("bShowEducationModal")'>添加教育经历</nbutton>
		<hr/>
		<h4>工作经历</h4>
		<div class='resume-info-holder' v-for='job in appModel.arrJob' track-by='$index'>
			<nbutton btn-class='save-btn' :nbutton-click='showModal("bShowJobModal", job.id)'>修改工作经历</nbutton>
			<div>
				<span class='col-xs-4'>{{job.from}} - {{job.to}}</span>
				<span class='col-xs-4'>{{job.name}}</span>
				<span class='col-xs-4'>{{job.title}}</span>
			</div>
			<div v-html='job.description | marked'></div>
		</div>
		<nbutton btn-class='new-record-btn' :nbutton-click='showModal("bShowJobModal")'>添加工作经历</nbutton>
		<hr/>
		<h4>项目经历</h4>
		<div class='resume-info-holder' v-for='project in appModel.arrProject' track-by='$index'>
			<nbutton btn-class='save-btn' :nbutton-click='showModal("bShowProjectModal", project.id)'>修改项目经历</nbutton>
			<div>
				<span class='col-xs-4'>{{project.from}} - {{project.to}}</span>
				<span class='col-xs-4'>{{project.name}}</span>
				<span class='col-xs-4'>{{project.technology}}</span>
			</div>
			<div v-html='project.description | marked'></div>
			<div v-html='project.responsibility | marked'></div>
		</div>
		<nbutton btn-class='new-record-btn' :nbutton-click='showModal("bShowProjectModal")'>添加项目经历</nbutton>
	</div>
	<education-modal v-if='bShowEducationModal' v-on:close-modal='closeModal("education")'></education-modal>
	<job-modal v-if='bShowJobModal' v-on:close-modal='closeModal("job")'></job-modal>
	<project-modal v-if='bShowProjectModal' v-on:close-modal='closeModal("project")'></project-modal>
</template>

<script>
var messageBox = require('../../shared/messageBox.vue');
var dropdown = require('vue-strap').dropdown;
var marked = require('marked');
var nbutton = require('../../shared/nbutton.vue');
var appModel = require('../../app.model.js');
var appAction = require('../../app.action.js');
var educationModal = require('../../shared/modals/educationModal.vue');
var jobModal = require('../../shared/modals/jobModal.vue');
var projectModal = require('../../shared/modals/projectModal.vue');

var _initNewResume = function(){
	appModel.newResume.id = '';
    appModel.newResume.title = '';
    appModel.newResume.name = '';
    appModel.newResume.birthday = '';
    appModel.newResume.phone = '';
    appModel.newResume.email = '';
    appModel.newResume.wechat = '';
    appModel.newResume.qq = '';
    appModel.newResume.selfAssignment = '';
};

module.exports = {
	components: {
		messageBox,
		dropdown,
		nbutton,
		educationModal,
		jobModal,
		projectModal
	},
	data: function(){
		return {
			message: '',
			messageType: 'message',
			showLoading: false,
			bShowMessage: false,
			appModel: appModel,
			bShowEducationModal: false,
			bShowJobModal: false,
			bShowProjectModal: false,
			showModal: function(modalController, id){
				var that = this;
				return function(){
					var _type = /Education|Project|Job/gi.exec(modalController).pop();
					if(id){
						// get latest info
						appAction['GET_' + _type.toUpperCase() + '_BY_ID'](id).then(function(){
							that.$data[modalController] = true;
						});
					}else{
						appModel['new' + _type].id = '';
						that.$data[modalController] = true;
					}
				}
			}
		}
	},
	methods:{
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		},
		saveBasicInfo: function(){
			var _method = appModel.newResume.id ? 'put' : 'post';
			this.$data.showLoading = true;
			this.$http[_method]('/api/resumes', appModel.newResume).then(function(res){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'message';
				this.$data.message = '成功了';

				var that = this;
				this.$route.router.go('/manage/editResume/' + res.data.id);
			}, function(err){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'error';
				if(err.status === 401){
					this.$dispatch('close-modal');
					this.$route.router.go('/login');
				} else {
					this.$data.message = '出错了';
				}
			});
		},
		closeModal: function(modalType){
			this.$data.bShowEducationModal = false;
			this.$data.bShowJobModal = false;
			this.$data.bShowProjectModal = false;
			// todo: get new data according to modalType
			var _type = /Education|Project|Job/gi.exec(modalType).pop().toUpperCase();
			appAction['GET_' + _type + '_LIST']();
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
			if(transition.to.path !== '/manage/newResume') {
				// edit
				// set id before callback
				appModel.newResume.id = this.$route.params.resumeId;
				appAction.GET_RESUME_BY_ID(this.$route.params.resumeId, true);
			} else {
				_initNewResume();
			}
			appAction.GET_EDUCATION_LIST(true);
			appAction.GET_JOB_LIST(true);
			appAction.GET_PROJECT_LIST(true);
		}
	},
	ready: function(){

	},
	filters: {
	    marked: marked,
	    moment: function (date) {
		    return moment(date).format('YYYY-MM-DD');
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.resume-edit-holder{
	@extend %content-holder;
	padding: 1rem 1rem 0 $side-width;
	.save-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
		width: 12rem;
	}
	.new-record-btn {
		@extend %blog-btn;
		background-color: $light-coffee;
		color: #fff;
		width: 12rem;
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
	.resume-input {
		padding: 1rem;
		margin-top: 1rem;
		width: 100%;
		@include border-radius(4px);
	}
	.resume-content{
		margin-top: 1rem;
		width: 100%;
		padding: 1rem;
	}
	.resume-info-holder{
		border-bottom: 1px dashed $shadow-dark;
	}
}
</style>