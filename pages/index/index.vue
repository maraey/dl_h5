<template>
	<scroll-view class="container" scroll-y="true">
		<view class="income_box" v-if="!isLogin">
			<view class="totay_income">{{ $t('income.today') }}</view>
			<view class="no_data_income">****</view>
		</view>
		<view class="tabbars" v-if="isLogin">
			<view class="tabbar_item" :class="[selected=='today'?'selected':'']" @click="tabbar('today')">
				<view class="title">今日</view>
				<view class="line"></view>
			</view>
			<view class="tabbar_item" :class="[selected=='yesterday'?'selected':'']" @click="tabbar('yesterday')" >
				<view class="title">昨日</view>
				<view class="line"></view>
			</view>
			<view class="tabbar_item" :class="[selected=='7day'?'selected':'']" @click="tabbar('7day')">
				<view class="title">近7日</view>
				<view class="line"></view>
			</view>
			<view class="tabbar_item" :class="[selected=='30day'?'selected':'']" @click="tabbar('30day')" >
				<view class="title">近30日</view>
				<view class="line"></view>
			</view>
			<view class="tabbar_item" :class="[selected=='custom'?'selected':'']" @click="tabbar('custom')" >
				<view class="title">自定义</view>
				<view class="line"></view>
			</view>
		</view>
		<view class="profit" >
			<view class="profit_title_title">
				<view class="profit_title_text">订单收益</view>
				<view class="profit_title_time">{{indexInfo.date}}</view>
			</view>
			<view class="profit_number_big">{{indexInfo.profit}}</view>
			<view class="profit_middle_wrap">
				<view class="warp">
					<text class="profit_title">全部订单</text>
					<text class="profit_number">{{indexInfo.order_num}}</text>
				</view>
				<view class="warp">
					<text class="profit_title">进行中订单</text>
					<text class="profit_number">{{indexInfo.active_num}}</text>
				</view>
				<view class="warp">
					<text class="profit_title">待付款订单</text>
					<text class="profit_number">{{indexInfo.wait_pay_num}}</text>
				</view>
				<view class="warp">
					<text class="profit_title">售宝订单</text>
					<text class="profit_number">{{indexInfo.sale_num}}</text>
				</view>
			</view>
			<view class="profit_line"></view>
			<view class="profit_bottom_wrap">
				<view class="profit_bottom_wrap_title">
					<view class="profit_wrap">
						<text class="profit_title">新增门店</text>
						<text class="profit_number_small">{{indexInfo.add_store}}</text>
					</view>
					<view class="profit_wrap">
						<text class="profit_title">已铺设门店</text>
						<text class="profit_number_small">{{indexInfo.store_num}}</text>
					</view>
					<view class="profit_wrap">
						<text class="profit_title">机柜数量</text>
						<text class="profit_number_small">{{indexInfo.powerbank_num}}</text>
					</view>
				</view>
				<view class="profit_bottom_wrap_title">
					<view class="profit_wrap">
						<text class="profit_title">已铺机柜</text>
						<text class="profit_number_small">{{indexInfo.store_powerbank_num}}</text>
					</view>
					<view class="profit_wrap_s">
						<text class="profit_title">库存机柜</text>
						<text class="profit_number_small">{{indexInfo.stock_powerbank_num}}</text>
					</view>
					<view class="profit_wrap">
						<text class="profit_title">在线机柜</text>
						<text class="profit_number_small">{{indexInfo.online_powerbank_num}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="lists" >
		    <view class="item" @click="agencyList('agency')" >
				<image class="images" src="../../static/agency@2x.png"></image>
				<text class="text">代理商</text>
		    </view>
		    <view class="item" @click="agencyList('introducer')">
				<image class="images" src="../../static/introducer@2x.png"></image>
				<text class="text">渠道商</text>
		    </view>
		    <view class="item" @click="goTo('sellerVip')">
				<image class="images" src="../../static/shopVip@2x.png"></image>
				<text class="text">门店VIP</text>
		    </view>
		    <view class="item" @click="agencyList('sellerAccount')">
				<image class="images" src="../../static/shopAccount@2x.png"></image>
				<text class="text">门店管理员</text>
		    </view>
		    <view class="item" @click="agencyList('business')">
				<image class="images" src="../../static/staff@2x.png"></image>
				<text class="text">员工管理</text>
		    </view>
		    <view class="item" @click="scanDevice">
				<image class="images" src="../../static/scan@2x.png"></image>
				<text class="text">扫码维护</text>
		    </view>
		    <view class="item" @click="goTo('dataBoard')">
				<image class="images" src="../../static/statistics@2x.png"></image>
				<text class="text">数据看板</text>
		    </view>
		    <view class="item" @click="agencyList('seller')">
				<image class="images" src="../../static/battery@2x.png"></image>
				<text class="text">订单收益</text>
		    </view>
		    <view class="item" @click="goTo('batteryDevice')">
				<image class="images" src="../../static/device@2x.png"></image>
				<text class="text">充电宝设备</text>
		    </view>
		</view>
		<tabbar selected="index" v-if="isLogin"></tabbar>
		<datePicker v-if="showDatePicker"></datePicker>
	</scroll-view>
	
</template>

<script>
import datePicker from '../../components/datePicker.vue';
import tabbar from '../../components/tabbar.vue';
import { index } from '../../utils/index/index.js';
export default {
	data() {
		return {
			isLogin: true,
			indexInfo: {},
			userInfo: {},
			lang: 'en-us',
			selected: 'today',
			showDatePicker: false
		};
	},
	onShow() {
		this.getData();
		try {
			const value = uni.getStorageSync('dl_app_info');
			if (value) {
				const role = JSON.parse(value).role;
				getApp().globalData.userInfo = JSON.parse(value);
				this.userInfo = JSON.parse(value);
				console.log(role);
				if (role == 'seller') {
					uni.setTabBarItem({
						index: 2,
						visible: false
					});
				} else {
					uni.setTabBarItem({
						index: 2,
						visible: true
					});
				}
			}
		} catch (e) {
			// error
		}
	},
	components: {
		tabbar,
		datePicker
	},

	methods: {
		async getData() {
			if (uni.getLocale() == 'zh-Hans') {
				this.lang = 'zh-cn';
			} else {
				this.lang = 'en-us';
			}
			const res = await index({
				time: this.selected
			});
			console.log(res);
			this.indexInfo = res.data;
		},
		orderBenefit() {
			uni.navigateTo({
				url: '../orderIncome/orderIncome'
			});
		},
		applyWithdrawal() {
			uni.navigateTo({
				url: '../applyWithdrawal/applyWithdrawal'
			});
		},
		addAgency() {
			uni.navigateTo({
				url: '/pages/addAgency/addAgency'
			});
		},
		addEmployee() {
			uni.navigateTo({
				url: '/pages/addEmployee/addEmployee'
			});
		},
		addSellerManager() {
			uni.navigateTo({
				url: '/pages/addSellerManager/addSellerManager'
			});
		},
		toBatteryDevice() {
			uni.navigateTo({
				url: '/pages/batteryDevice/batteryDevice'
			});
		},
		addSellerVip() {
			uni.navigateTo({
				url: '/pages/addSellerVip/addSellerVip'
			});
		},
		addSeller() {
			uni.navigateTo({
				url: '/pages/addSeller/addSeller'
			});
		},
		tabbar(e) {
			this.selected = e
			if (this.selected == 'custom') {
				this.showDatePicker = true
			} else {
				this.getData()
			}
		},
		goTo(e) {
		    uni.navigateTo({
		      url: `/pages/${e}/${e}`
		    })
		},
		agencyList(e){
			uni.navigateTo({
				url: `/pages/${e}/${e}`
			})
		}
	}
};
</script>

<style scoped>
.container {
	width: 100vw;
	height: 100vh;
	padding: 30rpx 0;
	box-sizing: border-box;
}
.container .income_box {
	width: 690rpx;
	height: 364rpx;
	padding: 32rpx;
	margin: 0 auto;
	background: linear-gradient(135deg, #3D82FF 0%, #6eb7ff 100%);
	border-radius: 8rpx;
	box-sizing: border-box;
}
.container .income_box .totay_income {
	height: 40rpx;
	font-size: 28rpx;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.5);
	line-height: 40rpx;
}
.container .income_box .no_data_income {
	height: 78rpx;
	margin-top: 12rpx;
	font-size: 64rpx;
	font-weight: 500;
	color: #ffffff;
	line-height: 78rpx;
}
.container .image_box {
	display: flex;
	justify-content: space-between;
	width: 714rpx;
	margin: 22rpx auto 24rpx;
}
.container .image_box .income_image {
	width: 356rpx;
	height: 152rpx;
	background-image: url('/static/income.png');
	background-size: 356rpx 152rpx;
	background-repeat: no-repeat;
}
.container .image_box .withdraw_image {
	width: 356rpx;
	height: 152rpx;
	background-image: url('/static/withdraw.png');
	background-size: 356rpx 152rpx;
	background-repeat: no-repeat;
}
.container .image_box .income_text {
	width: 140rpx;
	height: 36rpx;
	margin: 28rpx 0 0 36rpx;
	font-size: 26rpx;
	font-weight: 500;
	color: #333333;
	line-height: 36rpx;
}
.container .income_box .yesterday_box {
	margin-top: 16rpx;
}
.container .income_box .yesterday_box .amount {
	height: 36rpx;
	margin-left: 16rpx;
	font-size: 30rpx;
	font-weight: 500;
	color: #ffffff;
	line-height: 36rpx;
}
.container .income_box .line {
	width: 626rpx;
	height: 2rpx;
	margin: 24rpx auto 16rpx;
	background: rgba(255, 255, 255, 0.2);
}
.container .income_box .incomes_list {
	display: flex;
	justify-content: space-between;
	width: 626rpx;
}
.container .income_box .incomes_list .incomes_item {
	display: flex;
	flex-direction: column;
}
.container .income_box .incomes_list .incomes_item .amount {
	height: 40rpx;
	margin-top: 4rpx;
	font-size: 28rpx;
	font-weight: 500;
	color: #ffffff;
	line-height: 34rpx;
}
.container .list {
	display: flex;
	/* justify-content: space-between; */
	flex-wrap: wrap;
	width: 690rpx;
	margin: 24rpx auto 0;
}
.container .list .item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin-bottom: 40rpx;
}
.container .list .item image {
	width: 56rpx;
	height: 56rpx;
}
.container .list .item .item_text {
	height: 36rpx;
	margin-top: 16rpx;
	font-size: 26rpx;
	font-weight: 400;
	color: #333333;
	line-height: 36rpx;
}
.container .tabbars {
  display: flex;
  width: 690rpx;
  padding: 0rpx 30rpx;
  margin-bottom: 30rpx;
}
.container .tabbars .tabbar_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container .tabbars .tabbar_item+.tabbar_item {
  margin-left: 40rpx;
}

.container .tabbars .tabbar_item .title {
  height: 40rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  line-height: 40rpx;
}

.container .tabbars .tabbar_item .line {
  width: 48rpx;
  height: 8rpx;
  margin-top: 10rpx;
}

.container .tabbars .selected .title {
  height: 44rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #3D82FF;
  line-height: 44rpx;
}

.container .tabbars .selected .line {
  width: 48rpx;
  height: 8rpx;
  margin-top: 8rpx;
  background: #3D82FF;
  border-radius: 4rpx;
}
.container .profit{
  display: flex;
  flex-direction: column;
  width: 690rpx;
  margin: 0 auto;
  padding: 32rpx 32rpx 26rpx 32rpx;
  background: linear-gradient(135deg, #3D82FF 0%, #6EB7FF 100%);
  border-radius: 8rpx;
  box-sizing: border-box;
}
.container .profit .profit_title{
  font-size: 28rpx;
  font-weight: 500;
  color: rgba(255, 255, 255, .5);
  line-height: 40rpx;
}
.container .profit .profit_number_big{
  margin: 12rpx 0 16rpx 0;
  font-size: 64rpx;
  font-weight: 500;
  color: #ffffff;
  line-height: 78rpx;
}
.container .profit .profit_middle_wrap{
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}
.container .profit .profit_middle_wrap .warp{
  display: flex;
  width: 300rpx;

}
.container .profit .profit_middle_wrap .profit_title{
  margin-right: 16rpx;
}
.container .profit .profit_number{
  font-size: 30rpx;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 36rpx;
}
.container .profit .profit_number_small{
  font-size: 30rpx;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 36rpx;
}
.container .profit .profit_line{
  width: 626rpx;
  margin: 24rpx 0 16rpx 0 ;
  border-top: 1rpx solid rgba(255, 255, 255, .2);
}
.container .profit .profit_bottom_wrap{
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}
.container .profit .profit_bottom_wrap .profit_bottom_wrap_title{
  display: flex;
  width: 690rpx;
  justify-content: space-between;
}
.container .profit .profit_bottom_wrap .profit_bottom_wrap_title .profit_wrap{
  display: flex;
  flex-direction: column;
}
.container .profit .profit_bottom_wrap .profit_bottom_wrap_title .profit_wrap_s{
  display: flex;
  flex-direction: column;
  margin-left: -30rpx;
}
.container .profit .profit_bottom_wrap .profit_bottom_wrap_title .profit_wrap .profit_title{
  margin-bottom: 4rpx;
}
.container .profit .profit_title_title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.container .profit .profit_title_title .profit_title_text {
  font-size: 28rpx;
  font-weight: 500;
  color: rgba(255, 255, 255, .5);
  line-height: 40rpx;
}

.container .profit .profit_title_title .profit_title_time {
  height: 32rpx;
  font-size: 22rpx;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 32rpx;
}
.container .lists{
  display: flex;
  flex-wrap: wrap;
  width: 690rpx;
  margin: 40rpx auto;
}
.container .lists .item{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-bottom: 40rpx;
}
.container .lists .item .image{
  width: 56rpx;
  height: 56rpx;
  margin-bottom: 16rpx;
}
.container .lists .item .images{
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 16rpx;
}
.container .lists .item .text{
  font-size: 26rpx;
  font-weight: 400;
  color: #333333;
  line-height: 36rpx;
}
</style>
