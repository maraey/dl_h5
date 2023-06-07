<template>
	<view class="container">
		<topTabbar :popupSeller="popupSeller" :popupStatus="popupStatus" :status="status" @click="selectScreen" @statusSelect='statusEvent' @orderData='dataEvent' @sellerDataSelect="getData" @orderSelect="getOrderNo"></topTabbar>
		<view class="time_num">
			<text>{{$t('now-time')}}：{{start_time}}</text>
			<text>{{$t('total')}}：{{total}}</text>
		</view>
		<scroll-view class="list" scroll-y="true">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="title_box">
					<text class="title_text">{{$t('order-num')}}:{{item.order_no}}</text>
					<text class="copy">{{$t('copy')}}</text>
				</view>
				<view class="line"></view>
				<view class="info_box_more" @click="toDetail(item.order_no)">
					<view class="info_box">
						<!-- <view class="info_title">
							<text>订单时长</text>
							<text>租借时间</text>
							<text>租借商户</text>
							<text>用户类型</text>
						</view>
						<view class="info_num">
							<text>1小时30分钟23秒</text>
							<text>2021-11-18 10:47:27</text>
							<text>秀英省医急诊</text>
							<text>微信小程序</text>
						</view> -->
						<view class="info_title"><text>{{ $t('order-duration') }}:</text></view>
						<view class="info_num"><text>{{item.use_time}}</text></view>
						<view class="info_title"><text>{{$t('rental-time')}}:</text></view>
						<view class="info_num"><text>{{item.start_time}}</text></view>
						<view class="info_title"><text>{{$t('rental-store')}}:</text></view>
						<view class="info_num"><text>{{item.seller}}</text></view>
						<!-- <view class="info_title"><text>用户类型</text></view>
						<view class="info_num"><text>微信小程序</text></view> -->
					</view>
					<image src="/static/more_detail.png"></image>
				</view>
				<view class="operate" v-if="item.can_end ==1"><view class="btn" @click="endOrder(item.order_no)">{{$t('end-order')}}</view></view>
			</view>
		</scroll-view>
		<tabbar selected="order"></tabbar>
	</view>
</template>

<script>
import tabbar from '../../components/tabbar.vue'
import topTabbar from '../../components/topTabbar.vue';
import {orderList} from '../../utils/order/order'
export default {
	data() {
		return {
			title: [
				{
					title: this.$t('status')
				},
				{
					title: this.$t('type')
				},
				{
					title: this.$t('my-data')
				},
				{
					title: this.$t('filter')
				}
			],
			popupStatus: true,
			status: false,
			popupSeller: false,
			list: [{}, {}, {}, {}, {}],
			page: 1,
			page_size: 10,
			is_sub: false,
			keyword: '',
			order_status: 'active',
			start_time: '05/2023',
			end_time: '',
			type: 1,
			seller: '',
			menber_id: '',
			total: '',
			order_no: '',
		};
	},
	components: {
		topTabbar,	
		tabbar
	},
	onShow() {
		this.getList()
		this.getNowDate()

	},
	methods: {
		getNowDate() {
		     const timeOne = new Date()
		     const year = timeOne.getFullYear()
		     let month = timeOne.getMonth() + 1
		     let day = timeOne.getDate()
		     month = month < 10 ? '0' + month : month
		     day = day < 10 ? '0' + day : day
		     const nowDate = `${month}/${year}`
		     return this.start_time = nowDate ,this.end_time = nowDate
			 console.log(this.start_time,this.end_time)
			 
		},
		endOrder(e) {
			this.order_no = e
			uni.navigateTo({
				url: `/pages/endOrder/endOrder?order_id=${this.order_no}`
			});
		},
		toDetail(e){
			this.order_no = e
			console.log(this.order_no)
			uni.navigateTo({
				url:`/pages/orderDetail/orderDetail?order_id=${this.order_no}`
			})
		},
		selectScreen(){
			this.showPopup = true
		},
		statusEvent(data) {
			console.log(data)
		},
		dataEvent(data) {
			this.order_status = data
			this.getList()
			console.log(this.order_status)
		},
		async getList() {
			const res = await orderList({
				page: this.page,
				page_size: this.page_size,
				is_sub: String(this.is_sub),
				keyword: this.keyword,
				status: this.order_status,
				month: this.start_time,
				type: this.type,
				seller: this.seller,
				member_id: this.menber_id
			})
			this.list = res.data.list
			this.total = res.data.total
		},
		getData(data) {
			if(data == 'my') {
				this.is_sub = false
			} else {
				this.is_sub = true
			}
			console.log(this.is_sub)
			this.getList()
		},
		getOrderNo(order_no,menber_id,seller_name,start,end) {
			this.keyword = order_no
			this.menber_id = menber_id
			this.seller = seller_name
			this.start_time = start
			this.end_time = end
			console.log(this.keyword,this.menber_id,this.seller,this.start_time,this.end_time)
			this.getList()
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
	.time_num {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		height: 80rpx;
		margin-top: 2rpx;
		padding: 0 30rpx;
		background: #ffffff;
		box-sizing: border-box;
		text {
			height: 32rpx;
			font-size: 22rpx;
			font-weight: 400;
			color: #999999;
			line-height: 32rpx;
		}
	}
	.list {
		width: 690rpx;
		height: calc(100vh - 330rpx);
		margin: 30rpx auto 0;
		.item {
			width: 690rpx;
			padding: 36rpx 32rpx;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			.title_box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title_text {
					height: 42rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					line-height: 42rpx;
				}
				.copy {
					width: 76rpx;
					height: 38rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: $global-color;
					text-align: center;
					line-height: 38rpx;
					background: #ffffff;
					border-radius: 19rpx;
					border: 2rpx solid $global-color;
				}
			}
			.line {
				width: 626rpx;
				height: 2rpx;
				margin: 28rpx auto 30rpx;
				background: #f5f5f5;
			}
			.info_box_more {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 626rpx;
				.info_box {
					.info_title,
					.info_num {
						text {
							height: 40rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: #999999;
							line-height: 40rpx;
						}
					}
					.info_num {
						margin: 10rpx 0 10rpx 28rpx;
						text {
							font-weight: 400;
						}
					}
				}
				image {
					width: 12rpx;
					height: 16rpx;
				}
			}
			.operate {
				display: flex;
				justify-content: flex-end;
				margin-top: 16rpx;
				.btn {
					height: 46rpx;
					padding: 0 16rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #f0513a;
					text-align: center;
					line-height: 46rpx;
					background: #ffffff;
					border-radius: 23rpx;
					border: 2rpx solid #f0513a;
				}
			}
		}
		.item + .item {
			margin: 30rpx 0;
		}
	}
}
</style>
