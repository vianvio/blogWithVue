<template>
	<div class='resume-list-holder'>
		<nbutton btn-class='new-resume-btn' :nbutton-click='newResume'>新增简历</nbutton>
		<table class="table table-hover">
			<thead>
				<td>名称</td>
				<td>操作</td>
			</thead>
			<tbody>
				<tr v-for='resume in appModel.arrResume'>
					<td class='resume-title'>{{resume.title}}</td>
					<td><nbutton btn-class='new-resume-btn' :nbutton-click='editResume(resume.id)'>修改</nbutton></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
var appModel = require('../../app.model.js');
var nbutton = require('../../shared/nbutton.vue');
var appAction = require('../../app.action.js');

module.exports = {
	components: {
		nbutton
	},
	data: function(){
		return {
			appModel: appModel,
			editResume: function(resumeId){
				var that = this;
				return function(){
					that.$route.router.go('/manage/editResume/' + resumeId);
				}
			}
		}
	},
	methods:{
		newResume: function(){
			this.$data.appModel.newResume.id = '';
			this.$route.router.go('/manage/newResume');
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
	 	    appAction.GET_RESUME_LIST();
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.resume-list-holder{
	@extend %content-holder;
	padding: 1rem 1rem 0 $side-width;
	.new-resume-btn{
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
	}
	.resume-title{
		vertical-align: middle;
	}
}
</style>