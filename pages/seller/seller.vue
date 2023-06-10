<template>
	<view class="container">
		<topTabbar :popupSeller="popupSeller" :popupStatus="popupStatus" :status="status" @click="selectScreen" @deviceSelect="getDevice" @sellerDataSelect="getData"></topTabbar>
		<scroll-view class="list" scroll-y="true">
			<view class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item.store_id)">
				<view class="title">
					<text>{{item.name}}</text>
					<image src="../../static/more12.png"></image>
				</view>
				<view class="address">{{item.address}}</view>
				<view class="info_box">
					<view class="title">{{$t('commission-ratio')}}</view>
					<text class="text">: {{item.rate}}</text>
				</view>
				<view class="info_box">
					<view class="title">{{$t('creation-time')}}</view>
					<text class="text">: {{item.create_date}}</text>
				</view>
			</view>
		</scroll-view>
		<image class="add_image" @click="addSeller" src="../../static/add_seller_btn.png" v-if="userInfo.role != 'seller'"></image>
		<tabbar selected="seller"></tabbar>
	</view>
</template>

<script>
import tabbar from '../../components/tabbar.vue';
import topTabbar from '../../components/topTabbar.vue';
import {sellerList} from '../../utils/seller/seller'
export default {
	data() {
		return {
			page: 1,
			page_size: 20,
			is_sub: false,
			keyword: '',
			seller_id: '',
			device_id: '',
			title: [
				{
					title: this.$t('my-data')
				},
				{
					title: this.$t('filter')
				}
			],
			list:[],
			status: false,
			popupStatus: false,
			popupSeller: true,
			userInfo: {}
		};
	},
	components: {
		topTabbar,
		tabbar
	},
	onShow() {
		this.getList()
		this.userInfo=getApp().globalData.userInfo
	},
	methods: {
		silence() {
			console.log(1111);
		},
		toDetail(e) {
			this.seller_id = e
			uni.navigateTo({
				url:`../sellerDetail/sellerDetail?seller_id=${this.seller_id}`
			})
		},
		addSeller() {
			uni.navigateTo({
				url:'../addSeller/addSeller'
			})
		},
		async getList(){
			const res = await sellerList({
				page: this.page,
				page_size: this.page_size,
				is_sub: String(this.is_sub),
				keyword: this.device_id,
			})
			console.log(res)
			this.list = res.data.list
		},
		getDevice(data) {
			this.device_id = data
			console.log(this.device_id)
			this.getList()
		},
		getData(data) {
			console.log(data)
			if(data == 'my') {
				this.is_sub = false
			} else {
				this.is_sub = true
			}
			console.log(this.is_sub)
			this.getList()
		},
		selectScreen(){
			
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
	.list {
		width: 690rpx;
		height: calc(100vh - 310rpx);
		margin: 0 auto;
		.item {
			width: 690rpx;
			margin: 30rpx 0;
			padding: 36rpx 32rpx;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			.title {
				display: flex;
				align-items: center;
				text {
					width: 600rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					line-height: 44rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image {
					width: 12rpx;
					height: 24rpx;
					margin-left: 22rpx;
				}
			}
			.address {
				margin: 12rpx 0 20rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}
			.info_box{
				display: flex;
				align-items: center;
				.title{
					width: 200rpx;
					height: 40rpx;
					margin-right: 28rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #999999;
					line-height: 40rpx;
				}
				.text{
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 40rpx;
				}
			}
			.info_box+.info_box{
				margin-top: 16rpx;
			}
		}
	}
	.add_image{
		position: absolute;
		right: 22rpx;
		bottom: 300rpx;
		width: 106rpx;
		height: 106rpx;
	}
}
</style>
