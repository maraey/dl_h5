<template>
	<view class="content"> 
		<view class="container">
			<tab :tabList="tabList" @typeSelect="getType"></tab>
			<view class="input_wrap">
				<image src="../../static/search_input.png"></image>
				<input type="text" placeholder-class="phcolor" :value="keyword" @input="handleKeyword" @confirm="search" :placeholder="$t('please-input')" />
			</view>
			<view class="data_picker_box">
				<picker :value="timeIndex" :range="timeArray" @change="bindTimeChange">
					<view class="picker_wrap">
						<text>{{ timeArray[timeIndex] }}</text>
						<image src="../../static/more_b.png"></image>
					</view>
				</picker>
				<picker v-if="timeIndex == 0" mode="date" fields="day" :value="day" @change="bindDayChange">
					<view class="picker_wrap">
						<text>{{ day }}</text>
						<image src="../../static/more_b.png"></image>
					</view>
				</picker>
				<picker v-if="timeIndex == 1" mode="date" fields="month" :value="month" @change="bindMonthChange">
					<view class="picker_wrap">
						<text>{{ month }}</text>
						<image src="../../static/more_b.png"></image>
					</view>
				</picker>
				<picker v-if="timeIndex == 2" mode="date" fields="year" :value="year" @change="bindYearChange">
					<view class="picker_wrap">
						<text>{{ year }}</text>
						<image src="../../static/more_b.png"></image>
					</view>
				</picker>
			</view>
			<!-- <view class="device_box">
				<view class="device device_s">全部</view>
				<view class="device">充电宝</view>
				<view class="device">充电线</view>
			</view> -->
			<scroll-view class="list" scroll-y="true">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="title_box">
						<view class="item_title">
							<text class="text">{{ item.name }}</text>
						</view>
						<view class="copy" @click="copy(item.name)">{{ $t('copy') }}</view>
					</view>
					<view class="line"></view>
					<view class="info_list">
						<view class="info_title">
							<text>{{ $t('order-quantity') }}</text>
							<text>{{ $t('total-amount') }}</text>
							<text>{{ $t('total-refund') }}</text>
							<text>{{ $t('received-amount') }}</text>
						</view>
						<view class="info_num">
							<text>: {{ item.total_num }}</text>
							<text>: ฿{{ item.total_amount }}</text>
							<text>: ฿{{ item.total_refund }}</text>
							<text>: ฿{{ item.total_pay_amount }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<tabbar selected="statistics"></tabbar>
	</view>
	
</template>

<script>
import tabbar from '../../components/tabbar.vue';
import tab from '../../components/tab.vue';
import { statSeller, statBranch } from '../../utils/statistics/statistics';
export default {
	data() {
		return {
			// tab标题
			tabList: [
				{
					title: '门店',
					type: 1
				},
				{
					title: this.$t('staffs'),
					type: 2
				},
				{
					title: this.$t('agents'),
					type: 3
				}
			],
			timeArray: [this.$t('daily'), this.$t('monthly'), this.$t('annual')],
			timeIndex: 0,
			day: '07/22/2022' /*默认显示昨天*/,
			month: '07/2022',
			year: '2022',
			start: '',
			end: '',
			list: [],
			page: 1,
			page_size: 10,
			keyword: '',
			type: 1,
			userInfo: {}
		};
	},
	components: {
		tab,
		tabbar
	},
	onShow() {
		this.page=1
		this.getList();
		this.userInfo = getApp().globalData.userInfo;
		console.log(this.userInfo);
		// 获取当前时间
		const date = new Date()
		const year = date.getFullYear()
		const month = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):date.getMonth()+1
		const day = date.getDate()<10?('0'+date.getDate()):date.getDate()
		console.log(year,month,day);
		this.year = year
		this.month = `${month}/${year}`
		this.day = `${day}/${month}/${year}`
	},
	methods: {
		// '日度 月度 年度切换'
		bindTimeChange(e) {
			this.timeIndex = e.detail.value;
			console.log(this.timeIndex);
		},
		bindDayChange(e) {
			

			const year = e.detail.value.slice(0,4)
			const month = e.detail.value.slice(5,7)
			const days = e.detail.value.slice(8,10)
			console.log(year,month,days)
			this.start = days+'/'+month+'/'+year
			this.end = days+'/'+month+'/'+year
			this.day = days+'/'+month+'/'+year
			console.log(this.start, this.end);
			this.getList();
		},
		bindMonthChange(e) {
			const year = e.detail.value.slice(0,4)
			const month = e.detail.value.slice(5,7)
			this.start = '01'+'/'+month+'/'+year
			this.end = '31'+'/'+month+'/'+year
			this.month = month+'/'+year
			console.log(this.start, this.end);
			this.getList();
		},
		bindYearChange(e) {
			this.year = e.detail.value;
			this.start = this.year + '-01' + '-01';
			this.end = this.year + '-12' + '-31';
			console.log(this.start, this.end);
			this.getList();
		},
		async getList() {
			if (this.type == 1) {
				const res = await statSeller({
					page: this.page,
					page_size: this.page_size,
					keyword: this.keyword,
					start: this.start,
					end: this.end
				});
				console.log(res);
				this.list = res.data;
			} else if (this.type == 2) {
				const res = await statBranch({
					role: 'bd',
					keyword: this.keyword,
					start: this.start,
					end: this.end
				});
				this.list = res.data;
				console.log(this.list);
			} else {
				const res = await statBranch({
					role: 'agent',
					keyword: this.keyword,
					start: this.start,
					end: this.end
				});
				this.list = res.data;
				console.log(this.list);
			}
		},
		copy(e) {
			uni.setClipboardData({
				data: e
			});
		},
		getType(data) {
			this.type = data;
			this.getList();
		},
		handleKeyword(e) {
			this.keyword = e.target.value;
		},
		search() {
			this.getList();
		}
	}
};
</script>

<style lang="scss" scoped>
.content{
	width: 100vw;
	height: 100vh;
	overflow: scroll;
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
			height: calc(100vh - 500rpx);
			.item {
				width: 690rpx;
				height: 382rpx;
				margin: 30rpx auto;
				padding: 36rpx 32rpx;
				background: #ffffff;
				box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(61, 130, 255, 0.2);
				border-radius: 8rpx;
				box-sizing: border-box;
				.title_box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.item_title {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.text {
							width: 500rpx;
							height: 42rpx;
							font-size: 30rpx;
							font-weight: 500;
							color: #333333;
							line-height: 42rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.delete_text {
							height: 34rpx;
							margin-left: 16rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: #f0513a;
							line-height: 34rpx;
						}
					}
					.copy {
						height: 38rpx;
						padding: 0 14rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: $global-color;
						text-align: center;
						line-height: 38rpx;
						background: #ffffff;
						box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(61, 130, 255, 0.2);
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
				.info_list {
					display: flex;
					align-items: center;
					.info_title {
						display: flex;
						flex-direction: column;
						margin-right: 28rpx;
						text {
							height: 40rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: #999999;
							line-height: 40rpx;
						}
						text + text {
							margin-top: 16rpx;
						}
					}
					.info_num {
						display: flex;
						flex-direction: column;
						text {
							height: 40rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #999999;
							line-height: 40rpx;
						}
						text + text {
							margin-top: 16rpx;
						}
					}
				}
			}
		}
	}
}

</style>
