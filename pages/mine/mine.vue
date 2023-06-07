<template>
	<view class="content">
		<view class="container">
			<view class="name-logout">
				<view class="hello">{{ $t('hello') }} {{name}}</view>
				<view class="logout" @click="logout">{{ $t('logout') }}</view>
			</view>
			<view class="amount_box">
				<view class="amount_top">
					<view class="amount_total">
						<text class="title">{{ $t('accumulated-commission') }}</text>
						<text class="amount">฿{{ amount.total_amount }}</text>
					</view>
					<view class="line" v-if="userInfo.role != 'seller'"></view>
					<view class="amount_total" v-if="userInfo.role != 'seller'">
						<text class="title">{{$t('pending-review')}}</text>
						<text class="amount">฿{{amount.audit_amount}}</text>
					</view>
				</view>
				<view class="amount_bottom">
					<view class="amounts">
						<text class="title">{{ $t('withdrawn-amount') }}</text>
						<text class="amount">฿{{ amount.withdrawal_amount}}</text>
					</view>
					<view class="amounts">
						<text class="title">{{ $t('withdrawable-amount') }}</text>
						<text class="amount">฿{{ amount.balance }}</text>
					</view>
					<view class="amounts">
						<text class="title">{{ $t('withdrawal-frozen-amount') }}</text>
						<text class="amount">฿{{ amount.freeze_amount }}</text>
					</view>
				</view>
			</view>
			<view class="titles">{{ $t('role-settings') }}</view>
			<view class="list">
				<view class="item" @click="toAgency" >
					<view class="images"><image src="../../static/my_agency.png"></image></view>
					<text class="name">{{ $t('agent') }}</text>
				</view>
				<view class="item" @click="toSeller" >
					<view class="images"><image src="../../static/my_seller_account.png" style="height: 46rpx;"></image></view>
					<text class="name">{{ $t('seller') }}</text>
				</view>
				<view class="item" @click="toVip" >
					<view class="images"><image src="../../static/my_seller_vip.png" style="width: 42rpx;height: 46rpx;"></image></view>
					<text class="name">{{ $t('vip-user') }}</text>
				</view>
				<view class="item" @click="toBusiness" >
					<view class="images"><image src="../../static/my_salesman.png" style="width: 42rpx;height: 46rpx;"></image></view>
					<text class="name">{{ $t('staff-s') }}</text>
				</view>
			</view>
			<view class="titles titles1">{{ $t('more') }}</view>
			<view class="list1">
				<view class="item" @click="changePassword">
					<view class="images"><image src="../../static/my_change_psw.png"></image></view>
					<text class="name">{{ $t('change-password') }}</text>
				</view>
				<view class="item" @click="toDeposit">
					<view class="images"><image src="../../static/my_withdrawal_log.png"></image></view>
					<text class="name">{{ $t('withdrawals-record') }}</text>
				</view>
				<view class="item" @click="changeLang">
					<view class="images"><image src="../../static/change_lang.png" style="width: 52rpx;height: 52rpx;"></image></view>
					<text class="name">{{ $t('language-switch') }}</text>
				</view>
				<view class="item" @click="aboutMe">
					<view class="images"><image src="../../static/aboutUs.png" style="width: 52rpx;height: 52rpx;"></image></view>
					<text class="name">{{ $t('aboutUs') }}</text>
				</view>			
				<view class="item" @click="Cancelaccount" v-if="is_delete === 1">
					<view class="images"><image src="../../static/cancel_ account.png" style="width: 52rpx;height: 52rpx;"></image></view>
					<text class="name">{{ $t('cancel-account') }}</text>
				</view>
	<!-- 			<view class="item" @click="openPrivacy" >
					<view class="images"><image src="../../static/Frame@2x.png" style="width: 52rpx;height: 52rpx;"></image></view>
					<text class="name">{{ $t('privacy-policy') }}</text>
				</view> -->
			</view>
		</view>
		<tabbar selected="mine" ></tabbar>
	</view>
	
</template>

<script>
import tabbar from '../../components/tabbar.vue';
import { index, logout } from '../../utils/mine/mine.js';
import { cancellation } from '../../utils/user/user.js'
export default {
	data() {
		return {
			amount: {},
			name: '',
			userInfo: {},
			is_delete: 0,
		};
	},
	onShow() {
		this.getData();
		this.userInfo=getApp().globalData.userInfo
		const value = uni.getStorageSync('version_info')
		if(value) {
			this.is_delete = JSON.parse(value).agency_register
		}
		console.log(this.is_delete)
	},
	components: {
		tabbar,
	},
	methods: {
		async getData() {
			const res = await index();
			this.amount = res.data;
			this.name = res.data.name
		},
		changeLang() {
			uni.navigateTo({
				url: '../change_lang/change_lang'
			});
		},
		aboutMe() {
			uni.navigateTo({
				url: '../aboutUs/aboutUs'
			});
		},
		toAgency() {
			uni.navigateTo({
				url: '../agency/agency'
			});
		},

		toSeller() {
			uni.navigateTo({
				url: '../sellerAccount/sellerAccount'
			});
		},

		toVip() {
			uni.navigateTo({
				url: '../sellerVip/sellerVip'
			});
		},

		toBusiness() {
			uni.navigateTo({
				url: '../business/business'
			});
		},

		changePassword() {
			uni.navigateTo({
				url: '../password/password'
			});
		},

		replenish() {
			uni.navigateTo({
				url: '../replenish/replenish'
			});
		},

		toDeposit() {
			uni.navigateTo({
				url: '../depositRecord/depositRecord'
			});
		},
		
		openPrivacy(){
			uni.navigateTo({
				url: '/pages/openPrivacy/openPrivacy'
			})
		},
		logout() {
			uni.showModal({
				title: this.$t('api.message'),
				content: this.$t('Are-you-sure-you-want-to-log-out'),
				success: async res => {
					if (res.confirm) {
						logout();
						uni.removeStorage({
							key: 'dl_app_info',
							success: res => {
								uni.reLaunch({
									url: '/pages/login/login'
								});
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		Cancelaccount(){
			uni.showModal({
				title: this.$t('api.message'),
				content: this.$t('Are-you-sure-you-want-to-cancel-account'),
				success: async res => {
					if (res.confirm) {
						cancellation();
						uni.removeStorage({
							key: 'dl_app_info',
							success: res => {
								uni.reLaunch({
									url: '/pages/login/login'
								});
							}
						});
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
.content{
	width: 100vw;
	height: 100vh;
	.container {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		padding: 30rpx 30rpx 0 30rpx;
		.name-logout {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.hello {
				height: 42rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			.logout {
				height: 42rpx;
				padding: 0 18rpx;
				text-align: center;
				line-height: 42rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #ffffff;
				background: #f0513a;
				border-radius: 4rpx;
			}
		}
		.amount_box {
			width: 690rpx;
			// height: 298rpx;
			margin: 30rpx auto;
			padding: 36rpx 32rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(61, 130, 255, 0.1);
			border-radius: 8rpx;
			box-sizing: border-box;
			.amount_top {
				display: flex;
				align-items: center;
				margin-bottom: 40rpx;
				.amount_total {
					display: flex;
					flex-direction: column;
					.title {
						// height: 40rpx;
						margin-bottom: 10rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 0.5);
						// line-height: 40rpx;
					}
					.amount {
						height: 58rpx;
						font-size: 48rpx;
						font-weight: 500;
						color: #333333;
						line-height: 58rpx;
					}
				}
				.line {
					width: 2rpx;
					height: 48rpx;
					margin: 0 80rpx;
					background: rgba(0, 0, 0, 0.1);
				}
			}
			.amount_bottom {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;
				align-content: space-between;
				.amounts {
					display: flex;
					flex-direction: column;
					width: 50%;
					.title {
						// height: 40rpx;
						margin-bottom: 4rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 0.5);
						// line-height: 40rpx;
					}
					.amount {
						height: 34rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #333333;
						line-height: 34rpx;
					}
				}
			}
		}
		.titles {
			height: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			line-height: 44rpx;
		}
		.titles1 {
			margin: 0 0 30rpx 0;
		}
		.list {
			display: flex;
			margin-top: 32rpx;
			flex-flow: row wrap;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 30rpx;
				width: 50%;
				.images {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 52rpx;
					height: 52rpx;
					margin-bottom: 18rpx;
					image {
						width: 52rpx;
						height: 52rpx;
					}
				}
				.name {
					height: 36rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
			}
		}
		.list1 {
			display: flex;
			flex-flow: row wrap;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 30rpx;
				width: 50%;
				.images {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 52rpx;
					height: 56rpx;
					margin-bottom: 16rpx;
					image {
						width: 52rpx;
						height: 56rpx;
					}
				}
				.name {
					height: 36rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
			}
		}
	}
}

</style>
