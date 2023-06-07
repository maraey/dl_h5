<template>
	<view class="container1" >
		<!-- 充电宝设备顶部tabbar栏 -->
		<view class="wrap"  v-if="status">
			<view class="screen_bar" >
				<view class="screen_title_wrap" @click="selectScreen('online')">
					<text class="screen_title" :class="[selectType== 'online'?'screen_title_select':'']">{{select}}</text>
					<view :class="[selectType == 'online'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
				<view class="screen_title_wrap select" @click="selectScreen('my')" v-if="userInfo.role != 'seller'">
					<text class="screen_title" :class="[selectType== 'my'?'screen_title_select':'']">{{confirmData=='my'?$t('my-data'):$t('sub-data')}}</text>
					<view :class="[selectType == 'my'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
				<view class="screen_title_wrap" @click="selectScreen('screen')">
					<text class="screen_title" :class="[selectType== 'screen'?'screen_title_select':'']">{{$t('filter')}}</text>
					<view :class="[selectType == 'screen'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
			</view>
		</view>
		
		<!-- 订单详情顶部tabbar栏 -->
		<view class="wrap" v-if="popupStatus">
			<view class="screen_bar" >
				<view class="screen_title_wrap" @click="selectOrderScreen('status')">
					<text class="screen_title" :class="[selectType== 'status'?'screen_title_select':'']">{{orderSelect}}</text>
					<view :class="[selectType == 'status'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
				<view class="screen_title_wrap" @click="selectOrderScreen('my')" v-if="userInfo.role != 'seller'">
					<text class="screen_title" :class="[selectType== 'my'?'screen_title_select':'']">{{confirmData=='my'?$t('my-data'):$t('sub-data')}}</text>
					<view :class="[selectType == 'all'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
				<view class="screen_title_wrap" @click="selectOrderScreen('orderscreen')">
					<text class="screen_title" :class="[selectType== 'orderscreen'?'screen_title_select':'']">{{$t('filter')}}</text>
					<view :class="[selectType == 'orderscreen'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
			</view>
		</view>
		
		<!-- 商户详情顶部tabbar栏 -->
		<view class="wrap" v-if="popupSeller">
			<view class="screen_bar" >
				<view class="screen_title_wrap" @click="selectSellerScreen('my')" v-if="userInfo.role != 'seller'">
					<text class="screen_title" :class="[selectType== 'my'?'screen_title_select':'']">{{confirmData=='my'?$t('my-data'):$t('sub-data')}}</text>
					<view :class="[selectType == 'all'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
				<view class="screen_title_wrap select" @click="selectSellerScreen('sellerscreen')">
					<text class="screen_title" :class="[selectType== 'sellerscreen'?'screen_title_select':'']">{{$t('filter')}}</text>
					<view :class="[selectType == 'sellerscreen'?'screen_triangle_select':'screen_triangle']"></view>
				</view>
			</view>
		</view>
  
		<view class="popup_box" v-if="deviceTitle">
			<view class="popup_wrap">
				<!-- 充电宝设备顶部tabbar栏 -->
				<template v-if="selectType =='online'">
					<view class="popup_box_title">{{$t('state-selection')}}</view>
					<view class="popup_box_options">
						<view class="popup_box_option" :class="[screenStatus=='online'?'popup_box_option_select':'']"  @click.stop="selectScreenStatus('online')">{{$t('online')}}</view>
						<view class="popup_box_option" :class="[screenStatus=='offline'?'popup_box_option_select':'']"  @click.stop="selectScreenStatus('offline')">{{$t('offline')}}</view>
						<view class="popup_box_option" :class="[screenStatus=='bind'?'popup_box_option_select':'']" @click.stop="selectScreenStatus('bind')">{{$t('binding')}}</view>
						<view class="popup_box_option" :class="[screenStatus=='unbind'?'popup_box_option_select':'']"  @click.stop="selectScreenStatus('unbind')">{{$t('unbound')}}</view>
						<view class="popup_box_option" :class="[screenStatus=='fail'?'popup_box_option_select':'']"  @click.stop="selectScreenStatus('fail')">{{$t('fault')}}</view>
<!-- 						<view class="popup_box_option" :class="[screenStatus=='empty'?'popup_box_option_select':'']"  @click.stop="selectScreenStatus('empty')">空仓</view>
						<view class="popup_box_option" :class="[screenStatus=='full'?'popup_box_option_select':'']"  @click.stop="selectScreenStatus('full')">满仓</view> -->
					</view>
				</template>
				<template v-if="selectType == 'my'">
					<view class="popup_title">{{$t('data-selection')}}</view>
					<view class="selected_list">
						<view class="selected_item" :class="[deviceData=='my'?'option_select':'']" @click.stop="selectDeviceData('my')">{{$t('my-data')}}</view>
						<view class="selected_item" :class="[deviceData=='sub'?'option_select':'']" @click.stop="selectDeviceData('sub')">{{$t('sub-data')}}</view>
					</view>
				</template>
				<template v-if="selectType =='screen'">
					<view class="popup_title">{{$t('device-id')}}</view>
					<view class="input_wrap">
						<input type="text" placeholder-class="phcolor" :value="device_id" @input="handleDevice" :placeholder="$t('please-device-id')"/>
					</view>
					<view class="popup_title">{{$t('affiliated-store')}}</view>
					<view class="input_wrap">
						<input type="text" placeholder-class="phcolor" :value="seller_name" @input="handleSeller" :placeholder="$t('input-shop-name')" />
					</view>
<!-- 					<view class="popup_title">代理名称</view>
					<view class="input_wrap">
						<input type="text" placeholder-class="phcolor" placeholder="请输入业务员名称" />
					</view>
					<view class="popup_title">离线天数</view>
					<view class="selected_list">
						<view class="selected_item" :class="[screenData=='3'?'option_select':'']" @click.stop="selectScreenData('3')">3天</view>
						<view class="selected_item" :class="[screenData=='7'?'option_select':'']" @click.stop="selectScreenData('7')">7天</view>
						<view class="selected_item" :class="[screenData=='15'?'option_select':'']" @click.stop="selectScreenData('15')">15天</view>
					</view> -->
				</template>
				<!-- 订单详情顶部tabbar栏 -->
				<template v-if="selectType == 'status'">
					<view class="popup_title">{{$t('state-selection')}}</view>
					<view class="selected_list">
						<!-- <view class="selected_item" :class="[screenStatus=='all'?'option_select':'']" @click.stop="selectScreenStatus('all')">全部</view> -->
						<view class="selected_item" :class="[dataStatus=='active'?'option_select':'']" @click.stop="selectStatus('active')">{{$t('on-the-order')}}</view>
						<view class="selected_item" :class="[dataStatus=='end'?'option_select':'']" @click.stop="selectStatus('end')">{{$t('return-the-order')}}</view>
						<view class="selected_item" :class="[dataStatus=='cancel'?'option_select':'']" @click.stop="selectStatus('cancel')">{{$t('cancel-the-order')}}</view>
						<view class="selected_item" :class="[dataStatus=='over'?'option_select':'']" @click.stop="selectStatus('over')">{{$t('timeout-orders')}}</view>
						<!-- <view class="selected_item" :class="[screenStatus=='unpaid'?'option_select':'']" @click.stop="selectScreenStatus('unpaid')">待付订单</view> -->
					</view>
				</template>
				<template v-if="selectType == 'all'">
					<view class="popup_title">{{$t('data-selection')}}</view>
					<view class="selected_list">
						<!-- <view class="selected_item" :class="[screenData=='all'?'option_select':'']" @click.stop="selectScreenData('all')">全部</view> -->
						<view class="selected_item" :class="[screenData=='my'?'option_select':'']" @click.stop="selectScreenData('my')">{{$t('my-data')}}</view>
						<view class="selected_item" :class="[screenData=='sub'?'option_select':'']" @click.stop="selectScreenData('sub')">{{$t('sub-data')}}</view>
					</view>
				</template>
				<template v-if="selectType =='orderscreen'">
					<view class="popup_title">{{$t('order-num')}}</view>
					<view class="input_wrap">
						<input type="text" placeholder-class="phcolor" :value="order_no" @input="handleOrder" :placeholder="$t('input-the-order-num')"/>
					</view>
					<view class="popup_title">{{$t('member-id')}}</view>
					<view class="input_wrap">
						<input type="text" placeholder-class="phcolor" :value="member_id" @input="handleMenber" :placeholder="$t('please-enter-your-membership-number')"  />
					</view>
					<view class="popup_title">{{$t('rental-store')}}</view>
					<view class="input_wrap">
						<input type="text" placeholder-class="phcolor" :value="seller_name" @input="handleManger" :placeholder="$t('please-rental-store')" />
					</view>
					<view class="popup_title">{{$t('rental-time')}}</view>
					<view class="data_picker_box">
						<view class="data_picker_wrap">
							<image src="../static/data_picker.png"></image>
							<picker mode="date" fields="month" :value="start" @change="bindstart">
								<view class="placeholder" v-if="!start">{{$t('time')}}</view>
								<view class="picker_date" v-if="start">{{ start }}</view>
							</picker>
						</view>
					</view>
<!-- 					<view class="popup_title">更多数据</view>
					<view class="selected_list">
						<view class="selected_item" :class="[screenData=='refund'?'option_select':'']" @click.stop="selectScreenData('refund')">退款订单</view>
					</view> -->
				</template>
				<!-- 商户详情顶部tabbar栏 -->
				<template v-if="selectType =='sellerscreen'">
					<view class="popup_title">{{$t('seller-name')}}</view>
					<view class="input_wrap">
						<input type="text" placeholder-class="phcolor" :placeholder="$t('please-input-the-seller-name')"  :value="device_id" @input="handleDevice"/>
					</view>
<!-- 					<view class="popup_title">创建时间</view>
					<view class="data_picker_box">
						<view class="data_picker_wrap">
							<image src="../static/data_picker.png"></image>
							<picker mode="date" fields="day" :value="start" @change="bindstart">
								<view class="placeholder" v-if="!start">请选择起始时间</view>
								<view class="picker_date" v-if="start">{{ start }}</view>
							</picker>
						</view>
						<view class="data_picker_wrap">
							<image src="../static/data_picker.png"></image>
							<picker mode="date" fields="day" :value="end" @change="bindend">
								<view class="placeholder" v-if="!end">请选择结束时间</view>
								<view class="picker_date" v-if="end">{{ end }}</view>
							</picker>
						</view>
					</view> -->
				</template>
				<view class="popup_line"></view>
				<view class="btns">
					<view class="reset" @click="reset">{{$t('reset')}}</view>
					<view class="confirm" @click="confirm">{{$t('confirm')}}</view>
				</view>
			</view>
			<view class="clonePopup" @click="cancle">
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			deviceTitle: false,
			isShow: false,
			start: '05/2023',
			end: '',
			screenType:'',
			selectType: 'my',
			screenStatus: 'online',
			dataStatus: 'active',
			screenData:'my',
			device_id:'',
			confirmData: 'my',
			confirmStatus: 'online',
			confirmOrder: 'active',
			deviceData: 'my',
			seller_name: '',
			select: this.$t('online'),
			statusPopup: false,
			dataPopup: false,
			screenPopup: false,
			orderPopup: false,
			orderScreenPopup: false,
			orderSelect: this.$t('on-the-order'),
			order_no: '',
			member_id: '',
			userInfo: {},
			start_time:'05/2023'
		};
	},
	props: {
		title: {
			type: [Object, Array],
			default: () => {
				return [];
			}
		},
		status: {
			type: [Object, Boolean],
			default: () => {
				return [];
			}
		},
		popupStatus: {
			type: [Object, Boolean],
			default: () => {
				return [];
			}
		},
		popupSeller: {
			type: [Object, Boolean],
			default: () => {
				return [];
			}
		},
	},
	onShow() {
		this.userInfo=getApp().globalData.userInfo
		this.getNowDate()
	},
	computed: {
		// typeSelect() {
		// 	return switch(this.screenStatus) {
		// 		case 'online':
		// 			this.select = this.screenStatus
		// 		break;
		// 		case 'offline':
		// 			this.select = this.screenStatus
		// 		break;
		// 	}
		// }
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
		     return this.start_time = nowDate 
			 console.log(this.start_time,this.end_time)
			 
		},
		bindstart(e) {
			const year = e.detail.value.slice(0,4)
			const month = e.detail.value.slice(5,7)
			this.start =month+'/'+year
			console.log(year,month)
			console.log(this.start)
		},
		bindend(e) {
			this.end = e.detail.value;
		},
		selectScreen(e){
			this.deviceTitle =true
			this.selectType = e
			console.log(this.selectType)
			if(this.selectType == 'online') {
				this.statusPopup = true
			} else if(this.selectType == 'my') {
				this.dataPopup = true
			} else if(this.selectType == 'screen'){
				this.screenPopup = true
			}
		},
		selectOrderScreen(e){
			this.deviceTitle =true
			this.statusPopup = true
			this.orderPopup = true
			this.selectType = e
			console.log(this.selectType)
			if(this.selectType == 'my') {
				this.dataPopup = true
				this.orderPopup = true
				this.statusPopup = false
			} else if(this.selectType  =='orderscreen') {
				this.statusPopup = false
				this.orderScreenPopup = true
				console.log(this.orderScreenPopup)
			}
		},
		selectSellerScreen(e){
			this.deviceTitle =true
			this.screenPopup =true
			this.selectType = e
			console.log(this.selectType)
		},
		selectScreenStatus(e){
			this.screenStatus = e
			console.log(this.screenStatus)
			// this.$emit('statusSelect',this.screenStatus)
			
		},
		selectStatus(e) {
			this.dataStatus = e
			console.log(this.dataStatus)
		},
		cancle() {
			this.deviceTitle = false
			this.device_id = ''
			this.screenData = this.confirmData
			this.deviceData = this.confirmData
			this.screenStatus = this.confirmStatus
			this.dataStatus = this.confirmOrder
			console.log(11111)
		},
		selectScreenData(e){
			this.screenData = e
			console.log(this.screenData)
			this.$emit('dataSelect',this.screenData)
		},
		selectDeviceData(e){
			this.deviceData = e
			this.statusPopup = false
			this.dataPopup = true
			console.log(this.deviceData)
		},
		reset() {
			console.log(111111)
			this.screenData = 'my'
			this.deviceData = 'my'
			this.device_id = ''
			this.seller_name = ''
			this.screenStatus = 'online'
			this.dataStatus = 'active'
			this.order_no = ''
			this.member_id = ''
			this.start = this.start_time
			this.end = ''
			console.log(this.screenData)
		},
		confirm() {
			this.deviceTitle = false
			this.confirmData = this.screenData
			this.confirmData = this.deviceData
			this.confirmStatus = this.screenStatus
			this.confirmOrder = this.dataStatus
			if(this.statusPopup) {
				this.$emit('statusData',this.confirmStatus)
				this.$emit('orderData',this.confirmOrder)
				console.log('11111')
			} else if (this.dataPopup) {
				this.$emit('sellerDataSelect',this.confirmData)
				console.log('22222')
			} else if (this.screenPopup){
				this.$emit('deviceSelect',this.device_id)
				this.$emit('sellerSelect',this.seller_name)
				console.log('33333')
			} else if(this.orderScreenPopup){
				this.$emit('orderSelect',this.order_no,this.member_id,this.seller_name,this.start,this.end)
				console.log('44444')
			}
			

			//多次请求bug
			switch(this.screenStatus) {
				case 'online':
					this.select = this.$t('online')
				break;
				case 'offline':
					this.select = this.$t('offline')
				break;
				case 'bind':
					this.select = this.$t('binding')
				break;
				case 'unbind':
					this.select = this.$t('unbound')
				break;
				case 'fail':
					this.select = this.$t('fault')
				break;
			}
			switch(this.dataStatus) {
				case 'active':
					this.orderSelect = this.$t('on-the-order')
				break;
				case 'end':
					this.orderSelect = this.$t('return-the-order')
				break;
				case 'cancel':
					this.orderSelect = this.$t('cancel-the-order')
				break;
				case 'over':
					this.orderSelect = this.$t('timeout-orders')
				break;
			}
		},
		handleDevice(e){
			console.log(e.detail.value)
			this.device_id = e.detail.value
		},
		handleSeller(e){
			this.seller_name = e.detail.value
		},
		handleOrder(e){
			this.order_no = e.detail.value
		},
		handleMenber(e){
			this.member_id = e.detail.value
		},
		handleManger(e){
			this.seller_name = e.detail.value
		},
	}
};
</script>

<style lang="scss" scoped>
.container1 {
	z-index: 3;
	.tabbar {
		display: flex;
		justify-content: space-around;
		width: 100vw;
		height: 88rpx;
		background: #ffffff;
		z-index: 3;
		.item {
			display: flex;
			align-items: center;
			.text {
				height: 36rpx;
				margin-right: 12rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #999999;
				line-height: 36rpx;
			}
			image {
				width: 20rpx;
				height: 20rpx;
			}
		}
	}
	.popup_box {
		position: fixed;
		display: flex;
		flex-direction: column;
		top: 90rpx;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 3;
		.popup_wrap {
			width: 100vw;
			padding: 24rpx 30rpx;
			background: #ffffff;
			box-sizing: border-box;
			.popup_title {
				height: 42rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			.selected_list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 8rpx;
				.selected_item {
					width: 160rpx;
					height: 62rpx;
					margin-top: 22rpx;
					margin-right: 16rpx;
					text-align: center;
					line-height: 62rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					background: #f8f8f8;
					border-radius: 4rpx;
					overflow: hidden;
				}
				.option_select{
					color: #3D82FF;
					background: rgba(61, 130, 255, .1);
				}
				// .selected_item + .selected_item {
				// 	margin-left: 16rpx;
				// }
			}
			.popup_line {
				width: calc(100vw-60rpx);
				height: 2rpx;
				margin: 24rpx auto;
				background: #f5f5f5;
				box-sizing: border-box;
				// width: 690rpx;
				// height: 2rpx;
				// margin: 24rpx auto;
				// background: #f5f5f5;
			}
			.btns {
				display: flex;
				justify-content: space-between;
				.reset {
					width: 160rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					background: #ffffff;
					border-radius: 4rpx;
					opacity: 0.3;
					border: 2rpx solid #999999;
					box-sizing: border-box;
				}
				.confirm {
					width: 506rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 26rpx;
					font-weight: 500;
					color: #ffffff;
					background: #3D82FF;
					border-radius: 4rpx;
				}
			}
			.input_wrap {
				display: flex;
				align-items: center;
				width: 690rpx;
				height: 74rpx;
				padding: 0 20rpx;
				margin: 16rpx auto 24rpx;
				background: #f8f8f8;
				border-radius: 4rpx;
				box-sizing: border-box;
				input {
					width: 650rpx;
				}
				image{
					width: 38rpx;
					height: 38rpx;
				}
			}
			.data_picker_box {
				width: 690rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 16rpx;
				margin-bottom: 24rpx;
				.data_picker_wrap {
					display: flex;
					align-items: center;
					width: 332rpx;
					height: 74rpx;
					padding: 0 24rpx;
					background: #f8f8f8;
					border-radius: 4rpx;
					box-sizing: border-box;
					image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 24rpx;
					}
					.placeholder {
						width: 226rpx;
						height: 34rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #aaaaaa;
						line-height: 34rpx;
					}
					.picker_date {
						width: 226rpx;
						height: 34rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #333333;
						line-height: 34rpx;
					}
				}
			}
			.popup_box_title{
				margin-bottom: 8rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			.popup_box_options{
				display: flex;
				flex-wrap: wrap;
				.popup_box_option{
					margin-right: 16rpx;
					margin-top: 22rpx;
					width: 160rpx;
					height: 62rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					line-height: 62rpx;
					text-align: center;
					background: #F8F8F8;
					border-radius: 4rpx;
				}
				.popup_box_option_select{
					color: #3D82FF;
					background: rgba(61, 130, 255, .1);
				}
			}
			.popup_box_line{
				margin: 24rpx 0;
				width: 690rpx;
				border-top: 2rpx solid #f5f5f5;
			}
			.popup_box_btn{
				display: flex;
				.popup_box_reset{
					width: 160rpx;
					height: 80rpx;
					font-size: 26rpx;
					font-weight: 400;
					line-height: 80rpx;
					text-align: center;
					color: #333333;
					background: #FFFFFF;
					border-radius: 4rpx;
					border: 2rpx solid rgba(153, 153, 153, .3);
					box-sizing: border-box;
				}
				.popup_box_sub{
					width: 506rpx;
					height: 80rpx;
					margin-left: 24rpx;
					font-size: 26rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 80rpx;
					text-align: center;
					background: #3D82FF;
					border-radius: 4rpx;
				}
			}
			.popup_box_screen+.popup_box_screen{
				margin-top: 24rpx;
			}
			.popup_box_screen{
				.popup_box_screen_input{
					display: flex;
					align-items: center;
					padding: 0 20rpx;
					margin-top: 8rpx;
					width: 690rpx;
					height: 74rpx;
					background-color: #f8f8f8;
					border-radius: 4rpx;
					box-sizing: border-box;
					.input{
						width: 600rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #333333;
						line-height: 34rpx;
						.image_scan{
							width: 38rpx;
							height: 38rpx;
							margin-left: 12rpx;
						}
					}
				}
				.popup_box_screen_picker{
					display: flex;
					justify-content: space-between;
					width: 690rpx;
					margin-top: 8rpx;
					.popup_screen_date{
						display: flex;
						align-items: center;
						width: 332rpx;
						height: 74rpx;
						padding: 0 24rpx;
						background: #F8F8F8;
						border-radius: 4rpx;
						box-sizing: border-box;
						.popup_date_image{
							width: 34rpx;
							height: 34rpx;
							margin-right: 24rpx;
						}
					}
				}
			}
		}
		.clonePopup{
			width: 100vw;
			height: 100vh;
		}
	}
	.wrap{
		position: sticky;
		top: 0;
		.screen_bar{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100vw;
			height: 88rpx;
			background-color: #fff;
			.screen_title_wrap{
				display: flex;
				align-items: center;
				.screen_title{
					margin-right: 16rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
				.screen_title_select{
					font-weight: 500;
					color: #3D82FF;
				}
				.screen_triangle{
					width: 0;
					height: 0;
					margin-top: 7rpx;
					border-top: 7rpx solid #AAAAAA;
					border-right: 6rpx solid transparent;
					border-bottom: 7rpx solid transparent;
					border-left: 6rpx solid transparent;
				}
				.screen_triangle_select{
					width: 0;
					height: 0;
					margin-bottom: 7rpx;
					border-top: 7rpx solid transparent;
					border-right: 6rpx solid transparent;
					border-bottom: 7rpx solid #3D82FF;
					border-left: 6rpx solid transparent;
				}
			}
		}
		  
	}
}
</style>