<template>
	<view class="container">
		<view class="search_box">
			<image src="../../static/search_input.png"></image>
			<input type="text" placeholder-class="phcolor" :placeholder="$t('input-the-order-num')" />
		</view>
		<view class="list_title">
				<picker mode="date" :value="month" @change="bindDateChange" fields="month">
					<view class="picker">
						<text>{{ month }}</text>
						<image src="../../static/xiala.png"></image>
					</view>
				</picker>
				<text class="amount">9月份总金额：¥99999</text>
		</view>
		<view class="list_item" @click="orderBenefitDetail">
			<text>09月03日</text>
			<text>¥10</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			month:'2022-07-22' // 时间默认为昨天
		};
	},
	methods: {
		// 选择月份
		bindDateChange(e){
			this.month=e.detail.value
		},
		orderBenefitDetail(){
			uni.navigateTo({
				url:'/pages/orderBenefitDetail/orderBenefitDetail'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	padding: 30rpx;
	background-color: #f4f5f5;
	box-sizing: border-box;
	.search_box {
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 72rpx;
		margin: 0 auto;
		padding: 0 30rpx;
		background: #ffffff;
		border-radius: 4rpx;
		box-sizing: border-box;
		image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 22rpx;
		}
		input {
			width: 580rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
		}
	}
	.list_title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		height: 90rpx;
		margin: 0 auto;
		margin-top: 24rpx;
		padding: 0 32rpx;
		background: #FEFFFE;
		border-radius: 8rpx 8rpx 0rpx 0rpx;
		box-sizing: border-box;
		.picker{
			display: flex;
			align-items: center;
			text{
				height: 42rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			image{
				width: 20rpx;
				height: 12rpx;
				margin-left: 22rpx;
			}
		}
		.amount{
			height: 34rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
			line-height: 34rpx;
		}
	}
	.list_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		height: 96rpx;
		margin: 0 auto;
		margin-top: 2rpx;
		padding: 0 32rpx;
		background: #FEFFFE;
		box-sizing: border-box;
		text{
			height: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
	}
}
</style>
