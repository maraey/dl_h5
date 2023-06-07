<template>
	<view class="container">
		<scroll-view class="list" scroll-y="true">
			<view class="item" v-for="(item,index) in list" :key="index" >
				<view class="titile_box">
					<view class="title">{{$t('consignee-name')}}</view>
					<text class="name">黄某某</text>
				</view>
				<view class="titile_box">
					<view class="title">{{$t('mobile-phone')}}</view>
					<text class="name">13568162911</text>
				</view>
				<view class="titile_box">
					<view class="title">{{$t('address')}}</view>
					<text class="name">深圳市宝安区航城街道深圳市宝安区航城街道深圳市宝安区街道深圳市宝安区街道深圳市宝安区街道深圳市宝安区航城街道深圳市宝安区航城街道深圳市宝安区航城街道深圳市宝安区航城街道</text>
				</view>
				<view class="titile_box">
					<view class="title">{{$t('supplements-quantity')}}</view>
					<text class="name">20</text>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{},{},{},{}]
			};
		},
		methods: {
			editShop() {
				uni.navigateTo({
					url:'../editShop/editShop'
				})
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
	.list{
		width: 690rpx;
		height: 100vh;
		margin: 0 auto;
		.item{
			width: 690rpx;
			margin: 30rpx 0;
			padding: 36rpx 32rpx 8rpx 32rpx;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			.titile_box {
				display: flex;
				flex-direction: column;
				margin-bottom: 16rpx;
				.title {
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 40rpx;
				}
				.name {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
				}
			}
		}
	}
}

</style>
