<template>
	<view class="container">
		<view class="box">
			<view class="item">
				<view class="title">{{$t('rental-information')}}</view>
				<view class="title_item" v-if="info.seller">{{$t('rental-store')}}:</view>
				<view class="item_info" v-if="info.seller">{{JSON.parse(info.seller).en}}</view>
				<view class="title_item">{{$t('rental-time')}}:</view>
				<view class="item_info">{{info.start_time}}</view>
				<view class="title_item">{{$t('free-time')}}:</view>
				<view class="item_info">{{info.free_time}} {{$t('free-minutes')}}</view>
				<view class="title_item">{{$t('charge-standard')}}:</view>
				<view class="item_info">{{info.billing}}</view>
				<view class="title_item">{{$t('daily-max-bill-amount')}}:</view>
				<view class="item_info">฿{{info.ceiling}}</view>
				<view class="title_item">{{$t('rental-deposit')}}:</view>
				<view class="item_info">฿{{info.deposit}}</view>
				<view class="title_item">{{$t('device-id')}}:</view>
				<view class="item_info">{{info.device_id}}</view>
				<view class="title_item">{{$t('battery-id')}}:</view>
				<view class="item_info">{{info.battery_id}}</view>
			</view>
			<view class="item">
				<view class="title">{{$t('fee-information')}}</view>
				<view class="title_item">{{$t('payment-amount')}}:</view>
				<view class="item_info">฿{{info.amount}}</view>
				<view class="title_item">{{$t('order-num')}}:</view>
				<view class="item_info">{{info.order_no}}</view>
				<view class="title_item" >{{$t('order-status')}}:</view>
				<view class="item_info" v-if="this.status == 1">{{$t('renting')}}</view>
				<view class="item_info" v-if="this.status !== 1">{{info.status_text}}</view>
				<view class="title_item">{{$t('rental-duration')}}:</view>
				<view class="item_info">{{info.use_time}}</view>
				<view class="title_item">{{$t('payment-time')}}:</view>
				<view class="item_info">{{info.start_time}}</view>
			</view>
			<view class="item">
				<view class="title">{{$t('user-info')}}</view>
				<view class="title_item">{{$t('users-nickname')}}:</view>
				<view class="item_info">{{info.nick}}</view>
				<view class="title_item">{{$t('member-id')}}:</view>
				<view class="item_info">{{info.member_id}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {orderDetail} from '../../utils/order/order'
export default {
	data() {
		return {
			order_id: '',
			info: {},
			seller_zh: '',
			seller_en: '',
			status: '',
		};
	},
	onLoad(options) {
		this.order_id = options.order_id
		console.log(this.order_id)
	},
	onShow() {
		this.getInfo()
		console.log(this.info)
		console.log(this.status)
	},
	methods: {
		async getInfo() {
			const res = await orderDetail({
				order_no: this.order_id
			})
			console.log(res)
			this.info = res.data
			this.status = res.data.status
			console.log(this.status)
		},
		
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100vw;
	height: 100vh;
	padding: 30rpx;
	box-sizing: border-box;
	background: #f4f5f5;
	overflow: scroll;
	.box {
		width: 690rpx;
		padding: 36rpx 32rpx;
		background: #ffffff;
		border-radius: 8rpx;
		box-sizing: border-box;
		.item + .item {
			margin-top: 30rpx;
		}
		.item {
			.title {
				height: 44rpx;
				margin-bottom: 20rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				line-height: 44rpx;
			}
			.title_item,
			.item_info {
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
			}
			.title_item {
				margin-bottom: 5rpx;
			}
			.item_info {
				margin-left: 20rpx;
				margin-bottom: 16rpx;
			}
		}
	}
}
</style>
