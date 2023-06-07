<template>
	<view class="container">
		<view class="input_wrap">
			<image src="../../static/search_input.png"></image>
			<input type="number" placeholder-class="phcolor" :value="keyword" @input="handleKeyword" @confirm="search" :placeholder="$t('input-the-order-num')" />
		</view>
		<view class="data_picker_box">
			<picker mode="date" fields="month" :value="month" @change="bindMonthChange">
				<view class="picker_wrap">
					<text>{{ month }}</text>
					<image src="../../static/more_b.png"></image>
				</view>
			</picker>
		</view>
		<scroll-view class="list" scroll-y="true">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="title_box">
					<view class="item_title">
						<text class="text">{{item.order_no}}</text>
					</view>
					<view class="copy" @click="copy(item.order_no)">{{$t('copy')}}</view>
				</view>
				<view class="line"></view>
				<view class="info_list">
					<view class="info_title">
						<text>{{$t('device-number')}}</text>
						<text>{{$t('percentage')}}</text>
						<text>{{$t('status')}}</text>
						<text>{{$t('amount')}}</text>
						<text>{{$t('dates')}}</text>
						<text>{{$t('time')}}</text>
					</view>
					<view class="info_num">
						<text>: {{item.device_code}}</text>
						<text>: {{item.ratio}}%</text>
						<text>: {{item.status_text}}</text>
						<text>: ฿{{item.amount}}</text>
						<text>: {{item.time}}</text>
						<text>: {{item.date}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import {brokerageLog} from '../../utils/user/user'
export default {
	data() {
		return {
			month: '12/2022',
			list:[],
			page: 1,
			page_size: 10,
			keyword: '',
		};
	},

	mounted() {
		this.getNowDate()
		this.getList()
	},
	methods: {
		getNowDate() {
		     const timeOne = new Date()
		     const year = timeOne.getFullYear()
		     let month = timeOne.getMonth() + 1
		     month = month < 10 ? '0' + month : month
		     const nowDate = `${month}/${year}`
		     return this.month = nowDate 
			 
		},
		bindMonthChange(e) {
			const year = e.detail.value.slice(0,4)
			const month = e.detail.value.slice(5,7)
			this.month = month+'/'+year
			this.getList()
		},
		async getList() {
				const res = await brokerageLog({
					page: this.page,
					page_size: this.page_size,
					order_no: this.keyword,
					month: this.month,
				})
				console.log(res)
				this.list = res.data.list
				this.list.forEach((item,index)=> {
					this.list[index].time = item.create_time.slice(0, 10)
					this.list[index].date = item.create_time.slice(11, 19)
				})
				console.log(this.list)
				
		},
		copy(e){
			uni.setClipboardData({
				data: e
			})
		},
		handleKeyword(e) {
			this.keyword = e.target.value
		},
		search() {
			this.getList()
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 30rpx;
	.input_wrap {
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 72rpx;
		padding: 0 30rpx;
		background: #f8f8f8;
		border-radius: 4rpx;
		box-sizing: border-box;
		image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 22rpx;
		}
		input {
			width: 580rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
		}
	}
	.data_picker_box {
		display: flex;
		align-items: center;
		margin: 24rpx 0 30rpx;
		.picker_wrap {
			display: flex;
			align-items: center;
			text {
				height: 42rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			image {
				width: 12rpx;
				height: 8rpx;
				margin: 0 16rpx;
			}
		}
	}
	.device_box {
		display: flex;
		align-items: center;
		height: 64rpx;
		.device {
			width: 156rpx;
			height: 64rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 26rpx;
			font-weight: 500;
			color: #cccccc;
			background: #ffffff;
			border-radius: 8rpx;
			border: 2rpx solid #cccccc;
			box-sizing: border-box;
		}
		.device + .device {
			margin-left: 22rpx;
		}
		.device_s {
			color: $global-color;
			background: #e7f2ff;
			border: 2rpx solid $global-color;
		}
	}
	.list {
		// 如果没有机柜类型 calc(100vh - 282rpx)
		height: calc(100vh - 310rpx);
		.item{
			width: 690rpx;
			margin: 30rpx auto;
			padding: 36rpx 32rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(61,130,255,0.2000);
			border-radius: 8rpx;
			box-sizing: border-box;
			.title_box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item_title{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text{
						height: 42rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: #333333;
						line-height: 42rpx;
					}
					.delete_text{
						height: 34rpx;
						margin-left: 16rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #F0513A;
						line-height: 34rpx;
					}
				}
				.copy{
					height: 38rpx;
					padding: 0 14rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: $global-color;
					text-align: center;
					line-height: 38rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(61,130,255,0.2000);
					border-radius: 19rpx;
					border: 2rpx solid $global-color;
				}
			}
			.line{
				width: 626rpx;
				height: 2rpx;
				margin: 28rpx auto 30rpx;
				background: #F5F5F5;
			}
			.info_list{
				display: flex;
				align-items: center;
				.info_title{
					display: flex;
					flex-direction: column;
					margin-right: 28rpx;
					text{
						height: 40rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #999999;
						line-height: 40rpx;
					}
					text+text{
						margin-top: 16rpx;
					}
				}
				.info_num{
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
			}
		}
	}
}
</style>
