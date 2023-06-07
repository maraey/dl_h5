<template>
	<view class="container">
		<view class="top">
			<image src="/static/logo1.png"></image>
		</view>
		<view class="info_box">
			<view class="info_item">
				<text class="title">{{$t('phone')}}</text>
				<input type="number" :placeholder="$t('please-enter-phone')" placeholder-class="phcolor" v-model="name"/>
			</view>
			<view class="info_item">
				<text class="title">{{$t('password')}}</text>
				<view class="password">
					<input :type="is_show?'text':'password'" :placeholder="$t('please-enter-password')" class="delborder" placeholder-class="phcolor" v-model="password" />
					<image class="can_pass" v-if="is_show" src="../../static/xianshi.png" @click="handlePass"></image>
					<image class="can_pass" v-if="!is_show" src="../../static/yincang.png" @click="handlePass"></image>
				</view>
			</view>
		</view>
		<view class="forget" >
			<view class="register" @click="toRegister" >
				<text v-if="is_register=== 1">{{$t('register')}}</text> 
			</view>
			<view class="forget_password" @click="toForget">
				{{$t('forget-password')}}
			</view>
		</view>
		<view class="login" @click="login">
			{{$t('login')}}
		</view>

	</view>
</template>

<script>
	import {login} from '../../utils/login/login'
	export default {
		data() {
			return {
				name:'',
				password:'',
				lang:'en-us',
				is_register: 0,
				is_show:false
			}
		},
		mounted() {
			console.log(uni.getLocale());
			if(uni.getLocale()=='zh-Hans'){
				this.lang = 'zh-cn'
			}else{
				this.lang = 'en-us'
			}
			const value = uni.getStorageSync('version_info')
			if(value) {
				this.is_register = JSON.parse(value).agency_register
			}
		},
		methods: {
			async login(){
				const res= await login({
					phone:this.name,
					password:this.password,
					lang:this.lang
				})
				console.log(res);
				uni.setStorage({
					key: 'dl_app_info',
					data: JSON.stringify(res.data),
					success: () => {
						console.log('success');
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}
				});
			},
			toForget(){
				uni.navigateTo({
					url:'/pages/forgetPsw/forgetPsw'
				})
			},
			toRegister(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			handlePass() {
				this.is_show = !this.is_show
				console.log(this.is_show)
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
				height: 186rpx;
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
					width: 130rpx;
					height: 40rpx;
					margin-bottom: 24rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
				}
				input{
					width: 510rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
				}
				.password{
					display: flex;
					justify-content: space-between;
					.delborder{
						width: 510rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						border: none;
						outline: none;
					}
					.can_pass{
						width: 36rpx;
						height: 36rpx;
					}
				}

			}
		}
		.forget{
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			.register{
				height: 34rpx;
				color: #333333;;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 34rpx;
			}
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
