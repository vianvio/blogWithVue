<template>
	<div class='login-holder'>
		<div class='login-label-holder'>
			<STRONG class='login-label'>登 录</STRONG>
		</div>
		<div class='login-input-holder position-relative'>
			<span class='fa fa-user login-input-icon'></span>
			<input type='text' class='login-input' required />
		</div>
		<div class='login-input-holder position-relative'>
			<span class='fa fa-lock login-input-icon'></span>
			<input type='password' class='login-input' />
		</div>
		<button class='login-btn float-left'>确 认</button>
		<button class='register-btn float-right'>注 册</button>
	</div>
</template>

<script>
console.log('from login~');

module.exports = {
	name: 'login',
	data: function(){
		return {
			
		}
	},
	methods:{
		
	},
	ready: function(){
		this.$dispatch('show-hide-side-nav');
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.login-holder {
	width: 40rem;
	height: 28rem;
	/*border: 1px solid $basic-dark;*/
	margin: 10rem auto;
	padding: 3rem;
	@extend %material-shadow;
}

.login-label-holder {
	text-align: right;
	padding-right: 1rem;
}

.login-label {
	font-size: 30px;
	color: $dark-coffee;
}

.login-input-holder {
	height: 4rem;
	border: 1px solid $shadow-dark;
	margin-top: 2rem;
	@include border-radius(4px);
}

.login-input-icon {
	position: absolute;
	line-height: 4rem;
	width: 4rem;
	text-align: center;
	color: $shadow-dark;
	border-right: 1px solid $shadow-dark;
	font-size: 20px;
}

.login-input {
	border: none;
	width: 100%;
	padding: 1rem 1rem 0 5rem;
	color: $font-dark;
}

.login-btn {
	@extend %blog-btn;
	background-color: $basic-blue;
	color: #fff;
	margin: 2rem 0;
}

.register-btn {
	@extend %blog-btn;
	background-color: $light-coffee;
	color: #fff;
	margin: 2rem 0;
}

</style>