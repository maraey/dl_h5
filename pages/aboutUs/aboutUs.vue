<template>
	<view class="container">
		<view class="item">
			<view class="info">
				<view class="title">{{$t('contact-number')}} :</view>
				<text class="text">{{tel}}</text>
			</view>
			<view class="line"></view>
			<view class="info_box">
				<view class="title">{{$t('company-email')}} :</view>
				<text class="text">{{email}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { serverInfo } from '../../utils/user/user.js'
	export default {
		data() {
			return {
				email: '',
				tel: ''
			};
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				const res = await serverInfo();
				this.email = res.data.email
				this.tel = res.data.tel
				console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	position: relative;
	width: 100vw;
	height: 100vh;
	background: #f4f5f5;
	overflow: scroll;
	.item{
		width: 690rpx;
		margin: 30rpx auto;
		padding: 36rpx 32rpx;
		background: #ffffff;
		border-radius: 8rpx;
		box-sizing: border-box;
		box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
		.info{
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			margin-bottom: 30rpx;
			justify-content: space-between;
			.title{
				height: 40rpx;
				margin-right: 28rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
				line-height: 40rpx;
			}
			.text{
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
			}
		}
		.info_box{
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			justify-content: space-between;
			.title{
				height: 40rpx;
				margin-right: 28rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
				line-height: 40rpx;
			}
			.text{
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
			}
		}
		.line{
			width: 608rpx;
			height: 2rpx;
			background: #F8F8F8;
		}
	}

}

</style>
