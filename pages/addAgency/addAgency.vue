<template>
	<view class="container">
		<view class="box">
			<view class="title">{{ $t('basic-information') }}</view>
			<view class="list">
				<view class="item_box">
					<view class="item_g">
						<view class="item_title">{{ $t('franchise-type') }}</view>
						<view class="radio_group">
							<view class="radio" @click="changeBuy">
								<image class="radio_image" src="../../static/selected1.png" v-if="is_buy"></image>
								<image class="radio_image" src="../../static/unselected(1).png" v-if="!is_buy"></image>
								<text class="radio_text">{{ $t('purchase') }}</text>
							</view>
							<view class="radio" @click="changeRelease" v-if="!forbidden">
								<image class="radio_image" src="../../static/selected1.png" v-if="is_release"></image>
								<image class="radio_image" src="../../static/unselected(1).png" v-if="!is_release"></image>
								<text class="radio_text">{{ $t('investor') }}</text>
							</view>
						</view>
					</view>
				</view>
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
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('commission-ratio')}}:</view>
						<input class="input" type="text" :value="brokerage" @input="handleBro" :placeholder="$t('please-input-the-commission-ratio')" placeholder-class="phcolor" />
					</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="title">{{$t('permission-settings')}}</view>
			<view class="list">
				<view class="item_box">
					<view class="item_g">
						<view class="item_title">{{$t('pop-up-battery')}}</view>
						<switch class="switch" color="#3D82FF" :checked="open_lock===1" @change="switchOpen"/>
					</view>
				</view>
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
import {addAgency, editAgency} from '../../utils/addAgency/addAgency'
export default {
	data() {
		return {
			is_buy: true,
			is_release: false,
			is_self: 1,
			name: '',
			phone: '',
			password: '',
			brokerage: '',
			open_lock: 1,
			status: 1,
			id: '',
			forbidden: false,
		}
	},
	onLoad (options){
		console.log(options)
		const info = JSON.parse(options.info ? options.info : '{}')
		if(options.id || options.id == 0) {
			this.id = options.id
			this.is_self = info.is_self
			this.name = info.name
			this.phone = info.phone
			this.brokerage = info.brokerage
			this.open_lock = info.open_lock
			this.status = info.status
			uni.setNavigationBarTitle({
				title: this.$t('modify-agent')
			})
			console.log(this.is_self)
			if(this.is_self == 1) {
				this.changeBuy()
				this.forbidden = true
			}else {
				this.changeRelease()
				this.forbidden = false
			}
			console.log(this.forbidden)
		}

	},
	methods: {
		changeBuy() {
			(this.is_buy = true), (this.is_release = false);
			if (this.is_buy) {
				this.is_self = 1
			} else {
				this. is_self = 0
			}
			console.log(this.is_self)
		},
		changeRelease() {
			(this.is_buy = false), (this.is_release = true);
			if (this.is_release) {
				this.is_self = 0
			} else {
				this. is_self = 1
			}
			console.log(this.is_self)
		},
		async submit() {
			if (this.id) {
				const res = await editAgency({
					id: this.id,
					name: this.name,
					phone: this.phone,
					brokerage: this.brokerage,
					role: 1,
					is_self: this.is_self,
					open_lock: this.open_lock,
					status: this.status,
					password: this.password,
				})
				if(res.code == 1) {
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
				const res = await addAgency({
					is_self: this.is_self,
					name: this.name,
					phone: this.phone,
					password: this.password,
					brokerage: this.brokerage,
					open_lock: this.open_lock,
					status: this.status,
					role: 1
				})
				console.log(res)
				if(res.code == 1) {
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
		switchOpen(e) {
			if(e.detail.value) {
				this.open_lock = 1
			} else {
				this.open_lock = 0
			}
			console.log(this.open_lock)
		},
		switchStatus(e) {
			if(e.detail.value) {
				this.status = 2
			} else {
				this.status = 1
			}
			console.log(this.status)
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
