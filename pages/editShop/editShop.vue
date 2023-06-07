<template>
	<view class="container">
		<view class="box">
			<view class="list">
				<view class="item_box" v-if="is_free">
					<view class="item">
						<view class="item_title">{{ $t('free-time-of-power-bank') }}:</view>
						<view class="item_info">
							<input class="input_box" :value="minutes" @input="handleMinutes"/>
							<text class="placeholder">{{ $t('minutes') }}</text>
						</view>
					</view>
				</view>
				<view class="item_box" v-if="is_discount">
					<view class="item">
						<view class="item_title">{{ $t('power-bank-discount') }}</view>
						<view class="item_info">
							<text class="placeholder">9折</text>
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="save">{{ $t('save') }}</view>
	</view>
</template>

<script>
import {shopInfo, editShops} from '../../utils/special/special'
export default {
	data() {
		return {
			is_free: true,
			is_discount: false,
			uid: '',
			sid: '',
			minutes: '',
		};
	},
	onLoad(options) {
		console.log(options)
		this.uid = options.uid
		this.sid = options.sid
	},
	mounted() {
		this.getData()
	},
	methods: {
		async getData(){
			const res = await shopInfo({
				uid: this.uid,
				sid: this.sid
			})
			console.log(res)
			this.minutes = res.data.battery_free
		},
		handleMinutes(e){
			this.minutes = e.target.value
			console.log(this.minutes)
		},
		async save(){
			uni.showLoading({
				title:'loading...',
				mask: true
			})
			const res = await editShops({
				uid: this.uid,
				sid: this.sid,
				battery_free: this.minutes,
			})
			uni.hideLoading()
			uni.showToast({
				title: res.msg,
				icon: 'none'
			})
			if (res.code == 1) {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
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
						height: 36rpx;
						margin-bottom: 20rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
					}
					.switch {
						transform: scale(0.7);
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
					.item_info {
						display: flex;
						align-items: center;
						.input_box{
							width: 120rpx;
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #aaaaaa;
							line-height: 36rpx;
						}
						.item_placeholder {
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #aaaaaa;
							line-height: 36rpx;
						}
						.placeholder {
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #333333;
							line-height: 36rpx;
						}
						.item_image {
							width: 20rpx;
							height: 16rpx;
						}
						input {
							width: 580rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #333333;
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
		margin: 30rpx 30rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
		background: $global-color;
		border-radius: 4rpx;
	}
}
</style>
