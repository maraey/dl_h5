<template>
	<view class="container">
		<view class="search_box">
			<image src="../../static/search_input.png"></image>
			<input type="text" placeholder-class="phcolor" :placeholder="$t('input-the-order-num')" />
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="order_num">
					{{$t('order-num')}}：202111181047261530
				</view>
				<view class="line">
				</view>
				<view class="info_list">
					<view class="info_title">
						<text>{{$t('order-amount')}}</text>
						<text>{{$t('status')}}</text>
						<text>{{$t('percentage')}}</text>
						<text>{{$t('charging-time')}}</text>
						<!-- <text>{{$t('order-type')}}</text> -->
						<text>{{$t('device-number')}}</text>
					</view>
					<view class="info_text">
						<text>¥0.045</text>
						<text>{{$t('settled')}}</text>
						<text>10</text>
						<text>2021-11-18 10:47:27</text>
						<!-- <text>充电宝</text> -->
						<text>CT034210400353</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{},{},{},{}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100vw;
		height: 100vh;
		padding: 30rpx;
		background: #F4F5F5;
		box-sizing: border-box;
		overflow: scroll;
		.search_box{
			display: flex;
			align-items: center;
			width: 690rpx;
			height: 72rpx;
			margin: 0 auto;
			padding: 0 30rpx;
			background: #FFFFFF;
			border-radius: 4rpx;
			box-sizing: border-box;
			image{
				width: 28rpx;
				height: 28rpx;
				margin-right: 22rpx;
			}
			input{
				width: 580rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
			}
		}
		.list{
			height: calc(100vh - 126rpx);
			margin-top: 24rpx;
			overflow: scroll;
			.item{
				width: 690rpx;
				margin: 0 auto 24rpx;
				padding: 36rpx 32rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				box-sizing: border-box;
				.order_num{
					height: 42rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					line-height: 42rpx;
				}
				.line{
					width: 626rpx;
					height: 2rpx;
					margin: 28rpx auto 30rpx;
					background: #F5F5F5;
				}
				.info_list{
					display: flex;
					align-items: center;
					.info_title,.info_text{
						display: flex;
						flex-direction: column;
						text{
							height: 40rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: #999999;
							line-height: 40rpx;
						}
						text+text{
							margin-top: 16rpx;
						}
					}
					.info_text{
						margin-left: 28rpx;
						text{
							font-weight: 400;
						}
					}
				}
			}
		}
	}
</style>
