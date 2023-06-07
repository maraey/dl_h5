<template>
	<view class="container">
		<scroll-view class="list" scroll-y="true" @scrolltolower="scrolltolower">
			<view class="item" v-for="(item,index) in list" :key="index" >
				<view class="title">
					<view class="titile_text">{{item.status_text}}</view>
					<view class="title_num">{{item.withdrawal_amount}}</view>
				</view>
				<view class="info">
					<view class="info_date">{{item.create_time}}</view>
					<view class="info_balance">
						<!-- <view class="balance_text">
							{{$t('account-balance')}}
						</view>
						<view class="balance">
							¥20.9
						</view> -->
						<image src="../../static/shangla1.png" @click="open(index)" v-if="!is_unfold"></image>
						<image src="../../static/shangla.png"  @click="open(index)" v-if="is_unfold"></image>
					</view>
				</view>
				<view class="line" v-if="item.is_unfold"></view>
				<view class="display_item" v-if="item.is_unfold">
					<view class="service">
						<view class="service_text">
							{{$t('handling-fee')}}
						</view>
						<view class="service_num">
							{{item.service_amount}}
						</view>
					</view>
					<view class="amount">
						<view class="service_text">
							{{$t('received-amount')}}
						</view>
						<view class="service_num">
							{{item.pay_amount}}
						</view>
					</view>
					<view class="amount">
						<view class="service_text">
							{{$t('transaction-number')}}
						</view>
						<view class="service_num">
							{{item.order_no}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {withdrawalLog} from '../../utils/withdrawal/withdrawal.js'
	export default {
		data() {
			return {
				list:[{}],
				is_unfold : false,
				page:1,
				page_size:10,
				total:0
			}
		},
		onShow() {
				this.getLog()
		},
		methods: {
			open(index){
				this.list[index].is_unfold=!this.list[index].is_unfold
			},
			async getLog(){
				const res = await withdrawalLog({
					page:this.page,
					page_size:this.page_size
				})
				if(this.page==1){
					const list = res.data.list
					list.forEach(item=>{
						item.is_unfold=false
					})
					this.list=list
					this.total = res.data.total
				}else{
					const list = res.data.list
					list.forEach(item=>{
						item.is_unfold=false
					})
					this.list.push(...list)
				}
			},
			scrolltolower(){
				if(this.list<this.total){
					this.page+=1
					this.getLog()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	width: 100vw;
	height: 100vh;
	background: #f4f5f5;
	overflow: scroll;
	.list{
		width: calc(100vw-60rpx);
		height: 100vh;
		margin: 0 auto;
		.item{
			width: calc(100vw-60rpx);
			margin: 30rpx 30rpx;
			padding: 34rpx 32rpx 10rpx 32rpx;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			.title{
				display: flex;
				justify-content: space-between;
				margin-bottom: 26rpx;
				.title_text{
					width: 96rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					line-height: 44rpx;
				}
				.title_num{
					width: 114rpx;
					height: 48rpx;
					font-size: 40rpx;
					font-weight: 500;
					color: #3D82FF;
					line-height: 48rpx;
				}
			}
			.info{
				display: flex;
				justify-content: space-between;
				margin-bottom: 30rpx;
				.info_date{
					width: 254rpx;
					height: 36rpx;
					font-size: 26rpx;
					font-weight: 500;
					color: #999999;
					line-height: 36rpx;
				}
				.info_balance{
					display: flex;
					.balance_text{
						margin-right: 12rpx;
						width: 104rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 500;
						color: #999999;
						line-height: 36rpx;
					}
					.balance{
						margin-right: 24rpx;
						width: 70rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 500;
						color: #999999;
						line-height: 36rpx;
					}
					image{
						margin-top: 10rpx;
						width: 24rpx;
						height: 12rpx;
					}
				}
			}
			.line{
				margin-bottom: 28rpx;
				width: calc(100vw-128rpx);
				height: 2rpx;
				border: 2rpx solid #F4F5F5;
				margin: 0 auto;
				
			}
			.display_item{
				.service{
					display: flex;
					justify-content: space-between;
					margin-top: 28rpx;
					margin-bottom: 26rpx;
					.service_text{
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
					.service_num{
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
					}
				}
				.amount{
					display: flex;
					justify-content: space-between;
					margin-bottom: 26rpx;
					.service_text{
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
					.service_num{
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
					}
				}
			}
		}
	}
}
</style>
