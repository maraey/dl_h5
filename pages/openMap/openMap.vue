<template>
	<view><web-view :src="src" @message="getMessage"></web-view></view>
</template>

<script>
// import { login } from '../../utils/login/login';
export default {
	data() {
		return {
			src: '',
			// arr: [{lng: 103.53028, lat: 10.62592},{lng: 104.82425, lat: 11.58515}]
		};
	},
	onLoad() {
	//因为我是多个标记，所以我的是一个数组
		this.src = '/hybrid/html/map.html'
	},
	onReady() {
	},
	methods: {
		getMessage(e){
			console.log(e.detail.data[0])
			uni.setStorage({
				key: 'postInfo',
				data: JSON.stringify(e.detail.data[0]),
				success: function () {
					console.log('success');
				}
			});
		}
	}
};
</script>

<style>
	
</style>
