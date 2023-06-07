<template>
	<view class="container">
		<view class="box">
			<view class="list">
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('old-password')}}:</view>
						<view class="item_info">
							<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-password')" v-model="old_password"/>
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('new-password')}}:</view>
						<view class="item_info">
							<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-password')" v-model="new_password"/>
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('confirm-the-new-password')}}:</view>
						<view class="item_info">
							<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-passwords')" v-model="confirm_password"/>
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="submit">{{$t('save')}}</view>
	</view>
</template>

<script>
	import{changePassword} from '../../utils/mine/mine.js'
export default {
	data() {
		return {
			old_password:'',
			new_password:'',
			confirm_password:''
		};
	},
	methods: {
		submit(){
			uni.showModal({
				title: this.$t('api.message'),
				content: this.$t('Are-you-sure-to-submit'),
				success: async res => {
					if (res.confirm) {
						const {old_password,new_password,confirm_password} = this
						const res1 = await changePassword({
							old_password,
							new_password,
							confirm_password
						})
						console.log(res1);
						
						if(res1.code==1){
							console.log(1);
							uni.showToast({
								title:res1.msg,
								icon:'none',
								duration:1000
							})
							uni.removeStorage({
								key: 'dl_app_info',
								success: res => {
									setTimeout(()=>{
										uni.reLaunch({
											url: '/pages/login/login'
										});
									},1000)
								}
							});
						}
						
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	position: relative;
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
						height: 40rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
					}
					.switch{
						transform:scale(.7);
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
					.item_info{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.item_placeholder{
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #AAAAAA;
							line-height: 36rpx;
						}
						.item_image{
							width: 20rpx;
							height: 16rpx;
						}
						input {
							width: 600rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #333;
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
		border-radius: 44rpx;
	}
}
</style>
