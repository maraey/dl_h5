<template>
	<view class="container">
		<scroll-view class="list" scroll-y="true">
			<view class="screen_bar">
				<view class="screen_item" :class="[screen_type =='basic'? 'screen_selected':'']" @click="screen('basic')">
					<text>{{$t('basic-information')}}</text>
					<view class="line"></view>
				</view>
<!-- 				<view class="screen_item" :class="[screen_type =='profit'? 'screen_selected':'']" @click="screen('profit')">
					<text>{{$t('device-revenue')}}</text>
					<view class="line"></view>
				</view> -->
				<view class="screen_item" :class="[screen_type =='manage'? 'screen_selected':'']" @click="screen('manage')">
					<text>{{$t('slot-management')}}</text>
					<view class="line"></view>
				</view>
			</view>
			<view class="basic_info" v-if="screen_type =='basic'">
				<view class="basic_info_item">
					<view class="title">{{$t('seller-name')}}</view>
					<view class="text">: {{info.seller_name}}</view>
				</view>
				<view class="basic_info_item">
					<view class="title">{{$t('store-address')}}</view>
					<view class="text">: {{info.seller_address}}</view>
				</view>
				<view class="basic_info_item">
					<view class="title">{{$t('sim-card')}}</view>
					<view class="text">: {{info.sim}}</view>
				</view>
				<view class="basic_info_item">
					<view class="title">{{$t('added-time')}}</view>
					<view class="text">: {{info.create_time}}</view>
				</view>
				<view class="basic_info_item">
					<view class="title">{{$t('working-time')}}</view>
					<view class="text">: {{info.heart_time}}</view>
				</view>
				<view class="basic_info_item">
					<view class="title">{{$t('device-number')}}</view>
					<view class="text">: {{info.device_id}}</view>
				</view>
				<view class="basic_info_item" style="align-items: flex-start;">
					<view class="title">{{$t('Qr-code')}}</view>
					<view class="qrcode">
						<view class="text">: {{info.qr_code}}</view>
					<image class="image" :src="qrcode1+info.qr_code" webp></image>
				  </view>
				</view>
			</view>
			<view class="profit" v-if="screen_type == 'profit'">
				<view class="tab">
					<view class="tab_item" :class="[tabType=='year'?'tab_selected':'']" @click="selectYear('year')">{{$t('year')}}</view>
					<view class="tab_item" :class="[tabType=='month'?'tab_selected':'']" @click="selectYear('month')">{{$t('month')}}</view>
				</view>
				<view class="list_wrap">
					<view class="list_title">
						<picker @change="bindPickerChange" v-if="tabType=='year'" :value="index" :range="array">
							<view class="picker">
								<view>{{array[index]}}</view>
								<image class="image" src="../../static/xiala.png"></image>
							</view>
						</picker>
						<picker mode="date" :value="date" fields="month" v-if="tabType=='month'" @change="bindDateChange">
							<view class="picker">
								<view>2022-09</view>
								<image class="image" src="../../static/xiala.png"></image>
							</view>
						</picker>
						<view class="total_amount">{{tabType=='year'?$t('year-s'):$t('month-s')}}{{$t('total-amount')}}：¥{{totalAmount}}</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="profit_list">
					<view class="item" v-for="item in tabList" :key="item.month">
						<text class="item_title">{{item.month}}</text>
						<text class="item_item_amount">{{item.amount}}</text>
					</view>
				</view>
			</view>
			<view class="options" v-if="screen_type == 'manage'">
				<view class="option" @click="openAll">{{$t('pop-up-all-power-bank')}}</view>
				<view class="option" @click="refresh">{{$t('refresh-battery')}}</view>
				<view class="option" @click="reset">{{$t('reboot')}}</view>
			</view>
			<view class="manage" v-if="screen_type == 'manage'">
			    <view class="manage_top_box">
					<view class="device_set">
						<view class="device_id">{{$t('device-id')}}：{{info.cabinet_id}}</view>
						<view class="set_error" v-if="!is_fault" @click="setError" >{{$t('set-as-fault')}}</view>
						<view class="set_error" v-if="is_fault" @click="cancelError">{{$t('cancel-fault')}}</view>
					</view>
					<view class="set_volume" v-if="is_volume">
						<view class="title">{{$t('set-volume')}}</view>
						<view class="input_box">
							<input class="input" type="number" :value=volume @input="handleVolume" :placeholder="$t('please-enter-volume')" />
						</view>
						<view class="set_btn" @click="setVolume">{{$t('confirm')}}</view>
					</view>
			    </view>
			    <view class="slot_box" v-for="(item,index) in info.battery" :key="index">
			    	<view class="slot_title">
			    		<text>{{$t('slot')}}{{item.lock_id}}</text>
			    		<view class="open" @click="popupDevice(item.lock_id)">{{$t('pop-up')}}</view>
			    	</view>
			    	<view class="line"></view>
			    	<view class="battery_info">
			    		<view class="battery_item">
			    			<view class="battery_title">{{$t('battery-id')}}</view>
			    			<view v-if="item.battery_id">{{item.battery_id}}</view>
							<view v-if="!item.battery_id">/</view>
			    		</view>
			    		<view class="battery_item">
			    			<view class="battery_title">{{$t('battery-power')}}</view>
			    			<view v-if="item.power">{{item.power}}</view>
							<view v-if="!item.power">/</view>
			    		</view>
			    		<view class="battery_item">
			    			<view class="battery_title">{{$t('status')}}</view>
			    			<view class="battery_title_fault" v-if="item.battery_id">{{is_fault==1?$t('fault'):$t('normal')}}</view>
							<view v-if="!item.battery_id">/</view>
			    		</view>
			    	</view>
			    </view>
			  </view>
		</scroll-view>

	</view>
</template>

<script>
	import {detail, openAllLock, restart, setFault, openLock, volume} from '../../utils/batteryDevice/batteryDevice'
	export default {
		data() {
			return {
				device_id: '',
				screen_type:'basic',
				tabType: 'year',
				array: [2022,2021],
				index: 0,
				tabList: [ {month: "1月", amount: "￥0"}
							,{month: "2月", amount: "￥0"}
							,{month: "3月", amount: "￥0"}
							,{month: "4月", amount: "￥0"}
							,{month: "5月", amount: "￥0"}],
				date: '',
				totalAmount: '1.75451',
				battery:[{},{},{}],
				info: {},
				is_fault: 1,
				lock_id: 1,
				is_volume: false,
				volume: '100',
				qrcode1:'https://cdb.thpcll.com/operate/auth/qrcode?type=device&text=',
			}
		},
		onLoad(options) {
			console.log(options)
			this.device_id = options.device_id
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			screen(e) {
				this.screen_type = e
			},
			selectYear(e){
				this.tabType = e
			},
			bindPickerChange(){
				
			},
			bindDateChange(){
				
			},
			openAll(){
				uni.showModal({
					title: this.$t('tips'),
					content: this.$t('Are-all-power-banks-ejected'),
					success: async(res)=> {
						if(res.confirm) {
							uni.showLoading({
								title: this.$t('Wait-for-a-moment-please'),
							})
							const res = await openAllLock({
								device_id: this.device_id
							})
							uni.hideLoading()
							if (res.code ==1) {
								this.getInfo()
							}
						}
					}
				})
			},
			refresh(){
				uni.showModal({
					title: this.$t('tips'),
					content: this.$t('Do-you-want-to-refresh-the-battery'),
					success: async (res)=> {
						if(res.confirm) {
							this.getInfo()
						}
					}
				})
			},
			reset(){
				uni.showModal({
					title: this.$t('tips'),
					content: this.$t('Whether-to-restart-the-cabinet'),
					success: async(res) =>{
						if(res.confirm) {
							uni.showLoading({
								title:this.$t('Wait-for-a-moment-please'),
							})
							const res = await restart({
								device_id: this.device_id
							})
							uni.hideLoading()
							if (res.code ==1) {
								this.getInfo()
							}
						}
					}
				})
			},

			async getInfo(){
				const res = await detail({
					device_id: this.device_id
				})
				console.log(res)
				this.info = res.data
				this.is_fault = res.data.is_fault
				this.is_volume = res.data.is_volume
			},
			setError(){
				uni.showModal({
					title:this.$t('tips'),
					content: this.$t('Is-it-set-to-Fault'),
					success: async (res)=> {
						if(res.confirm) {
							const res = await setFault({
								device_id: this.device_id,
								is_fault: 1
							})
							console.log(res)
							this.getInfo()
						}
					}
				})
			},
			cancelError(){
				uni.showModal({
					title: this.$t('tips'),
					content: this.$t('Cancel-the-fault'),
					success: async (res)=> {
						if(res.confirm) {
							const res = await setFault({
								device_id: this.device_id,
								is_fault: 0
							})
							console.log(res)
							this.getInfo()
						}
					}
				})
			},
			popupDevice(e){
				this.lock_id = e
				uni.showModal({
					title: this.$t('tips'),
					content: this.$t('Is-the-power-bank-ejected'),
					success: async (res)=> {
						if(res.confirm) {
							const res = await openLock({
								device_id: this.device_id,
								lock_id: this.lock_id	
							})
							console.log(res)
						}
					}
				})
			},
			handleVolume(e){
				this.volume = e.target.value
				console.log(this.volume)
			},
			setVolume() {
				uni.showModal({
					title: this.$t('tips'),
					content: this.$t('Is-the-volume-set'),
					success: async (res)=> {
						if(res.confirm) {
							const res = await volume({
								device_id: this.device_id,
								volume: this.volume
							})
							console.log(res)
							this.getInfo()
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	width: 100vw;
	background: #f4f5f5;
	overflow: scroll;
	.list{
		width: 100vw;
		height: 100vh;
		.screen_bar{
			display: flex;
			justify-content: space-around;
			width: 100vw;
			height: 88rpx;
			font-size: 26rpx;
			font-weight: 400;
			background: #FFFFFF;
			border-bottom: 2rpx solid #f5f5f5;
			box-sizing: border-box;
			.screen_item{
				height: 88rpx;
				line-height: 88rpx;
				text{
					height: 36rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
			}
			.screen_selected{
				position: relative;
				font-weight: 500;
				color: #3D82FF;
				box-sizing: border-box;
				.line{
					position: absolute;
					bottom: 0;
					left: 50%;
					width: 64rpx;
					height: 4rpx;
					transform: translateX(-50%);
					background: #3D82FF;
				}
				text{
					color: #3D82FF;
				}
			}
		}
		.basic_info{
			width: 690rpx;
			margin: 30rpx auto;
			padding: 36rpx 32rpx;
			background: #FFFFFF;
			border-radius: 8px;
			box-sizing: border-box;	
			.basic_info_item{
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
				.title{
					width: 126rpx;
					margin-right: 28rpx;
				}
				.text{
					color: #999999;
				}
				.qrcode{
					display: flex;
					flex-direction: column;
				}
				.image{
					width: 160rpx;
					height: 160rpx;
					margin-top: 20rpx;
				}
			}
			.basic_info_item+.basic_info_item{
				margin-top: 16rpx;
			}
		}
		.profit{
			width: 690rpx;
			margin: 0 auto;
			box-sizing: border-box;
			.tab{
				display: flex;
				align-items: center;
				margin-top: 32rpx;
				width: 690rpx;
				.tab_item{
					width: 140rpx;
					height: 64rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #777777;
					line-height: 64rpx;
					text-align: center;
					background: #ffffff;
					box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
					border-radius: 33rpx;
				}
				.tab_item+.tab_item {
					margin-left: 44rpx;
				}
				.tab_selected{
					width: 140rpx;
					height: 64rpx;
					color: #FFFFFF;
					background: #3D82FF;
					box-shadow: 0px 4rpx 8rpx 0rpx rgba(61, 130, 255, 0.2);
					border-radius: 32rpx;
				}
			}
			.list_wrap{
				width: 690rpx;
				height: 90rpx;
				margin-top: 24rpx;
				padding: 0 32rpx;
				background: #FEFFFE;
				border-radius: 8rpx 8rpx 0rpx 0rpx;
				box-sizing: border-box;
				.list_title{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 90rpx;
					.picker{
						display: flex;
						align-items: center;
						.image{
							width: 20rpx;
							height: 12rpx;
							margin-left: 22rpx;
						}
					}
				}
			}
			.line{
				width: 690rpx;
				height: 2rpx;
				background: #F8F8F8;
			}
			.profit_list{
				width: 690rpx;
				background: #FEFFFE;
				border-radius: 0rpx 0rpx 8rpx 8rpx;
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 626rpx;
					height: 96rpx;
					margin: 0 auto;
				}
				.item+.item{
					border-top: 2rpx solid #F8F8F8;
				}
			}
		}
		.options{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100vw;
			height: 124rpx;
			background: #FFFFFF;
			.option{
				width: 228rpx;
				height: 64rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #3D82FF;
				line-height: 64rpx;
				text-align: center;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #3D82FF;
			}
		}
		.manage{
			width: 690rpx;
			height: 100vh;
			margin: 0 auto;
			.manage_top_box{
				width: 690rpx;
				margin-top: 24rpx;
				padding: 36rpx 32rpx;
				background: #FFFFFF;
				box-sizing: border-box;
				.device_set{
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
					.set_error{
						width: 160rpx;
						height: 64rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 64rpx;
						text-align: center;
						background: #F0513A;
						border-radius: 8rpx;
					}
				}
				.set_volume{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 40rpx;
					.title{
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
					}
					.input_box{
						display: flex;
						align-items: center;
						width: 356rpx;
						height: 64rpx;
						padding: 0 24rpx;
						background: #F8F8F8;
						border-radius: 4rpx;
						box-sizing: border-box;
						.input{
							font-size: 24rpx;
							font-weight: 400;
							color: #333333;
							line-height: 34rpx;
						}
					}
					.set_btn{
						width: 108rpx;
						height: 64rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 64rpx;
						text-align: center;
						background: #3D82FF;
						border-radius: 8rpx;
					}
				}
			}
			.slot_box{
				width: 690rpx;
				height: 204rpx;
				margin-top: 30rpx;
				padding: 20rpx 24rpx;
				background: #FFFFFF;
				box-sizing: border-box;
				.slot_title{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					line-height: 42rpx;
					.open{
						padding: 0 16rpx;
						box-sizing: border-box;
						height: 46rpx;
						line-height: 46rpx;
						text-align: center;
						font-size: 24rpx;
						font-weight: 400;
						color: #3D82FF;
						border-radius: 24rpx;
						border: 2rpx solid #3D82FF;
					}
				}
				.line{
					width: 626rpx;
					margin: 20rpx 0;
					border-top: 2rpx solid #f5f5f5;
				}
				.battery_info{
					display: flex;
					justify-content: space-around;
					.battery_item{
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 24rpx;
						font-weight: 400;
						color: #333333;
						line-height: 34rpx;
						.battery_title{
							margin-bottom: 12rpx;
							font-weight: 500;
							color: #999999;
						}
						.battery_title_fault{
							color: #F0513A;
						}
					}
				}
			}
		}
	}
	
}
</style>
