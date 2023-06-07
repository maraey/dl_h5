<template>
	<view class="container">
		<view class="info_box">
			<view class="info_header">
				<view class="info_title">
					<view class="info_name">{{info.name}}</view>
					<view class="info_address">{{info.address}}</view>
				</view>
				<view class="image_box" @click="delUser">
					<image src="../../static/delete.png"></image>
					<text>{{$t('DEL')}}</text>
				</view>
			</view>
			<view class="info_body">
				<view class="info">
					<text class="info_title">{{$t('seller')}}:</text>
					<text class="info_text">{{info.manager_name||$t('none')}}</text>
				</view>
				<view class="info">
					<text class="info_title">{{$t('agent')}}:</text>
					<text class="info_text">{{info.agency_name||$t('none')}}</text>
				</view>
				<view class="info">
					<text class="info_title">{{$t('staff')}}:</text>
					<text class="info_text">{{info.employee_name||$t('none')}}</text>
				</view>
				<view class="info">
					<text class="info_title">{{$t('commission-ratio')}}:</text>
					<text class="info_text">{{info.brokerage}}</text>
				</view>
				<view class="info">
					<text class="info_title">{{$t('open-hours')}}</text>
					<text class="info_text">{{info.shop_start}}-{{info.shop_end}}</text>
				</view>
<!-- 				<view class="info">
					<text class="info_title">{{$t('open-hours')}}:</text>
					<text class="info_text">{{$t('workingDay')}}：{{workingDay_start}}-{{workingDay_end}}</text>
					<text class="info_text">{{$t('weekend')}}：{{weekend_start}}-{{weekend_end}}</text>
					<text class="info_text">{{$t('holidays')}}：{{holidays_start}}-{{holidays_end}}</text>
				</view> -->
				<view class="info">
					<text class="info_title">{{$t('charging-strategy-of-power-bank')}}:</text>
					<text class="info_text" v-if="type == 1">{{$t('yuan')}}{{info.amount}}.00 /{{info.billingtime}} {{$t('hourss')}}</text>
					<text class="info_text" v-if="type == 2">{{$t('yuan')}}{{info.amount}}.00 /{{$t('30minutes')}}</text>
				</view>
				<view class="info">
					<text class="info_title">{{$t('free-time-minute')}}:</text>
					<text class="info_text">{{info.freetime}}min</text>
				</view>
				<view class="info">
					<text class="info_title">{{$t('highest-consumption')}}:</text>
					<text class="info_text">฿{{info.ceiling}}</text>
				</view>
			</view>
			<view class="bottom_line"></view>
			<view class="agency_use">
				<view class="logo_box" @click="bindDevice">
					<image src="../../static/seller_bind.png"></image>
					<text>{{$t('bind-the-device')}}</text>
				</view>
				<view class="logo_box" @click="editSeller">
					<image src="../../static/seller_change.png"></image>
					<text>{{$t('modify-store')}}</text>
				</view>
				<view class="logo_box" @click="toBattery">
					<image src="../../static/battery_device.png"></image>
					<text>{{$t('charge.batterys')}}</text>
				</view>
				<view class="logo_box" @click="toSellerVip">
					<image src="../../static/seller_vip.png"></image>
					<text>{{$t('vip-users')}}</text>
				</view>
<!-- 				<view class="logo_box" @click="toStatistics">
					<image src="../../static/statistics.png"></image>
					<text>{{$t('statistics')}}</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {bindAgency,bindSeller} from '../../utils/batteryDevice/batteryDevice'
	import {detail,deleteSeller} from '../../utils/seller/seller'
	export default {
		data() {
			return {
				seller_id: '',
				info: {},
				name_zh:'',
				name_en:'',
				qrcode: '',
				workingDay_start: '',
				workingDay_end: '',
				weekend_start: '',
				weekend_end: '',
				holidays_start: '',
				holidays_end: '',
				type:'',
				
			}
		},
		onLoad(options) {
			console.log(options)
			this.seller_id = options.seller_id
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			toStatistics() {
				uni.navigateTo({
					url:'/pages/statisticsSeller/statisticsSeller'
				})
			},
			toBattery() {
				uni.navigateTo({
					url:'/pages/batteryDevice/batteryDevice'
				})
			},
			toSellerVip() {
				uni.navigateTo({
					url:'/pages/sellerVip/sellerVip'
				})
			},
			editSeller() {
				uni.navigateTo({
					url:`/pages/addSeller/addSeller?seller_id=${this.seller_id}`
				})
			},
			async getInfo(){
				const res = await detail({
					id: this.seller_id
				})
				console.log(res)
				this.info = res.data
				this.name_zh = JSON.parse(res.data.name).zh
				this.name_en = JSON.parse(res.data.name).en
				this.workingDay_start = JSON.parse(res.data.working_day).start
				this.workingDay_end = JSON.parse(res.data.working_day).end
				this.weekend_start = JSON.parse(res.data.weekend).start
				this.weekend_end = JSON.parse(res.data.weekend).end
				this.holidays_start = JSON.parse(res.data.holidays).start
				this.holidays_end = JSON.parse(res.data.holidays).end
				this.type = res.data.billingunit
			},
			delUser() {
				uni.showModal({
					content: this.$t('Are-you-sure-to-delete'),
					success: async (res)=> {
						if (res.confirm) {
							const res = await deleteSeller({
								seller_id:this.seller_id
							})
							if(res.code==1){
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 1000
								});
								setTimeout(() => {
									uni.navigateBack()
								}, 1000);
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			bindDevice() {
				uni.navigateTo({
					url:`/pages/bindDevice/bindDevice?seller_id=${this.seller_id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	width: 100vw;
	height: 100vh;
	background: #f4f5f5;
	.info_box {
		width: 100vw;
		height: 100vh;
		background: #ffffff;
		overflow: scroll;
		.info_header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: calc(100vw - 60rpx);
			padding: 30rpx 30rpx 24rpx 30rpx;
			border-bottom: 2rpx solid #F5F5F5;
			.info_title {
				display: flex;
				flex-direction: column;
				.info_name{
					width: 560rpx;
					margin-bottom: 12rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.info_address {
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
			}
			.image_box {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 44rpx;
				height: 86rpx;
				image{
					width: 44rpx;
					height: 44rpx;
				}
				text {
					width: 48rpx;
					height: 32rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #333333;
					line-height: 32rpx;
				}
			}
		}
		.info_body {
			width: 100vw;
			.info {
				display: flex;
				flex-direction: column;
				margin-top: 26rpx;
				.info_title {
					margin-left: 30rpx;
					height: 36rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
				.info_text {
					height: 36rpx;
					margin-left: 60rpx;
					margin-top: 10rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
				.text_box {
					display: flex;
					flex-direction: column;
					height: 88rpx;
					text {
						margin-bottom: 16rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
					}
				}
			}
		}
		.bottom_line {
			margin-top: 30rpx;
			margin-bottom: 26rpx;
			width: 100vw;
			height: 2rpx;		
			background: #F5F5F5;
		}
		.agency_use {
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			width: 100vw;
			.logo_box {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 188rpx;
				image {
					width: 80rpx;
					height: 80rpx;
				}
				text {
					text-align: center;
					margin-top: 16rpx;
					margin-bottom: 40rpx;
					height: 34rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					line-height: 34rpx;
				}
			}
		}
	}

}
</style>
