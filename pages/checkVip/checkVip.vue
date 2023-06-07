<template>
	<view class="container">
		<scroll-view class="list" scroll-y="true">
			<view class="item" v-for="(item,index) in list" :key="index" >
				<view class="titile_box">
					<view class="title">{{$t('store-name')}}:</view>
					<text class="name">{{item.name}}</text>
				</view>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
				<view class="titile_box">
					<view class="title">{{$t('charge-bank-free-minutes')}}:</view>
					<text class="name">
						<text class="blue_name">{{item.battery_use}}</text>
						<text>/{{item.battery_free}}</text>
					</text>
				</view>
		
				<view class="bottom_line">
					
				</view>
				<view class="button_box">
					<view class="check" @click="editShop(item.uid,item.sid)">
						<text>{{$t('edit-store')}}</text>
					</view>
					<view class="delete" @click="deleteShop(item.id)">
						<text>{{$t('delete-store')}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {shopInfo, userShops, deleteShop} from '../../utils/special/special'
	export default {
		data() {
			return {
				list:[],
				id: '',
				uid: '',
				sid: '',
			};
		},
		onLoad(options) {
			console.log(options)
			this.uid = options.uid
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			editShop(uid,sid) {
				this.uid = uid
				this.sid = sid
				uni.navigateTo({
					url:`../editShop/editShop?uid=${this.uid}&sid=${this.sid}`
				})
			},
			async getInfo() {
				const res = await userShops({
					uid: this.uid
				})
				console.log(res)
				this.list = res.data.list
			},
			async deleteShop(e) {
				const id = e
				const res = await deleteShop({
					id,
				})
				console.log(res)
				this.getInfo()
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
			padding: 36rpx 32rpx 0 32rpx;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			.titile_box {
				margin-bottom: 16rpx;
				height: 80rpx;
				.title {
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 40rpx;
				}
				.name {
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
					.blue_name{
						height: 40rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #3D82FF;
						line-height: 40rpx;
					}
				}
			}
			.bottom_line {
				margin-top: 24rpx;
				margin-bottom: 16rpx;
				height: 2rpx;
				background: #F5F5F5;
			}
			.button_box {
				display: flex;
				flex-direction: row-reverse;
				margin-top: 16rpx;
				height: 80rpx;
				.delete {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 24rpx;
					width: 156rpx;
					height: 60rpx;
					border-radius: 8rpx;
					border: 2rpx solid #E9EAF0;
					text {
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
				}
				.check {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 156rpx;
					height: 60rpx;
					background: #3D82FF;
					border-radius: 8rpx;
					text {
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 36rpx;
					}
				}
			}
		}
		.discount_box {
			width: 690rpx;
			margin: 30rpx 0;
			padding: 36rpx 32rpx 0 32rpx;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			.titile_box {
				margin-bottom: 16rpx;
				height: 80rpx;
				.title {
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 40rpx;
				}
				.name {
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
					.blue_name{
						height: 40rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #3D82FF;
						line-height: 40rpx;
					}
				}
			}
			.bottom_line {
				margin-top: 24rpx;
				margin-bottom: 16rpx;
				height: 2rpx;
				background: #F5F5F5;
			}
			.button_box {
				display: flex;
				flex-direction: row-reverse;
				margin-top: 16rpx;
				height: 80rpx;
				.delete {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 24rpx;
					width: 156rpx;
					height: 60rpx;
					border-radius: 8rpx;
					border: 2rpx solid #E9EAF0;
					text {
						width: 104rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
				}
				.check {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 156rpx;
					height: 60rpx;
					background: #3D82FF;
					border-radius: 8rpx;
					text {
						width: 104rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 36rpx;
					}
				}
			}
		}
	}
}

</style>
