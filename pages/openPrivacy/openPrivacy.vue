<template>
	<view><web-view :src="src" ></web-view></view>
</template>

<script>
// import { login } from '../../utils/login/login';
export default {
	data() {
		return {
			src: '',
		};
	},
	onLoad() {
	//因为我是多个标记，所以我的是一个数组
		this.src = '/hybrid/html/privacyx.html'
	},
	onReady() {
	},
	methods: {

	}
};
</script>

<style>
	
</style>
