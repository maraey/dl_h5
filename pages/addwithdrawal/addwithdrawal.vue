<template>
	<view class="container">
		<view class="list">
			<view class="item">
				<view class="title">{{ $t('schemas.name') }}:</view>
				<input type="text" placeholder-class="phcolor" :placeholder="$t('input-the-name')" v-model="real_name" />
			</view>
			<view class="item">
				<view class="title">{{ $t('bank-card') }}:</view>
				<input type="text" placeholder-class="phcolor" :placeholder="$t('input-bank-card')" v-model="account" />
			</view>
			<view class="item">
				<view class="title">{{ $t('bank-name') }}:</view>
				<input type="text" placeholder-class="phcolor" :placeholder="$t('input-bank-name')" v-model="bank" />
			</view>
			<view class="item">
				<view class="title">{{ $t('code') }}:</view>
				<view class="input_box">
					<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-code')" v-model="code" />
					<view class="get_code" @click="showPopup" v-if="time == 0">{{ $t('get-code') }}</view>
					<view class="get-sms" style="background-color: #F8F8F8;color:#999999;" v-if="time > 0">{{ time }}s</view>
				</view>
			</view>
			<view class="item">
				<view class="title">{{ $t('phone') }}:</view>
				<input type="text" placeholder-class="phcolor" :disabled="disabled" :placeholder="$t('please-enter-phone')" v-model="phone" />
			</view>
		</view>
		<view class="btn" @click="save">{{ $t('save') }}</view>
		<view class="popup" v-if="isShow" @click.stop="closePopup">
			<view class="popup_box" @click.stop="stop">
				<view class="title">{{ $t('please-enter-captcha') }}</view>
				<view class="input_box">
					<input type="text" :placeholder="$t('please-enter-code')" placeholder-class="phcolor" v-model="image_code" />
					<text class="error_text" v-if="showErrCode">{{ $t('incorrect-input') }}</text>
				</view>
				<view class="image_box">
					<image class="image" :src="image_code_url" @click="getImage" ></image>
					<text class="text">{{ $t('click-picture-refresh') }}</text>
				</view>
				<view class="line"></view>
				<view class="btns1">
					<view class="btn1" @click="closePopup">{{ $t('cancle') }}</view>
					<view class="lines"></view>
					<view class="btn1 confirm" @click="confirmSms">{{ $t('confirm') }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { request, config } from '../../utils/request.js';
import { sms } from '../../utils/login/login.js';
import { addWithdrawalAccount, editWithdrawalAccount } from '../../utils/withdrawal/withdrawal.js';
let timer = null;
export default {
	data() {
		return {
			isShow: false,
			image_code: '',
			showErrCode: false,
			image_code_url: '',
			key: '',
			phone: '',
			time: 0,
			code: '',
			bank: '',
			account: '',
			real_name: '',
			disabled: false,
			id: '',
			type:''
		};
	},
	onLoad(options) {
		if (options.type == 1) {
			uni.setNavigationBarTitle({
				title: this.$t('add-withdrawal-Information')
			});
			console.log(options.phone);
			this.phone = options.phone;
			console.log(this.phone)
			this.disabled = true;
		} else {
			this.id = options.id;
			this.disabled = false;
		}
		this.type = options.type
	},
	methods: {
		async confirmSms() {
			const { image_code, phone, key } = this;
			const res = await sms({
				code: image_code,
				phone,
				key,
				area: 65,
				type: 'bank',
			}).catch(err => {
				uni.showToast({
					title: err.data.msg,
					icon: 'none',
					duration: 1000
				});
				console.log(err.data.msg);
				if (err.data.msg == '验证码错误' || 'Verification code error') {
					this.showErrCode = true;
				} else {
					this.showErrCode = false;
				}
			});
			if (res) {
				console.log(res);
				this.time = res.data.data.time;
				console.log(this.time);
				clearInterval(timer);
				timer = setInterval(() => {
					if (this.time > 0) {
						let time = this.time;
						time -= 1;
						this.time = time;
					} else {
						clearInterval(timer);
					}
				}, 1000);
				this.showErrCode = false;
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				});
				this.closePopup();
			}
		},
		showPopup() {
			this.getImage();
			this.isShow = true;
		},
		closePopup() {
			this.isShow = false;
		},
		stop() {},
		getImage() {
			const key = this.randomString(6);
			this.key = key;
			this.image_code_url = `${config.baseUrl}auth/captcha?key=${key}`;
			console.log(this.key);
			console.log(this.image_code_url);
		},
		randomString(length) {
			//获取随机字符串
			let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			let result = '';
			for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			return result;
		},
		async save() {
			console.log(this.type)
			if (this.type == 1) {
				const res = await addWithdrawalAccount({
					phone: this.phone,
					code: this.code,
					real_name: this.real_name,
					account: this.account,
					bank: this.bank
				});
				if (res.code == 1) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 1000
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				}
			} else if (this.type == 2) {
				const res = await editWithdrawalAccount({
					id: this.id,
					phone: this.phone,
					code: this.code,
					real_name: this.real_name,
					account: this.account,
					bank: this.bank
				});
				if (res.code == 1) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 1000
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 30rpx;
	box-sizing: border-box;
	.list {
		.item {
			width: 690rpx;
			padding: 15rpx 0;
			font-size: 26rpx;
			color: #333333;
			border-bottom: 2rpx solid #f5f5f5;
			.title {
				height: 40rpx;
				margin-bottom: 10rpx;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 40rpx;
			}
			.input_box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				input {
					width: 500rpx;
				}
				.get_code {
					width: 150rpx;
					height: 44rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #ffffff;
					text-align: center;
					line-height: 44rpx;
					background: $global-color;
					border-radius: 22rpx;
				}
			}
		}
		.item + .item {
			margin-top: 10rpx;
		}
	}
	.btn {
		width: 690rpx;
		height: 88rpx;
		margin-top: 30rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
		background: $global-color;
		border-radius: 44rpx;
	}
	.popup {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 2;
		.popup_box {
			width: 622rpx;
			height: 420rpx;
			padding-top: 30rpx;
			margin: 340rpx auto 0;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			z-index: 3;
			.title {
				height: 42rpx;
				text-align: center;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			.input_box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 534rpx;
				height: 82rpx;
				margin: 28rpx auto 24rpx;
				padding: 0 24rpx;
				background: #f8f8f8;
				border-radius: 4rpx;
				box-sizing: border-box;
				input {
					width: 500rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
				}
				.error_text {
					font-size: 24rpx;
					font-weight: 400;
					color: #f0513a;
				}
			}
			.image_box {
				display: flex;
				align-items: center;
				width: 534rpx;
				margin: 0 auto;
				.image {
					width: 222rpx;
					height: 88rpx;
					background: #cccccc;
				}
				.text {
					height: 36rpx;
					margin-left: 26rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #aaaaaa;
					line-height: 36rpx;
				}
			}
			.line {
				width: 622rpx;
				height: 2rpx;
				margin-top: 30rpx;
				background: #f5f5f5;
			}
			.btns1 {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn1 {
					width: 310rpx;
					height: 94rpx;
					line-height: 94rpx;
					text-align: center;
					font-size: 30rpx;
					font-weight: 400;
					color: #333333;
				}
				.confirm {
					font-weight: 500;
				}
				.lines {
					width: 2rpx;
					height: 26rpx;
					background: #f5f5f5;
				}
			}
		}
	}
}
</style>
