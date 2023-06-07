<template>
	<view class="container">
		<view class="images">
			<view class="text">
				<text class="title">{{$t('withdrawable-amount')}}</text>
				<text class="num_wrap"><text class="num">{{apply.balance}}</text></text>
			</view>
		</view>
		<view class="title_input">
			{{$t('please-input-the-withdrawal-amount')}}:
		</view>
		<view class="input">
			<input type="text" v-model="amount" placeholder-class="phcolor" placeholder-style="font-size: 60rpx;" placeholder="0.00">
		</view>
		<view class="line">
		</view>
<!-- 		<view class="tips">
			{{$t('reminder-the-minimum-withdrawal')}}50{{$t('per-day-the-maximum-withdrawal')}}3000{{$t('the-withdrawal-is-allowed')}}0.6%。
		</view> -->
		<view class="info_box">
			<view class="info_title">
				<text>{{$t('account-name')}}：</text>
				<text>{{$t('account-number')}}：</text>
			</view>
			<view class="info_text">
				<text>{{apply.real_name}}</text>
				<text>{{apply.account}}</text>
			</view>
		</view>
		<view class="btns">
			<view class="apply" @click="applyAmount">
				{{$t('withdraw-money')}}
			</view>
			<view class="edit" @click="edit">
				{{$t('modify-withdrawal-Information')}}
			</view>
		</view>
	</view>
</template>

<script>
import { withdrawalAccount,applyWithdrawalAccount } from '../../utils/withdrawal/withdrawal.js';
export default {
	data() {
		return {
			apply:{},
			amount:''
		};
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		async getInfo() {
			const res = await withdrawalAccount();
			if(res.code==301){
				uni.navigateTo({
					url:'/pages/addwithdrawal/addwithdrawal?type=1&phone='+res.data.phone
				})
			}else if(res.code==1){
				this.apply = res.data
			}
		},
		edit(){
			uni.navigateTo({
				url:'/pages/addwithdrawal/addwithdrawal?type=2&id='+this.apply.id
			})
		},
		async applyAmount(){
			const res = await applyWithdrawalAccount({
				amount:this.amount,
				account_id:this.apply.id
			})
			if(res.code==1){
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				});
				setTimeout(() => {
					uni.reLaunch({
						url:'/pages/index/index'
					})
				}, 1000);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 22rpx;
	box-sizing: border-box;
	.images {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 714rpx;
		height: 354rpx;
		margin: 0 auto;
		background-image: url('@/static/withdrawal_bgi.png');
		background-size: 714rpx 354rpx;
		background-repeat: no-repeat;
		.text {
			display: flex;
			flex-direction: column;
			align-items: center;
			.title {
				height: 42rpx;
				font-size: 30rpx;
				font-weight: 400;
				color: #ffffff;
				line-height: 42rpx;
			}
			.num_wrap {
				margin-top: 20rpx;
				.num {
					height: 72rpx;
					font-size: 60rpx;
					font-weight: 500;
					color: #ffffff;
					line-height: 72rpx;
				}
			}
		}
	}
	.title_input{
		width: 690rpx;
		margin: 24rpx auto 30rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}
	.input{
		width: 690rpx;
		margin: 0 auto;
		input{
			width: 690rpx;
			height: 74rpx;
			font-size: 60rpx;
			color: #333333;
			line-height: 74rpx;
		}
	}
	.line{
		width: 690rpx;
		height: 2rpx;
		margin: 20rpx auto 30rpx;
		background: #F5F5F5;
	}
	.tips{
		width: 690rpx;
		height: 102rpx;
		margin: 0 auto 30rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #F0513A;
		line-height: 34rpx;
	}
	.info_box{
		display: flex;
		width: 690rpx;margin: 0 auto;
		.info_title,.info_text{
			display: flex;
			flex-direction: column;
			text{
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
			}
			text+text{
				margin-top: 16rpx;
			}
		}
		.info_text{
			text{
				margin-left: 30rpx;
				color: #333333;
			}
		}
	}
	.btns{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		margin: 30rpx auto;
		.apply{
			width: 332rpx;
			height: 88rpx;
			text-align: center;
			line-height: 84rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #3D82FF;
			background: #FFFFFF;
			border-radius: 4rpx;
			border: 2rpx solid #3D82FF;
			box-sizing: border-box;
		}
		.edit{
			width: 332rpx;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #FFFFFF;
			background: #3D82FF;
			border-radius: 4rpx;
		}
	}
}
</style>
