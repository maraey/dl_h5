<template>
	<view class="container">
		<view class="box">
			<view class="title">{{$t('basic-information')}}</view>
			<view class="list">
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('select-store')}}:</view>
						<view class="item_info" @click="selectSeller">
							<text class="item_placeholder" v-if="sellerVip.length == 0">{{$t('select-store')}}</text>
							<text class="item_placeholder" style="color:#333;"  v-if="sellerVip.length > 0"> {{$t('have-been-selected')}} {{sellerVip.length}} {{$t('merchants')}}</text>
							<image class="item_image" src="/static/xialaa.png"></image>
						</view>
					</view>
				</view>
				<view class="item_box" v-if="is_free">
					<view class="item">
						<view class="item_title">{{$t('time-earned')}} ({{$t('minutes')}}):</view>
						<view class="item_info">
							<!-- <text class="item_placeholder">{{$t('duration')}}</text>
							<image class="item_image" src="/static/xialaa.png"></image> -->
							<input type="number" placeholder-class="phcolor" :placeholder="$t('please-input')" v-model="battery_free"/>
						</view>
					</view>
				</view>
				<view class="item_box" v-if="is_discount">
					<view class="item">
						<view class="item_title">{{$t('discount')}}</view>
						<view class="radio_group">
							<picker :value="index" :range="array">
								<view class="picker_box">
									<view class="picker_placeholder" v-if="!index && index !== 0">折</view>
									<view class="uni-input" v-if="index || index === 0">{{ array[index] }}</view>
									<image class="picker_image" src="/static/xialaa.png"></image>
								</view>
							</picker>
						</view>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<view class="item_title">{{$t('find-member')}}:</view>
						<view class="item_info">
							<input class="input" type="text" :disabled="disabled" :value="menber_id" @input="handleId" :placeholder="$t('please-enter-your-membership-number')" placeholder-class="phcolor" />
							<text class="search_text" @click="search" v-if="!disabled">{{$t('search')}}</text>
							<text class="search_delete" @click="searchDelete" v-if="disabled">{{$t('delete')}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="user_box" v-if="showSearch">
			<view class="info">
				<image class="user_image" :src="user_info.avatar"></image>
				<text class="user_name">{{user_info.nick}}</text>
			</view>
			<text class="user_confirm" @click="vipConfirm">{{$t('confirm')}}</text>
		</view>
		<view class="btn" @click="addSellerVip">{{$t('add')}}</view>
	</view>
</template>

<script>
import popup from '../../components/popup.vue'
import {searchUser, addSellerVip, searchShop} from '../../utils/addSellerVip/addSellerVip'
export default {
	data() {
		return {
			is_free: true,
			is_discount: false,
			showPopup: false,
			is_time: true,
			is_timeLength: false,
			array: ['9折', '8折', '7折', '6折', '5折', '4折', '3折', '2折', '1折'],
			index: '',
			showSearch: false,
			menber_id: '',
			user_info: {},
			uid: '',
			disabled: false,
			battery_free:'',
			sellerInfo:{},
			sellerVip:[]
		};
	},
	components: {
		popup
	},
	onLoad(options) {
		console.log(options)
		console.log(JSON.parse(options.List) )
		this.sellerVip = JSON.parse(options.List) 
		console.log(this.sellerVip)
	},
	onShow() {

	},
	methods: {
		changeFree() {
			this.is_free = true,
			this.is_discount = false
		},
		
		changeDiscount() {
			this.is_free = false,
			this.is_discount = true
		},
		
		openPopup() {
			this.showPopup = true
		},
		
		closePopup() {
			this.showPopup = false
		},
		
		changeTime() {
			this.is_time = true,
			this.is_timeLength = false
		},
		
		changeTimeLength() {
			this.is_time = false,
			this.is_timeLength = true
		},
		selectSeller() {
			uni.navigateTo({
			  url: '/pages/selectSellerVip/selectSellerVip',
			})
		},
		handleId(e) {
			this.menber_id = e.target.value
		},
		async search() {
			const res = await searchUser({
				member_id : this.menber_id
			})
			console.log(res)
			if (res.data.id) {
				this.user_info = res.data
				this.showSearch = true
			} else {
				uni.showToast({
					title: this.$t('No-member-found'),
					icon: 'error'
				})
			}
		},
		vipConfirm() {
			this.uid = this.user_info.id
			this.disabled = true
			this.showSearch = false
		},
		searchDelete() {
			this.menber_id = ''
			this.uid = ''
			this.disabled = false
			this.user_info = {}
		},
		async addSellerVip() {
			const seller_ids = []
			this.sellerVip.forEach(item=> {
				seller_ids.push(item.id)
			})
			const res = await addSellerVip({
				uid: this.uid,
				seller_ids: seller_ids.join(),
				battery_free: this.battery_free,
			})
			console.log(res)
			if(res.code==1){
				uni.showToast({
					title: res.msg,
					icon:'none',
					duration:1000
				})
				setTimeout(()=>{
					uni.navigateBack({
						delta: 3
					});
				},1000)
			}
		},
		
		
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
		.title {
			height: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			line-height: 44rpx;
		}
		.list {
			.item_box {
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
						.input {
							width: 600rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #333;
						}
						.search_text{
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: $global-color;
							line-height: 36rpx;
						}
						.search_delete{
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #F0513A;
							line-height: 36rpx;
						}
						.placeholder {
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #333333;
							line-height: 36rpx;
						}
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
	.user_box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		height: 100rpx;
		margin: 2rpx auto 0;
		padding: 0 20rpx 0 24rpx;
		background-color: #fff;
		box-sizing: border-box;
		.info{
			display: flex;
			align-items: center;
			.user_image{
				width: 68rpx;
				height: 68rpx;
				margin-right: 24rpx;
				border-radius: 50%;
			}
			.user_name{
				height: 36rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
				line-height: 36rpx;
			}
		}
		.user_confirm{
			height: 36rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #3D82FF;
			line-height: 36rpx;
		}
	}
	.btn {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 690rpx;
		height: 88rpx;
		margin: 30rpx 0;
		transform: translateX(-50%);
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
		background: $global-color;
		border-radius: 4rpx;
	}
	.popup_wrap {
		width: 100vw;
		.popup_title {
			display: flex;
			justify-content: space-between;
			height: 67rpx;
			.popup_title_left {
				margin-left: 30rpx;
				height: 34rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				line-height: 34rpx;
			}
			.popup_confirm {
				margin-right: 30rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #3D82FF;
				line-height: 40rpx;
			}
		}
		.bottom_line{
			width: 750rpx;
			height: 2rpx;
			background: #F5F5F5;
		}
		.item_box {
			width: 690rpx;
			padding: 30rpx 0;
			margin: 0 auto;
			border-bottom: 2rpx solid #f5f5f5;
			.item_g {
				.item_title {
					height: 36rpx;
					margin-bottom: 20rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
					.item_title_red {
						margin-left: 12rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #F0513A;
						line-height: 36rpx;
					}
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
					.input {
						width: 600rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333;
					}
					.search_text{
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: $global-color;
						line-height: 36rpx;
					}
					.placeholder {
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
	
}
</style>
