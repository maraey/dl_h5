<template>
	<view class="container">
		<view class="info_list">
			<view class="info_item">
				<text class="info_title">{{ $t('phone') }}</text>
				<input type="text" :placeholder="$t('please-enter-phone')" placeholder-class="phcolor" v-model="phone" />
			</view>
			<view class="info_item">
				<text class="info_title">{{ $t('code') }}</text>
				<view class="sms-box">
					<input type="text" :placeholder="$t('please-enter-code')" placeholder-class="phcolor" v-model="code" />
					<view class="get-sms" @click="showPopup" v-if="time == 0">{{ $t('get-code') }}</view>
					<view class="get-sms" style="background-color: #F8F8F8;color:#999999;" v-if="time > 0">{{ time }}s</view>
				</view>
			</view>
			<view class="info_item">
				<text class="info_title">{{ $t('new-password') }}</text>
				<input type="password" :placeholder="$t('please-enter-new-password')" placeholder-class="phcolor" v-model="new_password" />
			</view>
			<view class="info_item">
				<text class="info_title">{{ $t('retype-new-password') }}</text>
				<input type="password" :placeholder="$t('retype-new-password')" placeholder-class="phcolor" v-model="confirm_password" />
			</view>
		</view>
		<view class="sub" @click="submit">{{ $t('submit') }}</view>
		<view class="popup" v-if="isShow" @click.stop="closePopup">
			<view class="popup_box" @click.stop="stop">
				<view class="title">{{ $t('please-enter-captcha') }}</view>
				<view class="input_box">
					<input type="text" :placeholder="$t('please-enter-code')" placeholder-class="phcolor" v-model="image_code" />
					<text class="error_text" v-if="showErrCode">{{ $t('incorrect-input') }}</text>
				</view>
				<view class="image_box">
					<image class="image" :src="image_code_url" @click="getImage"></image>

					<text class="text">{{ $t('click-picture-refresh') }}</text>
				</view>
				<view class="line"></view>
				<view class="btns">
					<view class="btn" @click="closePopup">{{ $t('cancle') }}</view>
					<view class="lines"></view>
					<view class="btn confirm" @click="confirmSms">{{ $t('confirm') }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { request, config } from '../../utils/request.js';
import { sms, forgotPassword } from '../../utils/login/login.js';
let timer = null;
export default {
	data() {
		return {
			isShow: false,
			phone: '',
			code: '',
			new_password: '',
			confirm_password: '',
			image_code: '',
			key: '',
			image_code_url: '',
			showErrCode: false,
			time: 0
		};
	},
	methods: {
		showPopup() {
			this.getImage();
			this.isShow = true;
		},
		closePopup() {
			this.image_code = '';
			this.isShow = false;
		},
		stop() {},
		randomString(length) {
			let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			let result = '';
			for (var i = length; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
			return result;
		},
		getImage() {
			const key = this.randomString(6);
			this.key = key;
			this.image_code_url = `${config.baseUrl}auth/captcha?key=${key}`;
			console.log(key);
			console.log(this.image_code_url);
		},
		async confirmSms() {
			const { image_code, phone, key } = this;
			const res = await sms({
				code: image_code,
				phone,
				key,
				area:65,
				type: 'repassword',
			}).catch(err => {
				console.log(err.data.msg);
				if (err.data.msg == '验证码错误') {
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
					icon: 'success',
					duration: 1000
				});
				this.closePopup();
			}
		},
		async submit() {
			const { phone, code, new_password, confirm_password } = this;
			const res = await forgotPassword({
				phone,
				code,
				new_password,
				confirm_password,
				ocode:config.ocode
			});
			console.log(1);
			if(res.code == 1){
				uni.showToast({
					title: res.msg,
					icon: 'success',
					duration: 1000
				});
				setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/login/login'
					});
				},1000)
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.info_list {
		.info_item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 690rpx;
			height: 150rpx;
			margin: 0 auto;
			border-bottom: 2rpx solid #f5f5f5;
			.info_title {
				height: 36rpx;
				margin-bottom: 24rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
				line-height: 36rpx;
			}
			input {
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
			}
			.sms-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				input {
					width: 400rpx;
				}
				.get-sms {
					height: 44rpx;
					padding: 0 20rpx;
					text-align: center;
					line-height: 44rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #ffffff;
					background: $global-color;
					border-radius: 22rpx;
				}
			}
		}
	}
	.sub {
		width: 690rpx;
		height: 88rpx;
		margin: 30rpx auto;
		text-align: center;
		line-height: 88rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
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
			.btns {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn {
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
