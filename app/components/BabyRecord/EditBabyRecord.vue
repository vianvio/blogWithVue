<template>
	<div class='record-edit-holder'>
		<message-box :message-content='message' :message-type='messageType' :closable='true' v-if='bShowMessage' v-on:close-message-box='closeMessageBox'></message-box>
		日期: <datepicker :value.sync="appModel.newRecord.eventDate | moment" format="yyyy-MM-dd"></datepicker>
		<textarea class='record-content' placeholder="内容" v-model='appModel.newRecord.content' rows='5'></textarea>
		<nbutton btn-class='save-btn' :nbutton-click='save' :show-loading.sync='showLoading'>保 存</nbutton>
		<div v-if='bEdit'>
			<hr/>
				<div class='position-relative img-holder' v-for='recordImage in appModel.arrRecordImage' track-by='$index'>
					<img :src="recordImage.imgUrl" class='img-preview' />
					<div class='img-delete fa fa-remove' v-on:click='deleteImg(recordImage)'></div>
				</div>
			<hr/>
			<input type='file' id='imgUpload' accept='.png,.jpeg,.jpg' multiple v-on:change='chooseImg' />
			<nbutton btn-class='save-btn' :nbutton-click='upload' :show-loading.sync='showUploadLoading'>上传图片</nbutton>
			<div>
				<img :src="img" class='img-preview' v-for='img in imgUpload' />
			</div>
		</div>
	</div>
</template>

<script>
var messageBox = require('../../shared/messageBox.vue');
var marked = require('marked');
var moment = require('moment');
var datepicker = require('vue-strap').datepicker;
var nbutton = require('../../shared/nbutton.vue');
var appModel = require('../../app.model.js');
var appAction = require('../../app.action.js');

var _initNewRerecord = function(){
    appModel.newRecord.id = '';
    appModel.newRecord.content = '';
    appModel.newRecord.eventDate = '';
};

module.exports = {
	components: {
		messageBox,
		nbutton,
		datepicker
	},
	data: function(){
		return {
			message: '',
			messageType: 'message',
			showLoading: false,
			showUploadLoading: false,
			bShowMessage: false,
			bEdit: false,
			appModel: appModel,
			imgUpload: []
		}
	},
	methods:{
		closeMessageBox: function(){
			this.$data.bShowMessage = false;
		},
		save: function(){
			var _method = appModel.newRecord.id ? 'put' : 'post';
			this.$data.showLoading = true;
			this.$http[_method]('/api/records', appModel.newRecord).then(function(res){
				this.$data.showLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'message';
				this.$data.message = '成功了';

				var that = this;
				this.$route.router.go('/manage/editRecord/' + res.data.id);
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
		chooseImg: function(){
			var that = this;
			this.$data.imgUpload = [];
			[].slice.apply(document.getElementById('imgUpload').files).forEach(function(file){
				var reader = new FileReader();
				reader.onload = function (e) {
			        that.$data.imgUpload.push(e.target.result.toString());
			    };
			    // read the image file as a data URL.
	    		reader.readAsDataURL(file);
			});
		},
		upload: function(){
			this.$data.showUploadLoading = true;
			this.$http.headers.common['Content-Type'] = 'multipart/form-data';
			// create form data
			var formData = new FormData();
			var arrFiles = document.getElementById('imgUpload').files;
			for (var i = 0; i < arrFiles.length; i++) {
		        formData.append("files", arrFiles[i]);
		    }
		    formData.append("recordId", this.$route.params.recordId);

			this.$http.post('/api/containers/babyRecord/upload', formData).then(function(res){
				this.$http.headers.common['Content-Type'] = 'application/json';
				this.$data.showUploadLoading = false;
				this.$data.bShowMessage = true;
				this.$data.messageType = 'message';
				this.$data.message = '成功了';

				appAction.GET_IMAGE_LIST(this.$route.params.recordId);
			}, function(err){
				this.$http.headers.common['Content-Type'] = 'application/json';
				this.$data.showUploadLoading = false;
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
		deleteImg: function(recordImage){
			// should write a method to delete file & record, now we just call two of them
			this.$http.delete('/api/recordImages/' + recordImage.id).then(function(res){
				// console.log(res);
				appAction.GET_IMAGE_LIST(this.$route.params.recordId);
			});
			this.$http.delete('/api/containers/babyRecord/files/' + recordImage.imgUrl.split('/')[1]).then(function(res){
				console.log(res);
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
			if(transition.to.path !== '/manage/newRecord') {
				// edit
				appModel.newRecord.id = this.$route.params.recordId
				appAction.GET_RECORD_BY_ID(this.$route.params.recordId);
				this.$data.bEdit = true;
				appAction.GET_IMAGE_LIST(this.$route.params.recordId);
			}else{
				_initNewRerecord();
				this.$data.bEdit = false;
			}
		}
	},
	ready: function(){

	},
	filters: {
	    marked: marked,
	    moment: function (date) {
		    return date ? moment(date).format('YYYY-MM-DD') : '';
		}
	}
};
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.record-edit-holder{
	@extend %content-holder;
	padding: 1rem 1rem 0 $side-width;
	min-height: 40rem;
	.save-btn {
		@extend %blog-btn;
		background-color: $basic-blue;
		color: #fff;
		width: 12rem;
	}
	.record-input {
		padding: 1rem;
		margin-top: 1rem;
		width: 100%;
		@include border-radius(4px);
	}
	.record-content{
		margin-top: 1rem;
		width: 100%;
		padding: 1rem;
	}
	#imgUpload {
		visibility: hidden;
		position: relative;
		height: 4rem;
		margin-bottom: 1.5rem;
		display: inline-block;
		width: 12rem;
		&:after{
			content: '选择文件';
			@extend %blog-btn;
			background-color: $light-coffee;
			color: #fff;
			visibility: visible;
			position: absolute;
			top: -1rem;
			left: 0px;
			width: 12rem;
			text-align: center;
			line-height: 4rem;
		};
	}
	.img-preview {
		width: 15rem;
		@extend %material-shadow;
		padding: 0.5rem;
		margin: 0.5rem;
	}
	.img-holder{
		display: inline-block;
		margin: 0 1rem;
	}
	.img-delete{
		width: 2rem;
		height: 2rem;
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
		border-radius: 50%;
		text-align: center;
		background-color: $white;
		line-height: 2rem;
		cursor: pointer;
		@extend %material-shadow;
	}
}
</style>