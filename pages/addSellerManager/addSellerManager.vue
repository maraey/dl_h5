<template>
	<view class="container">
		<view class="box">
			<view class="title">{{ $t('basic-information') }}</view>
			<view class="list">
				<!-- 				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('store-grade')}}</view>
						<view class="radio_group">
							<picker :value="index" :range="array">
								<view class="picker_box">
									<view class="picker_placeholder" v-if="!index && index !== 0">{{$t('please-select-the-store-grade')}}</view>
									<view class="uni-input" v-if="index || index === 0">{{ array[index] }}</view>
									<image class="picker_image" src="/static/xialaa.png"></image>
								</view>
							</picker>
						</view>
					</view>
				</view> -->
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('user-names') }}:</view>
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
						<view class="item_title">{{ $t('commission-ratio') }}:</view>
						<input class="input" type="text" :value="brokerage" @input="handleBro" :placeholder="$t('please-input-the-commission-ratio')" placeholder-class="phcolor" />
					</view>
				</view>
<!-- 				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('recommender') }}:</view>
						<view class="recommender_box">
							<text class="phcolor" v-if="!recommended_id">{{ $t('please-select')}}:</text>
							<text class="text" v-if="recommended_id">{{recommended_name}}</text>
							<view class="operate">
								<text class="clear" @click="clearRecommender">{{ $t('clear') }}</text>
								<text class="select" @click="openRecommender">{{ $t('select') }}</text>
							</view>
						</view>
					</view>
				</view> -->
<!-- 				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('reward-leve-1') }}:</view>
						<input class="input" type="text" v-model="recommended"  :placeholder="$t('please-input')" placeholder-class="phcolor" />
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('reward-leve-2') }}:</view>
						<input class="input" type="text" v-model="recommended_b"  :placeholder="$t('please-input')" placeholder-class="phcolor" />
					</view>
				</view> -->
			</view>
		</view>
		<view class="box">
			<view class="title">{{ $t('permission-settings') }}</view>
			<view class="list">
				<view class="item_box">
					<view class="item_g">
						<view class="item_title">{{ $t('pop-up-battery') }}</view>
						<switch class="switch" color="#3D82FF" :checked="open_lock === 1" @change="switchOpen" />
					</view>
				</view>
				<view class="item_box">
					<view class="item_g">
						<view class="item_title">{{ $t('prohibited-to-use') }}</view>
						<switch class="switch" color="#3D82FF" :checked="status === 2" @change="switchStatus" />
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="submit" v-if="!isEdit">{{ $t('confirm') }}</view>
		<view class="btn" @click="submit1" v-if="isEdit">{{ $t('confirm') }}</view>
	</view>
</template>

<script>
import { addManager } from '../../utils/addManager/addManager';
import { userDetail, editUser } from '../../utils/role/role.js';
const app = getApp();
export default {
	data() {
		return {
			array: [this.$t('normal'), this.$t('show-order-amount'), this.$t('hidden-daily-revenue')],
			index: '',
			name: '',
			phone: '',
			password: '',
			brokerage: '',
			open_lock: 1,
			status: 1,
			isEdit: false,
			id: '',
			recommended: '',
			recommended_b: '',
			recommended_id: '',
			recommended_name: ''
		};
	},
	onShow() {
		if (app.globalData.seller) {
			this.recommended_name = app.globalData.seller.name;
			this.recommended_id = app.globalData.seller.user_id;
		}
		app.globalData.seller = '';
	},
	methods: {
		onLoad(option) {
			console.log(option);
			if (option.id) {
				uni.setNavigationBarTitle({
					title: this.$t('edit-seller-account')
				});
				this.isEdit = true;
				this.id = option.id;
				this.getInfo(option.id);
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('add.seller-account')
				});
			}
		},

		async getInfo(id) {
			const res = await userDetail({
				user_id: id
			});
			this.name = res.data.name;
			this.phone = res.data.phone;
			this.brokerage = res.data.brokerage;
			this.open_lock = res.data.open_lock;
			this.status = res.data.status;
			this.recommended = res.data.recommended;
			this.recommended_b = res.data.recommended_b;
			this.recommended_id = res.data.recommended_id;
			this.recommended_name = res.data.recommended_name;
		},
		handleName(e) {
			this.name = e.target.value;
		},
		handlePhone(e) {
			this.phone = e.target.value;
		},
		handlePass(e) {
			this.password = e.target.value;
		},
		handleBro(e) {
			this.brokerage = e.target.value;
		},
		switchOpen(e) {
			if (e.detail.value) {
				this.open_lock = 1;
			} else {
				this.open_lock = 0;
			}
			console.log(this.open_lock);
		},
		switchStatus(e) {
			if (e.detail.value) {
				this.status = 2;
			} else {
				this.status = 1;
			}
			console.log(this.status);
		},
		async submit() {
			const res = await addManager({
				name: this.name,
				phone: this.phone,
				password: this.password,
				brokerage: this.brokerage,
				open_lock: this.open_lock,
				status: this.status,
				recommended:this.recommended,
				recommended_b:this.recommended_b,
				recommended_id:this.recommended_id,
				role: 3
			});
			console.log(res);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'success',
					duration: 1000
				});
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}, 1000);
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'error',
					duration: 3000
				});
			}
		},
		async submit1() {
			const res = await editUser({
				id: this.id,
				name: this.name,
				phone: this.phone,
				password: this.password,
				brokerage: this.brokerage,
				open_lock: this.open_lock,
				status: this.status,
				recommended:this.recommended,
				recommended_b:this.recommended_b,
				recommended_id:this.recommended_id,
				role: 3,
			});
			console.log(res);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'success',
					duration: 1000
				});
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}, 1000);
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'error',
					duration: 3000
				});
			}
		},
		clearRecommender() {
			this.recommended_id = '';
			this.recommended_name = '';
		},
		openRecommender() {
			uni.navigateTo({
				url: '/pages/selectSeller/selectSeller'
			});
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
					.switch {
						transform: scale(0.7);
						color: $global-color;
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
					.radio_group {
						display: flex;
						align-items: center;
						.picker_box {
							display: flex;
							justify-content: space-between;
							align-items: center;
							width: 550rpx;
							.picker_image {
								width: 20rpx;
								height: 16rpx;
							}
							.picker_placeholder {
								height: 36rpx;
								font-size: 26rpx;
								font-weight: 400;
								color: #aaaaaa;
								line-height: 36rpx;
							}
							.uni-input {
								height: 36rpx;
								font-size: 26rpx;
								font-weight: 400;
								color: #333;
								line-height: 36rpx;
							}
						}
					}

					.input {
						width: 690rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333;
					}
					.recommender_box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.phcolor{
							width: 530rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.text {
							width: 530rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 26rpx;
							font-weight: 400;
							color: #333;
						}
						.operate {
							.clear {
								padding: 0 15rpx;
								font-size: 26rpx;
								color: #f0513a;
							}
							.select {
								padding: 0 15rpx;
								font-size: 26rpx;
								color: #3D82FF;
							}
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
