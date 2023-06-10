<template>
	<view class="container">
		<view class="box">
			<view class="title">{{ $t('basic-information') }}</view>
			<view class="list">
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('user-name-agency') }}:</view>
						<input class="input" type="text" :value="name" @input="handleName" :placeholder="$t('input-user-name')" placeholder-class="phcolor" />
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('phone-num-for-login') }}:</view>
						<input class="input" type="text" :value="phone" @input="handlePhone" :placeholder="$t('please-enter-phone')" placeholder-class="phcolor" />
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('password-for-login') }}:</view>
						<input class="input" type="text" :value="password" @input="handlePass" :placeholder="$t('please-enter-password')" placeholder-class="phcolor" />
					</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="title">{{$t('permission-settings')}}</view>
			<view class="list">
				<view class="item_box">
					<view class="item_g">
						<view class="item_title">{{$t('prohibited-to-use')}}</view>
						<switch class="switch" color="#3D82FF" :checked="status===2" @change="switchStatus" />
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="submit">{{$t('confirm')}}</view>
	</view>
</template>

<script>
import {addIntroducer, marketerEdit} from '../../utils/marketer/marketer.js'
export default {
	data() {
		return {
			name: '',
			phone: '',
			password: '',
			brokerage: '',
			status: 1,
			id: '',
		}
	},
	onLoad (options){
		console.log(options)
		const info = JSON.parse(options.info ? options.info : '{}')
		if(options.id || options.id == 0) {
			this.id = options.id
			this.name = info.name
			this.phone = info.phone
			this.brokerage = info.brokerage
			this.open_lock = info.can_popup
			this.status = info.status
			this.is_buy = info.type
			this.can_add = info.can_sub
			uni.setNavigationBarTitle({
				title: '修改渠道商'
			})
			console.log(this.is_buy)
		}

	},
	methods: {
		async submit() {
			if (this.id) {
				const res = await marketerEdit({
					id: this.id,
					type: '5',
					name: this.name,
					phone: this.phone,
					status: this.status,
					password: this.password,
				})
				if(res.code == 200) {
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 1000
					})
					setTimeout(()=> {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error',
						duration: 1000
					})
				}
			} else {
				const res = await addIntroducer({
					name: this.name,
					phone: this.phone,
					password: this.password,
					status: this.status,
				})
				console.log(res)
				if(res.code == 200) {
					uni.showToast({
						title: res.msg,
						icon: 'success',
						duration: 1000
					})
					setTimeout(()=> {
						uni.switchTab({
							url: '/pages/index/index',
						})
					}, 1000);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error',
						duration: 3000
					})
				}
			}
		},
		handleName(e) {
			this.name = e.target.value
		},
		handlePhone(e) {
			this.phone = e.target.value
		},
		handlePass(e) {
			this.password = e.target.value
			console.log(this.password)
		},
		handleBro(e) {
			this.brokerage = e.target.value
		},
		switchStatus(e) {
			if(e.detail.value) {
				this.status = 2
			} else {
				this.status = 1
			}
			console.log(this.status)
		},
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
		.title {
			height: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			line-height: 44rpx;
		}
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

					.input {
						width: 690rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333;
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
		margin: 30rpx auto;
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
