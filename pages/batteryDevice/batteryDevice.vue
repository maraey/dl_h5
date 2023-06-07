<template>
	<view class="container">
		<topTabbar :popupSeller="popupSeller" :popupStatus="popupStatus" :status="status" @click="selectScreen" @sellerDataSelect="getDeviceData" @sellerSelect="getSeller"  @deviceSelect="getDevice" @statusData="getStatus"></topTabbar>
		<view class="time_num">
			<text>{{$t('online-device')}}：{{total}}</text>
		</view>
		<scroll-view class="list" scroll-y="true" >
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="title_box">
					<text class="title_text">{{$t('device-id')}}：{{item.device_id}}</text>
					<text class="copy" @click="copy(item.device_id)">{{$t('copy')}}</text>
				</view>
				<view class="shop_box">
					<view class="shopTitle"> 
						<text class="title">{{$t('affiliated-store')}}：</text>
						<text class="title_text" v-if="item.seller_name!= ''">{{item.seller_name}}</text>
						<text class="title_text" v-if="item.seller_name== '' " @click="selectSeller(item.device_id)">{{$t('select-merchant')}}</text>
					</view>
					<view class="btn_org" v-if="item.seller_name!= ''" @click="cancleBind(item.device_id)">
						{{$t('cancel-the-binding')}}
					</view>
				</view>
				<view class="line"></view>
				<view class="info_box">
					<view class="info">
						<text class="info_text">{{$t('network')}}</text>
						<text class="info_num" v-if="item.is_online">{{$t('online')}}</text>
						<text class="info_num" v-if="!item.is_online">{{$t('offline')}}</text>
					</view>
					<view class="info">
						<text class="info_text">{{$t('rentable')}}</text>
						<text class="info_num">{{item.borrow_num}}</text>
					</view>
					<view class="info">
						<text class="info_text">{{$t('returnable')}}</text>
						<text class="info_num">{{item.return_num}}</text>
					</view>
					<view class="info">
						<text class="info_text">{{$t('total-s')}}</text>
						<text class="info_num">{{item.device_num}}</text>
					</view>
				</view>
				<view class="bottom_line"></view>
<!-- 				<view class="memo_box">
					<text class="memo">{{$t('remark')}}</text>
					<text class="addmemo" @click="remarks">{{$t('add-remark')}}</text>
				</view> -->
				<view class="operate">
					<view class="btn" @click="toDetail(item.device_id)">
						{{$t('check-the-details')}}
					</view>
					<view class="btn_org" v-if="item.sub_id == 0" @click="toBindAgencys(item.device_id)">
						{{$t('bind-agent')}}
					</view>
					<view class="btn_org" v-if="item.sub_id !==0" @click="cancelAgency(item.device_id)">
						{{$t('cancel-the-binding')}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="remarks_popup" v-if="showRemarkPopup" @click.stop="cancle">
			<view class="remarks_popup_box" @click.stop="stop">
				<view class="title">{{$t('add-remark')}}</view>
				<view class="text">
					<textarea class="textarea" placeholder-class="phcolor" :placeholder="$t('add-remark')"></textarea>
				</view>
				<view class="btn_box" @click.stop="stop">
					<view class="btn" @click="cancle">{{$t('cancle')}}</view>
					<view class="line"></view>
					<view class="btn confirm">{{$t('confirm')}}</view>
				</view>
			</view>
		</view>
		<bindAgency @cancle="cancleAgency" @selected="selectAgency" @searchs='searchAgency' :userList="userList" v-if="bindAgency" @role="handleRole" @roleList="toBindAgency"></bindAgency>
		<bindSeller @cancle="cancleSeller" @selected="toSelectSeller" @search="searchKey" :sellerArr="sellerArr" v-if="bindSeller"></bindSeller>
	</view>
</template>

<script>
	import topTabbar from '../../components/topTabbar.vue'
	import bindAgency from '../../components/bindAgency.vue'
	import bindSeller from '../../components/bindSeller.vue'
	import {deviceList, unbindAgency, bindUser, bindSellerName, unbindSeller} from '../../utils/batteryDevice/batteryDevice'
	import {userList} from '../../utils/role/role'
	import {sellerList} from '../../utils/seller/seller'
	let timer = null;
	export default {
		data() {
			return {
				page: 1,
				page_size: 20,
				device_id: '',
				title:[{
					title:this.$t('online')
				},{
					title:this.$t('my-data')
				},{
					title:this.$t('filter')
				}],
				status: true,
				popupStatus: false,
				popupSeller: false,
				showRemarkPopup: false,
				showPopup: false,
				selectType: 'online',
				screenStatus: '',
				screenMy: false,
				bindAgency: false,
				bindSeller: false,
				is_sub: false,
				keyword: '',
				total: '',
				list: {},
				seller_name: '',
				select: 'online',
				userList: [],
				agency_id: '',
				seller_id: '',
				sellerArr: [],
				searchkey: '',
				role: 'agency',
			}
		},
		components:{
			topTabbar,
			bindAgency,
			bindSeller
		},
		onShow() {
			this.getList()
		},
		methods: {
			toDetail(e){
				this.device_id = e
				uni.navigateTo({
					url:`/pages/batteryDeviceDetail/batteryDeviceDetail?device_id=${this.device_id}`
				})
				console.log(e)
			},
			endOrder(){
				uni.navigateTo({
					url:'/pages/endOrder/endOrder'
				})
			},
			remarks(){
				this.showRemarkPopup = true
			},
			cancle(){
				this.showRemarkPopup = false
			},
			stop() {
		
			},
			closePopup(){
				
			},
			selectScreenStatus(e){
				this.screenStatus = e
			},
			// selectScreenMy(e){
			// 	if(e == 'my'){
			// 		this.screenMy = false
			// 	}else {
			// 		this.screenMy = true
			// 	}
			// },
			scanBind(){
				
			},
			selectScreen(){
				this.showPopup = true
			},
			cancleAgency() {
				this.bindAgency = false
			},
			cancleSeller() {
				this.bindSeller = false
			},
			async bingUser(){
				console.log(this.agency_id,this.device_id)
				const res = await bindUser({
					agency_id: Number(this.agency_id),
					device_id: this.device_id,
					code_type: 'sn'
				})
				console.log(res)
				this.getList()
			},
			async bindShop(){
				const res = await bindSellerName({
					 seller_id: Number(this.seller_id),
					 device_id: this.device_id,
					 code_type: 'sn'
				})
				console.log(res)
				this.getList()
			},
			selectAgency(data) {
				this.agency_id = data
				this.bindAgency = true
				this.bingUser()
				console.log(this.agency_id)
			},
			handleRole(data){
				this.role = data
				console.log(this.role)
			},
			toSelectSeller(data) {
				this.seller_id = data
				this.bindSeller = true
				this.bindShop()
				console.log(this.seller_id)
			},
			async getList() {
				const res = await deviceList({
					page: this.page,
					page_size: this.page_size,
					is_sub: String(this.is_sub),
					keyword: this.keyword,
					status: this.select,
					seller: this.seller_name
				})
				console.log(res)
				this.list = res.data.list
				this.total = res.data.total
			},
			copy(e){
				uni.setClipboardData({
					data: e
				})
			},
			getDeviceData(data) {
				if(data == 'my') {
					this.is_sub = false
				} else {
					this.is_sub = true
				}
				console.log(this.is_sub)
				this.getList()
			},
			getDevice(data) {
				this.keyword = data
				console.log(this.keyword)
				this.getList()
			},
			getSeller(data) {
				this.seller_name = data
				console.log(this.seller_name)
				this.getList()
			},
			getStatus(data) {
				this.select = data
				console.log(this.select)
				this.getList()
			},
			async cancelAgency(e) {
				const res = await unbindAgency({
					device_id : e
				})
				console.log(res)
				this.getList()
			},
			async cancleBind(e){
				const res = await unbindSeller({
					device_id: e
				})
				console.log(res)
				this.getList()
			},
			toBindAgencys(e){
				this.device_id = e
				this.bindAgency = true
				this.toBindAgency()
			},
			async toBindAgency() {
				
				const res = await userList({
					page: this.page,
					page_size: this.page_size,
					sub_id: '',
					role: this.role,
					name: this.searchkeys,
				})
				this.userList = res.data.list
				console.log(this.userList,this.device_id)

			},
			async selectSeller(e){
				this.device_id = e
				this.bindSeller = true
				const res = await sellerList({
					page: this.page,
					page_size: this.page_size,
					is_sub: 'false',
					keyword: this.searchkey,
				})
				this.sellerArr = res.data.list
				console.log(this.sellerArr)
			},
			searchKey(data) {
				this.searchkey = data
				clearTimeout(timer);
				timer = setTimeout(() => {
					this.page = 1;
					this.selectSeller();
					this.scrollTop = 0;
				}, 300);
			},
			searchAgency(data) {
				this.searchkeys = data
				console.log(this.searchkeys)
				clearTimeout(timer);
				timer = setTimeout(() => {
					this.page = 1;
					this.toBindAgency();
					this.scrollTop = 0;
				}, 300);
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100vw;
		height: 100vh;
		background: #f4f5f5;
		overflow: scroll;
		.time_num{
			display: flex;
			align-items: center;
			width: 100vw;
			height: 80rpx;
			margin-top: 2rpx;
			padding: 0 30rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			text{
				height: 32rpx;
				font-size: 22rpx;
				font-weight: 400;
				color: #999999;
				line-height: 32rpx;
			}
		}
		.list{
			width: 690rpx;
			height: calc(100vh - 210rpx);
			margin: 30rpx auto 0;
			.item{
				width: 690rpx;
				padding: 36rpx 32rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				box-sizing: border-box;
				.title_box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title_text{
						height: 44rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
						line-height: 44rpx;
					}
					.copy{
						width: 76rpx;
						height: 38rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: $global-color;
						text-align: center;
						line-height: 38rpx;
						background: #FFFFFF;
						border-radius: 19rpx;
						border: 2rpx solid $global-color;
					}
				}
				.shop_box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 16rpx;
					margin-bottom: 16rpx;
					height: 40rpx;
					.shopTitle{
						width: 420rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						.title{
							width: 140rpx;
							height: 40rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #333333;
							line-height: 40rpx;
						}
						.title_text{
							width: 168rpx;
							height: 40rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #3D82FF;
							line-height: 40rpx;
						}
					}
					.btn_org{
						margin-left: 24rpx;
						height: 36rpx;
						padding: 0 16rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #F0513A;
						text-align: center;
						line-height: 36rpx;
						background: #FFFFFF;
						border-radius: 23rpx;
						border: 2rpx solid #F0513A;
					}
				}
				.line{
					width: 626rpx;
					height: 2rpx;
					margin: 28rpx auto 40rpx;
					background: #F5F5F5;
				}
				.info_box{
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.info{
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;
						height: 92rpx;
						width: 288rpx;
						.info_text{
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 500;
							color: #999999;
							line-height: 36rpx;
						}
						.info_num{
							text-align: center;
							height: 36rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #3D82FF;
							line-height: 36rpx;
						}
					}
				}
				.bottom_line{
					width: 626rpx;
					height: 2rpx;
					margin-top: 40rpx;
					margin-bottom: 24rpx;
					background: #F5F5F5;
				}
				.memo_box{
					display: flex;
					.memo{
						width: 56rpx;
						height: 40rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #999999;
						line-height: 40rpx;
					}
					.addmemo{
						margin-left: 28rpx;
						width: 112rpx;
						height: 40rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #3D82FF;
						line-height: 40rpx;
					}
				}

				.operate{
					display: flex;
					justify-content: flex-end;
					margin-top: 24rpx;
					.btn{
						margin-left: 24rpx;
						height: 46rpx;
						padding: 0 16rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #3D82FF;
						text-align: center;
						line-height: 46rpx;
						background: #FFFFFF;
						border-radius: 23rpx;
						border: 2rpx solid #3D82FF;
					}
					.btn_org{
						margin-left: 24rpx;
						height: 46rpx;
						padding: 0 16rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #FD8D09;
						text-align: center;
						line-height: 46rpx;
						background: #FFFFFF;
						border-radius: 23rpx;
						border: 2rpx solid #FD8D09;
					}
				}
			}
			.item+.item{
				margin: 30rpx 0;
			}
		}
		.remarks_popup{
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.3);
			z-index: 2;
			.remarks_popup_box{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 622rpx;
				height: 384rpx;
				margin-bottom: 300rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				z-index: 3;
				.title{
					margin: 30rpx 0 24rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					line-height: 42rpx;
				}
				.text{
					width: 558rpx;
					height: 160rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					line-height: 34rpx;
					background: #F8F8F8;
					border-radius: 4rpx;
					.textarea{
						width: 558rpx;
						height: 160rpx;
						padding: 24rpx;
						box-sizing: border-box;
					}
				}
				.btn_box{
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 622rpx;
					height: 96rpx;
					margin-top: 30rpx;
					font-size: 30rpx;
					font-weight: 400;
					color: #333333;
					border-top: 2rpx solid #f5f5f5;
					.line{
						height: 26rpx;
						border-left: 2rpx solid #f5f5f5;
					}
					.btn{
						width: 50%;
						height: 96rpx;
						line-height: 96rpx;
						text-align: center;
					}
					.confirm{
						font-weight: 500;
					}
				}
			}
		}
		.popup{
			position: fixed;
			top: 88rpx;
			width: 100vw;
			height: 100vh;
			border-top: 2rpx solid #F4F5F5;
			background-color: rgba(0, 0, 0, 0.3);
			z-index: 999;
			.popup_box{
				width: 100vw;
				padding: 24rpx 30rpx;
				background-color: #fff;
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
		}
	}
</style>
