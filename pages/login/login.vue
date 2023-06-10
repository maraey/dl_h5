<template>
	<view class="login">
	  <view class="top">
	    <image class="image" src="../../static/Frame@2x.png"></image>
	    <view class="text">欢迎使用富立共享代理系统</view>
	  </view>
	  <view class="bottom">
	    <view class="input">
	      <input type="text" placeholder="请输入手机号" v-model="phone" />
	    </view>
	    <view class="input">
	      <input type="password" placeholder="请输入密码" v-model="password"/>
	    </view>
	    <view class="forget">
	      <!-- <navigator class="forgetPassword" url="/pages/forgetPassword/forgetPassword">忘记密码</navigator> -->
	    </view>
	    <view class="loginbtn" @click="login">立即登录</view>
	  </view>
	</view>
</template>

<script>
	import {login} from '../../utils/login/login'
	export default {
		data() {
			return {
				phone:'',
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
					phone:this.phone,
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
.login {
  display: block;
  width: 100vw;
  height: 100vh;
}

.login .top {
  display: block;
  width: 100vw;
  height: 358rpx;
  padding: 0 72rpx;
  background: linear-gradient(109deg, #3D82FF 0%, #47ACFC 95%);
  box-sizing: border-box;
}

.login .top image {
  width: 100rpx;
  height: 100rpx;
  margin: 92rpx 0 36rpx;
}

.login .top .text {
  font-size: 36rpx;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 42rpx;
}

.login .bottom {
  display: block;
  width: 750rpx;
  /* height: 1110rpx; */
  padding: 60rpx 72rpx;
  margin-top: -40rpx;
  background: #FFFFFF;
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  box-sizing: border-box;
}

.login .bottom .input {
  display: flex;
  align-items: center;
  width: 606rpx;
  height: 100rpx;
  padding: 0 40rpx;
  background: #F0F3F6;
  border-radius: 72rpx;
  box-sizing: border-box;
}
.login .bottom .input+.input{
  margin-top: 30rpx;
}
.login .bottom .input input{
  background-color:  #F0F3F6;
}
.login .bottom .forget{
  display: flex;
  justify-content: flex-end;
  margin-top: 10rpx;
}
.login .bottom .forget .forgetPassword{
  color: #666;
}
.login .bottom .loginbtn{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 606rpx;
  height: 80rpx;
  margin-top: 20rpx;
  color: #fff;
  background: linear-gradient(109deg, #3D82FF 100%, #47ACFC 100%);
  border-radius: 80rpx;
}
</style>
