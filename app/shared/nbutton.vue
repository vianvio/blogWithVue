<template>
	<button class='nbutton' v-bind:class='btnClass' v-on:click='nbuttonClick' disabled="{{showLoading}}">
		<slot></slot>
		<div v-if="showLoading">
            <div class="cssload-ball btn-loader"></div>
        </div>
    </button>
</template>

<script>
module.exports = {
	name: 'nButton',
	data: function() {
		return {
		}
	},
	props: {
		'btnClass': String,
		'nbuttonClick': Function,
		'showLoading': {
			twoWay: true,
			default: false
		}
	},
	methods:{
		nbuttonClick: function(){
			return this.nbuttonClick
		}
	},
	ready: function(){
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.nbutton {
	@extend %blog-btn;
}

</style>