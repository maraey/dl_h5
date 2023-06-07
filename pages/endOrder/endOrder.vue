<template>
	<view class="container">
		<view class="top_box">
			<view class="title">{{ $t('order-info') }}</view>
			<view class="list">
				<view class="item">
					<view class="item_title">{{ $t('order-num') }}：</view>
					<view class="num">{{info.order_no}}</view>
				</view>
				<view class="item">
					<view class="item_title">{{ $t('rental-time') }}：</view>
					<view class="num">{{info.start_time}}</view>
				</view>
				<view class="item">
					<view class="item_title">{{ $t('consumption-amount') }}：</view>
					<view class="num">{{info.amount}}</view>
				</view>
				<view class="item">
					<view class="item_title">{{ $t('use-time') }}：</view>
					<view class="num">{{info.use_time}}</view>
				</view>
				<view class="item">
					<view class="item_title">{{ $t('charge-standard') }}：</view>
					<view class="num">{{info.billing}}</view>
				</view>
			</view>
		</view>
		<view class="bottom_box">
			<view class="title">{{ $t('deducted-amount') }}</view>
			<view class="input_box"><input class="input" type="number" :value="amount" @input="handleAmount" :placeholder="$t('please-enter-deducted-amount')" placeholder-class="phcolor" /></view>
			<view class="title">{{ $t('remark') }}</view>
			<view class="textarea_box"><textarea class="textarea" :value="remark" @input="handleRemark"></textarea></view>
			<view class="is_return">
				<view class="title">{{ $t('return-or-not') }}</view>
				<view class="radio_group">
					<view class="radio_box" @click="handleReturn">
						<image class="image" v-if="returned" src="/static/selected1.png"></image>
						<image class="image" v-if="!returned" src="/static//unselected(1).png"></image>
						<text class="title">{{ $t('returned') }}</text>
					</view>
					<view class="radio_box" @click="handleReturn">
						<image class="image" v-if="returned" src="/static//unselected(1).png"></image>
						<image class="image" v-if="!returned" src="/static/selected1.png"></image>
						<text class="title">{{ $t('not-returned') }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="endOrder">{{ $t('end-order') }}</view>
	</view>
</template>

<script>
import {orderDetail, endOrder} from '../../utils/order/order'
export default {
	data() {
		return {
			returned: 0,
			order_no: '',
			info: {},
			remark: '',
			amount: '',
		};
	},
	onLoad(options) {
		this.order_no = options.order_id
		console.log(options)
	},
	mounted() {
		this.getInfo()
	},
	methods: {
		handleReturn() {
			this.returned = !this.returned
			console.log(this.returned)
		},
		async getInfo() {
			const res = await orderDetail({
				order_no: this.order_no
			})
			console.log(res)
			this.info = res.data
		},
		handleAmount(e) {
			this.amount = e.target.value
		},
		handleRemark(e) {
			this.remark = e.target.value
			console.log(this.remark)
		},
		async endOrder(){
			const num = (this.returned) ? 1 : 0
			const res = await endOrder({
				order_no: this.order_no,
				returned: num,
				remark: this.remark,
				amount: this.amount
			})
			console.log(res)
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	padding: 30rpx 0;
	background: #f4f5f5;
	box-sizing: border-box;
	overflow: scroll;
	.top_box {
		width: 690rpx;
		height: 400rpx;
		padding: 36rpx 32rpx;
		margin: 0 auto 30rpx;
		background: #ffffff;
		border-radius: 8rpx;
		box-sizing: border-box;
		.title {
			height: 44rpx;
			margin-bottom: 20rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			line-height: 44rpx;
		}
		.list {
			.item {
				display: flex;
				align-items: center;
				.item_title,
				.num {
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 40rpx;
				}
			}
			.item + .item {
				margin-top: 16rpx;
			}
		}
	}
	.bottom_box {
		width: 690rpx;
		height: 554rpx;
		margin: 30rpx auto;
		padding: 36rpx 32rpx;
		background: #ffffff;
		border-radius: 8rpx;
		box-sizing: border-box;
		.title {
			height: 36rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
			line-height: 36rpx;
		}
		.input_box {
			display: flex;
			align-items: center;
			width: 626rpx;
			height: 80rpx;
			margin: 20rpx 0 24rpx;
			padding: 0 20rpx;
			border-radius: 4rpx;
			border: 2rpx solid #e8e8e8;
			box-sizing: border-box;
			.input {
				width: 580rpx;
				height: 36rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
			}
		}
		.textarea_box {
			width: 626rpx;
			height: 200rpx;
			margin: 20rpx 0 30rpx;
			padding: 22rpx 20rpx;
			border-radius: 4rpx;
			border: 2rpx solid #e8e8e8;
			box-sizing: border-box;
			.textarea {
				width: 160rpx;
				height: 156rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
				line-height: 36rpx;
			}
		}
		.is_return {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.radio_group {
				display: flex;
				align-items: center;
				.radio_box {
					display: flex;
					align-items: center;
					.image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 16rpx;
					}
				}
				.radio_box + .radio_box {
					margin-left: 40rpx;
				}
			}
		}
	}
	.btn {
		width: 690rpx;
		height: 88rpx;
		margin: 0 auto;
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
		background: #f0513a;
		border-radius: 44rpx;
	}
}
</style>
