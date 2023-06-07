<template>
	<view class="container">
		<view class="info_box">
			<view class="agency_title">
				<view class="title">
					<text>{{info.name}}</text>
					<image src="../../static/delete.png" @click="delUser"></image>
				</view>
				<view class="info">
					<view class="propotion">
						<text class="text_box">{{$t('commission-ratio')}}</text>
						<text class="num_box">: {{info.brokerage}}%</text>
					</view>
					<text class="delete_text" @click="delUser">{{$t('DEL')}}</text>
				</view>
			</view>
			<view class="agency_detail">
				<view class="agency_left">
					<text class="info_title">{{$t('phone-num-for-login')}}</text>
					<text class="info_title">{{$t('pop-up-battery')}}</text>
					<text class="info_title">{{$t('status')}}</text>
				</view>
				<view class="agency_right">
					<text class="info_text">: {{info.phone}}</text>
					<text class="info_text" v-if="info.open_lock==1">: {{$t('allow')}}</text>
					<text class="info_text" v-if="info.open_lock==0">: {{$t('not-allowed')}}</text>
					<text class="info_text" v-if="info.status==1">: {{$t('normal')}}</text>
					<text class="info_text" v-if="info.status!=1">: {{$t('error')}}</text>
				</view>
			</view>
			<view class="agency_use">
				<view class="logo_box" @click="editSeller">
					<image src="../../static/seller_change.png"></image>
					<text>{{$t('edit-seller-account')}}</text>
				</view>
			</view>
		</view>
		<view class="device_box">
			<view class="device_info">
				<view class="device_title">
					<text>{{$t('charge.battery')}}</text>
				</view>
				<view class="device_state">
					<view class="num_box">
						<text class="num_text">{{$t('total-s')}}</text>
						<text class="num">{{deviceInfo.all}}</text>
					</view>
					<view class="num_box">
						<text class="num_text">{{$t('offline')}}</text>
						<text class="num">{{deviceInfo.offline}}</text>
					</view>
					<view class="num_box">
						<text class="num_text">{{$t('unbound')}}</text>
						<text class="num">{{deviceInfo.unbind}}</text>
					</view>
					<view class="num_box">
						<text class="num_text">{{$t('fault')}}</text>
						<text class="num">{{deviceInfo.fault}}</text>
					</view>
					<!-- <view class="num_box">
						<text class="num_text">{{$t('replenish-power-bank')}}</text>
						<text class="num">6</text>
					</view> -->
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {userDetail,userDelete,statDevice} from '../../utils/role/role.js'
	export default {
		data() {
			return {
				user_id:'',
				info:{},
				deviceInfo:{}
			}
		},
		onLoad(options) {
			this.user_id = options.id
			this.getDetail()
			this.getDevice()
		},
		methods: {
			editSeller() {
				uni.navigateTo({
					url:'/pages/addSellerManager/addSellerManager?id='+this.info.id
				})
			},
			async getDetail(){
				const res = await userDetail({
					user_id:this.user_id
				})
				this.info = res.data
			},
			async getDevice(){
				const res = await statDevice({
					user_id:this.user_id
				})
				this.deviceInfo=res.data
			},
			delUser(){
				uni.showModal({
					content: this.$t('Are-you-sure-to-delete'),
					success: async (res)=> {
						if (res.confirm) {
							const res = await userDelete({
								id:this.user_id
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
			}
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
		background: #ffffff;
		.agency_title {
			width: 100vw;
			height: 146rpx;
			border-bottom: 2rpx solid #F5F5F5;
			.title {
				display: flex;
				justify-content: space-between;
				padding: 30rpx 54rpx 12rpx 30rpx;
				box-sizing: border-box;
  				text {
					width: 600rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					line-height: 44rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
			.info {
				display: flex;
				justify-content: space-between;
				.delete_text {
					height: 32rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #333333;
					line-height: 32rpx;
					margin-right: 52rpx;
				}
				.propotion {
					.text_box {
						margin-left: 30rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
					.num_box {
						margin-left: 28rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
				}
			}
		}
		.agency_detail {
			width: 100vw;
			height: 230rpx;
			border-bottom: 2rpx solid #F5F5F5; 
			display: flex;
			.agency_left {
				display: flex;
				flex-direction: column;
				height: 290rpx;
				margin-top: 26rpx;
				.info_title {
					margin-left: 30rpx;
					margin-bottom: 26rpx;
					height: 36rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
			}
			.agency_right {
				display: flex;
				flex-direction: column;
				height: 290rpx;
				margin-top: 26rpx;
				.info_text{
					margin-left: 46rpx;
					margin-bottom: 26rpx;
					height: 36rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
			}
		}
		.agency_use {
			display: flex;
			width: 100vw;
			padding: 24rpx 46rpx 36rpx 46rpx;
			box-sizing: border-box;
			.logo_box {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 42rpx;
				height: 130rpx;
				image {
					width: 80rpx;
					height: 80rpx;
				}
				text {
					text-align: center;
					margin-top: 16rpx;
					height: 34rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					line-height: 34rpx;
				}
			}
		}
	}
	.device_box {
		margin-top: 20rpx;
		padding: 30rpx 30rpx;
		background: #FFFFFF;
		.device_info {
			display: flex;
			flex-direction: column;
			margin-bottom: 30rpx;
			width: calc(100vw - 60rpx);
			height: 262rpx;
			border-radius: 8rpx;
			border: 2rpx solid #EEEEEE;
			.device_title {
				display: flex;
				height: 88rpx;
				border-bottom: 2rpx solid #F5F5F5;
				text {
					margin-top: 24rpx;
					margin-left: 32rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					line-height: 40rpx;
				}
			}
			.device_state {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: calc(100vw - 128rpx);
				height: 172rpx;
				margin-left: 32rpx;
				.num_box {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 90rpx;
					.num_text {
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 500;
						color: #999999;
						line-height: 36rpx;
					}
					.num {
						height: 36rpx;
						text-align: center;
						font-size: 26rpx;
						font-weight: 500;
						color: #333333;
						line-height: 36rpx;
					}
				}
			}
		}
		.wind_info {
			display: flex;
			flex-direction: column;
			margin-bottom: 30rpx;
			width: calc(100vw - 60rpx);
			height: 262rpx;
			border-radius: 8rpx;
			border: 2rpx solid #EEEEEE;
			.wind_title {
				display: flex;
				height: 88rpx;
				border-bottom: 2rpx solid #F5F5F5;
				text {
					margin-top: 24rpx;
					margin-left: 32rpx;
					width: 140rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					line-height: 40rpx;
				}
			}
			.wind_state {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: calc(100vw - 188rpx);
				height: 172rpx;
				margin-left: 64rpx;
				.num_box {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 52rpx;
					height: 90rpx;
					.num_text {
						width: 52;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 500;
						color: #999999;
						line-height: 36rpx;
					}
					.num {
						width: 48rpx;
						height: 36rpx;
						text-align: center;
						font-size: 26rpx;
						font-weight: 500;
						color: #333333;
						line-height: 36rpx;
					}
				}
				.wind_box {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 130rpx;
					height: 90rpx;
					.num_text {
						width: 130rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 500;
						color: #999999;
						line-height: 36rpx;
					}
					.num {
						width: 130rpx;
						height: 36rpx;
						text-align: center;
						font-size: 26rpx;
						font-weight: 500;
						color: #333333;
						line-height: 36rpx;
					}
				}
			}
		}
	}
}
</style>
