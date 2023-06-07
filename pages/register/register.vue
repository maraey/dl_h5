<template>
	<view class="container">
		<view class="top">
			<image src="/static/logo@2x.png"></image>
		</view>
		<view class="info_box">
			<view class="info_item">
				<text class="title">{{ $t('name') }}</text>
				<input type="text" :placeholder="$t('please-enter-your-name')" placeholder-class="phcolor" v-model="name"/>
			</view> 
			<view class="info_item">
				<text class="title">{{$t('phone')}}</text>
				<view class="input_type">
					<text class="number">+65</text?>
					<input type="number" :placeholder="$t('please-enter-phone')" placeholder-class="phcolor" v-model="phone"/>
				</view>
			</view>
			<view class="info_item">
				<view class="title">{{ $t('code') }}</view>
				<view class="input_box">
					<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-code')" v-model="code" />
					<view class="get_code" @click="getCode" v-if="!time">{{ $t('get-code') }}</view>
					<view class="get-sms" style="background-color: #F8F8F8;color:#999999;" v-if="time > 0">{{ time }}s</view>
				</view>
			</view>
			<view class="info_item">
				<text class="title">{{$t('password')}}</text>
				<input type="password" :placeholder="$t('please-enter-password')" placeholder-class="phcolor" v-model="password"/>
			</view>
		</view>
		<view class="login" @click="register">
			{{$t('register-btn')}}
		</view>
<!-- 		<view class="about" >
			<text>Copyright belongs to the GOOD BROTHERS' COMPANY LIMITED</text>
		</view> -->
	</view>
</template>

<script>
	let timer = null
	import {register, registerSms} from '../../utils/login/login'
	export default {
		data() {
			return {
				name:'',
				password:'',
				lang:'en-us',
				time: 0,
				code: '',
				phone: ''
			}
		},
		mounted() {
			console.log(uni.getLocale());
			if(uni.getLocale()=='zh-Hans'){
				this.lang = 'zh-cn'
			}else{
				this.lang = 'en-us'
			}
			
		},
		methods: {
			async getCode(){
				if(this.phone!= ''){
					const res = await registerSms({
						phone: 65+this.phone,
						type: 'register'
					})
					console.log(res)
					if (res.data.code == 1) {
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
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 3000
						});
					}
				}else {
					uni.showToast({
						title: this.$t('please-enter-phone'),
						icon: 'none',
						duration: 1000
					});
				}

			},
			async register(){
				const res = await register({
					name: this.name,
					mobile: 65+this.phone,
					code: this.code,
					password: this.password
				})
				console.log(res)
				if(res.code === 1) {
					uni.showModal({
						title: res.msg,
						icon: 'none'
					})
					uni.reLaunch({
						url:'/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.top{
			position:relative;
			width: 100vw;
			height: 276rpx;
			// background-image: url('/static/login_top.png');
			// background-repeat: no-repeat;
			background-size: 750rpx 276rpx;
			image{
				position:absolute;
				width: 230rpx;
				height: 154rpx;
				top: 126rpx;
				left:50%;
				transform:translateX(-50%);
			}
		}
		.info_box{
			width: 690rpx;
			margin:50rpx auto 30rpx;
			.info_item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 690rpx;height: 162rpx;
				border-bottom: 2rpx solid #F5F5F5;
				.title{
					height: 40rpx;
					margin-bottom: 24rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
				}
				.input_type{
					display: flex;
					align-items: center;
					.number{
						width: 68rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
					}
				}
				input{
					width: 510rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
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
						color: $global-color;
						text-align: center;
						line-height: 44rpx;
						background: #ffffff;
						border-radius: 22rpx;
						border: 1rpx solid $global-color;
					}
				}
			}
		}
		.forget{
			display: flex;
			justify-content: flex-end;
			padding: 0 30rpx;
			.forget_password{
				height: 34rpx;
				color: $global-color;
				font-size: 24rpx;
				font-weight: 500;
				line-height: 34rpx;
			}
		}
		.login{
			width: 690rpx;
			height: 88rpx;
			margin: 30rpx auto;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #fff;
			background-color: $global-color;
			border-radius: 44rpx;
		}
		.about{
			position: absolute;
			width: 690rpx;
			margin: 30rpx auto;
			text-align: center;
			bottom: 56rpx;
			left: 30rpx;
			text{
				height: 16rpx;
				font-size: 22rpx;
				font-weight: 400;
				color: #333333;
				line-height: 16rpx;
			}
		}
	}
</style>
