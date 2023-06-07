<template>
	<view class="container">
		<view class="box">
			<view class="list">
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('consignee-name')}}</view>
						<view class="item_info">
							<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-the-recipient-name')" />
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('mobile-phone')}}</view>
						<view class="item_info">
							<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-the-recipient-phone')" />
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('address')}}</view>
						<view class="item_info">
							<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-shipping-address')" />
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('supplements-quantity')}}</view>
						<view class="item_info">
							<text class="placeholder">0</text>
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">{{$t('apply-for-supplement')}}</view>
		<view class="record" @click="checkRecord">{{$t('check-supplement-records')}}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		checkRecord() {
			uni.navigateTo({
				url:'../replenishRecord/replenishRecord'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #f4f5f5;
	overflow: scroll;
	.box {
		padding: 30rpx 30rpx 0;
		background-color: #fff;
		box-sizing: border-box;
		.list {
			.item_box {
				width: 690rpx;
				padding: 30rpx 0;
				margin: 0 auto;
				.item_g {
					.item_title {
						height: 40rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
					}
					.switch{
						transform:scale(.7);
						color: $global-color;
					}
					.radio_group {
						display: flex;
						align-items: center;
						.radio {
							display: flex;
							align-items: center;
							.radio_image {
								width: 36rpx;
								height: 36rpx;
								margin-right: 16rpx;
							}
							.radio_text {
								height: 36rpx;
								font-size: 26rpx;
								font-weight: 400;
								color: #333333;
								line-height: 36rpx;
							}
						}
						.radio + .radio {
							margin-left: 40rpx;
						}
					}
					
				}
				.item {
					.item_title {
						height: 36rpx;
						margin-bottom: 20rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
					}
					.item_info{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.item_placeholder{
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #AAAAAA;
							line-height: 36rpx;
						}
						.placeholder{
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #333333;
							line-height: 36rpx;
						}
						.item_image{
							width: 20rpx;
							height: 16rpx;
						}
						input {
							width: 600rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #333;
						}
					}
				}
			}
			.item_box + .item_box {
				border-top: 2rpx solid #f5f5f5;
			}
		}
	}
	.box + .box {
		margin-top: 30rpx;
	}
	.btn {
		width: 690rpx;
		height: 88rpx;
		margin: 30rpx 30rpx 16rpx 30rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
		background: $global-color;
		border-radius: 44rpx;
	}
	.record{
		// width: 144rpx;
		height: 34rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #3D82FF;
		line-height: 34rpx;
	}
}
</style>
