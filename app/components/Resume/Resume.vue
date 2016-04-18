<template>
	<div id='resume-pdf' class='resume-holder'>
		<div class='resume-basic-holder'>
			<div class='basic-left float-left'>
				<img src="../../images/gopher.png" class='resume-avatar float-left' alt='Vian-Shen' />
				<div class='resume-name resume-row float-left'><i class='fa fa-user'></i>{{appModel.newResume.name}}</div>
				<div class='resume-row float-left'><i class='fa fa-calendar'></i>{{appModel.newResume.birthday | moment}}</div>
				<div class='resume-row float-left'><i class='fa fa-inbox'></i>{{appModel.newResume.email}}</div>
				<div class='resume-row float-left'>{{appModel.newResume.id === 1 ? '详细联系方式请邮箱私信' : 'For detail information, please send mail'}}</div>
			</div>
			<div class='basic-right'>
				<h3 id='self-assignment'>{{appModel.newResume.id === 1 ? '自我简介' : 'SELF ASSIGNMENT'}}</h3>
				<hr/>
				<div v-html='appModel.newResume.selfAssignment | marked'></div>
			</div>
		</div>
		<div class='resume-education-holder'>
			<h3 id='education-exp'>{{appModel.newResume.id === 1 ? '教育经历' : 'EDUCATION'}}</h3>
			<hr/>
			<div v-for='education in appModel.arrEducation' track-by='$index'>
				<div class='exp-left'>
					<div>{{education.from}} - {{education.to}}</div>
					<div>{{education.name}}</div>
					<div>{{education.major}}</div>
				</div>
				<div class='exp-right' v-html='education.description | marked'></div>
			</div>
		</div>
		<div class='resume-job-holder'>
			<h3 id='job-exp'>{{appModel.newResume.id === 1 ? '工作经历' : 'JOB'}}</h3>
			<hr/>
			<div v-for='job in appModel.arrJob' track-by='$index'>
				<div class='exp-left'>
					<div>{{job.from}} - {{job.to}}</div>
					<div>{{job.name}}</div>
					<div>{{job.title}}</div>
				</div>
				<div class='exp-right' v-html='job.description | marked'></div>
			</div>
		</div>
		<div class='resume-project-holder'>
			<h3 id='project-exp'>{{appModel.newResume.id === 1 ? '项目经历' : 'PROJECT'}}</h3>
			<hr/>
			<div v-for='project in appModel.arrProject' track-by='$index'>
				<div class='exp-left'>
					<div>{{project.from}} - {{project.to}}</div>
					<div>{{project.name}}</div>
					<div>{{project.technology}}</div>
				</div>
				<div class='exp-right'>
					<div v-html='project.description | marked'></div>
					<div v-html='project.responsibility | marked'></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
var appModel = require('../../app.model.js');
var appAction = require('../../app.action.js');
var marked = require('marked');
var moment = require('moment');
var sideBarGenerator = require('../../shared/sideBarGenerator.js');
var Q = require('q');
// need to clone the repository and build localy
var jsPDF = require('jspdf');

module.exports = {
	data: function(){
		return {
			appModel: appModel
		}
	},
	methods:{
	},
	ready: function(){
	},
	route: {
		data: function(transition){
			var that = this;
			sideBarGenerator.initChildNodes();
			sideBarGenerator.initIndexObj();

			// set resumeid for list queries
			appModel.newResume.id = this.$route.params.resumeId;

			appModel.bLoading = true;
			Q.all([appAction.GET_RESUME_BY_ID(this.$route.params.resumeId), appAction.GET_EDUCATION_LIST(), appAction.GET_JOB_LIST(), appAction.GET_PROJECT_LIST()]).then(function(){
				appModel.bLoading = false;
				[].slice.apply(document.querySelectorAll('.resume-holder h1,.resume-holder h2,.resume-holder h3,.resume-holder h4,.resume-holder h5,.resume-holder h6')).forEach(function(ele){
					// construct current object
					var _currentNode = {
						name: ele.innerText || ele.textContent,
						nodeClass: 'child-node',
						selectable: true,
						forceOpen: true,
						open: true,
						fnc: sideBarGenerator.scrollMethod(ele),
						nodes: []
					}
					sideBarGenerator.insertNode(_currentNode, parseInt(/\d+/.exec(ele.tagName)));
				});
				appModel.sideBarModel = [{
					name: appModel.newResume.id === 1 ? '查看英文简历' : 'Switch to Chinese',
					forceOpen: true,
					nodeClass: 'node-btn',
					fnc: function(){
						var targetResume = appModel.newResume.id === 1 ? 2 : 1;
						that.$route.router.go('/resume/' + targetResume);
					},
					nodes: []
				},{
					name: appModel.newResume.id === 1 ? '简历' : 'Resume',
					forceOpen: true,
					open: true,
					nodeClass: 'root-node',
					nodes: sideBarGenerator.getChildNodes()
				},{
					name: appModel.newResume.id === 1 ? '导出简历' : 'Export Resume',
					forceOpen: true,
					nodeClass: 'node-btn-coffee',
					fnc: function(){
						var doc = new jsPDF('p','pt','a4');
						doc.addHTML(document.getElementById('resume-pdf'), -140, 50, function(dispose){
							doc.output('dataurlnewwindow');
						});
					},
					nodes: []
				}];
			});
			appModel.navBarModel.currentTab = 'resume';
		}
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

.resume-holder{
	@extend %content-holder;
	background-color: $white;
	h3{
		color: $light-blue;
	}
	.resume-basic-holder{
		display: table;
		.basic-left {
			width: 40%;
			padding: 1rem 0;
			.resume-avatar {
				width: 30%;
			}
			.resume-row {
				font-size: 12px;
				padding: 1rem 1.5rem 0 5rem;
				width: 70%;
				color: $shadow-dark;
				i {
					margin-right: 1rem;
				}
			}
			.resume-row.resume-name {
				color: $basic-blue;
				font-size: 25px;
			}
		}
		.basic-right {
			overflow: hidden;
		}
	}
	.exp-left {
		float: left;
		width: 26%;
		padding: 0 2rem;
	}
	.exp-right {
		overflow: hidden;
	}
}

</style>