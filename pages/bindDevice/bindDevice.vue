<template>
	<view class="container">
		<view class="box">
			<view class="list">
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('input-device-number')}}</view>
						<view class="item_info">
							<input class="input_box" :value="result" @input="handleMinutes"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="save">{{$t('bind')}}</view>
	</view>
</template>

<script>
import {bindSeller, bindAgency} from '../../utils/batteryDevice/batteryDevice'
export default {
	data() {
		return {
			seller_id: '',
			user_id: '',
			result: '',
		};
	},
	onLoad(options) {
		this.seller_id = options.seller_id
		this.user_id = options.user_id
		console.log(this.seller_id, this.user_id)
	},
	mounted() {
	},
	methods: {
		handleMinutes(e){
			this.result = e.target.value.replace(/[^0-9a-zA-Z]/g, '')
			console.log(this.result)
		},
		async save(){
			if(this.seller_id){
				const res = await bindSeller({
					seller_id: this.seller_id,
					code_type: 'sn',
					device_id: this.result,
				})
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration:2000
				})
				if (res.code == 1) {
					setTimeout(()=> {
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				}
			} else {
				const res = await bindAgency({
					agency_id: this.user_id,
					code_type: 'qrcode',
					qrcode: this.result
				})
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration:2000
				})
				if (res.code == 1) {
					setTimeout(()=> {
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				}
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
