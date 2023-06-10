<template>
	<view class="add_seller">
		<view class="add_seller_box">
			<view class="add_seller_box_title">{{ $t('basic-information') }}</view>
			<view class="add_seller_list">
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('seller-name-s') }}:</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input">
						<input class="input" type="text" :value="name.en" @input="handleEngName" placeholder-class="phcolor" :placeholder="$t('please-input-the-seller-name')" />
					</view>
				</view>
<!-- 				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('seller-name-s') }}({{$t('others')}}):</text>
					</view>
					<view class="add_seller_item_input">
						<input class="input" type="text" :value="name.zh" @input="handleName" placeholder-class="phcolor" :placeholder="$t('please-input-the-seller-name')" />
					</view>
				</view> -->
<!-- 				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('select-industry') }}</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input">
						<picker  :value="multiIndex" :range="multiArray" @change="bindPickerChange">
							<view class="add_seller_item_picker">
								<view class="picker">
									<view class="pickerPlaceholder">{{multiArray[multiIndex]}}</view>
								</view>
								<image class="image" src="../../static/more_down.png"></image>
							</view>
						</picker>
					</view>
				</view> -->
				<!-- <view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('region') }}</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input">
						<picker :value="pickerRegionIndex" @change="bindPickerRegionChange">
							<view class="add_seller_item_picker">
								<view class="picker"><view>广东省,深圳市,宝安区</view></view>
								<image class="image" src="../../static/more_down.png"></image>
							</view>
						</picker>
					</view>
				</view> -->
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('latitude-and-longitude') }}:</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input" @click="openMap">
						<text class="add_seller_item_input_text_placeholder" v-if="!longitude">{{ $t('please-select-your-latitude-and-longitude') }}</text>
						<text class="add_seller_item_input_text_placeholder" v-if="longitude" style="color: #333;">{{ longitude }},{{ latitude }}</text>
						<view class="add_seller_item_input_text_icon">
							<image class="image" src="../../static/location.png"></image>
							<text class="text">{{ $t('map-search') }}</text>
						</view>
					</view>
				</view>
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('address-details') }}:</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input">
						<input
							class="input"
							type="text"
							:value="address"
							@input="handleAddress"
							placeholder-class="phcolor"
							:placeholder="$t('please-input-your-address-details')"
						/>
					</view>
				</view>
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('seller') }}:</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input">
						<text class="add_seller_item_input_text_placeholder" v-if="!manager_id">{{ $t('select-the-seller') }}</text>
						<text class="add_seller_item_input_text_placeholder" v-if="manager_id">{{ manager_name }}</text>
						<view class="add_seller_item_input_text_icon ">
							<text class="text text_red" @click="clearManager">{{ $t('clear') }}</text>
							<view class="line"></view>
							<text class="text" @click="toSelectManager">{{ $t('select') }}</text>
						</view>
					</view>
				</view>
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('commission-ratio') }}:</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input">
						<input class="input" type="text" :value="brokerage" @input="handleBro" placeholder-class="phcolor" :placeholder="$t('please-input-the-commission-ratio')" />
					</view>
					<view class="add_seller_item_tips">{{ $t('must-be-an-integer-and-less-than-the-commission-ratio') }}90{{ $t('of-the-superior-division') }}</view>
				</view>
				<!-- 				<view class="add_seller_item">
					<view class="add_seller_item_title"><text>{{ $t('depreciation-rate') }}</text></view>
					<view class="add_seller_item_input"><input class="input" type="text" placeholder-class="phcolor" :placeholder="$t('please-depreciation-rate')" /></view>
					<view class="add_seller_item_tips">{{ $t('the-actual-ratio-of-the-merchant-is-commission-percentage-depreciation-rate') }}</view>
				</view>
				<view class="add_seller_item">
					<view class="add_seller_item_title"><text>{{ $t('store-list-display-ratio') }}</text></view>
					<view class="add_seller_item_input"><input class="input" type="text" placeholder-class="phcolor" :placeholder="$t('please-store-list-display-ratio')" /></view>
				</view> -->
			</view>
		</view>
		<view class="add_seller_box">
			<view class="add_seller_box_title">
				<text>{{ $t('billing-information') }}</text>
			</view>
			<view class="add_seller_list">
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('charging-strategy-of-power-bank') }}:</text>
						<text class="add_seller_item_title_icon">*</text>
					</view>
					<view class="add_seller_item_input" @click="openPopup">
						<text class="price_placeholder" v-if="isShowPlaceholder">{{ $t('please-input-the-charging-strategy') }}</text>
						<text class="price_placeholder" v-if="!isShowPlaceholder">
							{{billingtime}}{{ billingunit == 1 ? $t('hour') : $t('minutes') }}/{{ amount }}{{$t('S$')}}|{{ freetime }}{{$t('minutes-free')}}|{{$t('highest-consumption')}}{{ ceiling }}{{$t('S$')}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="add_seller_box">
			<view class="add_seller_box_title">{{ $t('other-information') }}</view>
			<view class="add_seller_list">
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('merchant-phone') }}:</text>
					</view>
					<view class="add_seller_item_input">
						<input class="input" type="number" :value="tel" @input="handleTel" placeholder-class="phcolor" :placeholder="$t('please-input-the-merchant-phone')" />
					</view>
				</view>
<!-- 				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{$t('contacts')}}:</text>
					</view>
					<view class="add_seller_item_input">
						<input class="input" type="text" :value="contacts" @input="handleContacts" placeholder-class="phcolor" :placeholder="$t('please-input-the-contacts')" />
					</view>
				</view> -->
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('open-hours') }}</text>
					</view>
					<view class="picker_time_box">
						<view class="picker_time">
							<picker mode="time" :value="start_time" @change="bindStartTime">
								<view class="picker">{{ start_time }}</view>
							</picker>
							<view class="line"></view>
							<picker mode="time" :value="end_time" @change="bindEndTime">
								<view class="picker">{{ end_time }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="add_seller_item">
					<view class="add_seller_item_title">
						<text>{{ $t('store-picture') }}</text>
					</view>
	<!-- 				<view class="add_seller_item_title" style="margin-top: 20rpx;">
						<radio-group @change="fileType">
							<label>
								<radio value="0" :checked="file_type == 0" />
								<text>{{ $t('picture') }}</text>
							</label>
							<label>
								<radio value="1" :checked="file_type == 1" />
								<text>{{ $t('video') }}</text>
							</label>
						</radio-group>
					</view> -->
					<view class="picker_image_box" @click="uploadImage">
						<image class="picker_image" v-if="file_type == 0&& !picture_url" src="../../static/add_seller_add_image.png"></image>
						<image class="picker_image" v-if="file_type == 1&& !video_url" src="../../static/add_seller_add_image.png"></image>
						<image class="picker_image" v-if="file_type == 0&& picture_url" :src="picture_url"></image>
						<video class="picker_image" v-if="file_type == 1&& video_url" :src="video_url"></video>
					</view>
				</view>
			</view>
		</view>
		<view class="add_seller_box">
			<view class="add_seller_box_title">{{ $t('permission-settings') }}</view>
			<view class="add_seller_list">
				<view class="add_seller_item_switch">
					<text class="text">{{ $t('disabled') }}</text>
					<view class="switch"><switch color="#3D82FF" :checked="status === 2" @change="switchStatus"></switch></view>
				</view>
			</view>
		</view>
		<view class="add_seller_sub" @click="submit">{{ $t('confirm') }}</view>
		<view class="add_seller_subs"></view>
		<popup v-if="showPopup" @close="closePopup">
			<view class="popup_wrap">
				<view class="popup_title">
					<view class="popup_title_left">{{ $t('charging-strategy-of-power-bank') }}</view>
					<view class="popup_confirm" @click="confirmBattery">{{ $t('confirm') }}</view>
				</view>
				<view class="bottom_line"></view>
				<view class="item_box">
					<view class="item_g">
						<view class="item_title">
							<text>{{ $t('charging-unit') }}</text>
							<text class="item_title_red">*</text>
						</view>
						<view class="radio_group">
							<view class="radio" @click="changeTime">
								<image class="radio_image" src="../../static/selected1.png" v-if="is_time"></image>
								<image class="radio_image" src="../../static/unselected(1).png" v-if="!is_time"></image>
								<text class="radio_text">{{ $t('hour') }}</text>
							</view>
							<view class="radio" @click="changeTimeLength">
								<image class="radio_image" src="../../static/selected1.png" v-if="is_timeLength"></image>
								<image class="radio_image" src="../../static/unselected(1).png" v-if="!is_timeLength"></image>
								<text class="radio_text">{{ $t('minutes') }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">
							{{ $t('billing-time') }}
							<text class="item_title_red">*</text>
						</view>
						<view class="item_info" @click="openPopup" v-if="is_time">
							<input type="number" placeholder-class="phcolor" :value="billingtime" @input="handleBil" :placeholder="$t('time')" />
						</view>
						<view class="item_info" @click="openPopup" v-if="is_timeLength">
							<text class="phcolor">{{$t('30minutes')}}</text>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">
							{{ $t('billing-amount') }}
							<text class="item_title_red">*</text>
						</view>
						<view class="item_info" @click="openPopup"><input type="number" placeholder-class="phcolor" :value="amount" @input="handleAmount" :placeholder="$t('amount')" /></view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">
							{{ $t('free-minutes') }}
							<text class="item_title_red">*</text>
						</view>
						<view class="item_info">
							<input type="number" placeholder-class="phcolor" :value="freetime" @input="handleFree" :placeholder="$t('minutes')" />
							<view class="tip" @click="is_ShowFree">
								<view class="tips_free" v-if="isShowFree">{{ $t('it-is-not-free') }}</view>
								<text>i</text>
							</view>
						</view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">
							{{ $t('highest-consumption') }}
							<text class="item_title_red">*</text>
						</view>
						<view class="item_info">
							<input type="number" placeholder-class="phcolor" :value="ceiling" @input="handleCeil" :placeholder="$t('minutes')" />
							<view class="tip" @click="is_Show">
								<view class="tips_text" v-if="isShow">{{ $t('maximum-daily-consumption-limit') }}</view>
								<text>i</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</popup>
		<popup v-if="sponsorPopup" @close="closeSponsorPopup">
			<view class="popup_wrap">
				<view class="popup_title">
					<view class="popup_title_left">{{ $t('add-the-referrer') }}</view>
					<view class="popup_confirm">{{ $t('confirm') }}</view>
				</view>
				<view class="bottom_line"></view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('referrer') }}</view>
						<view class="item_info"><view class="item_info_text" @click="selectSponsor">Test111</view></view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('share-ratio') }}</view>
						<view class="item_info"><input type="number" placeholder-class="phcolor" :placeholder="$t('please-enter-the-sharing-ratio-for-the-referrer')" /></view>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<view class="item_title">{{ $t('depreciation-ratio') }}</view>
						<view class="item_info"><input type="number" placeholder-class="phcolor" :placeholder="$t('please-enter-a-depreciation-ratio')" /></view>
					</view>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
import popup from '../../components/popup.vue';
import { addSeller, fileUpload, billing, editSeller } from '../../utils/addSeller/addSeller';
import { detail } from '../../utils/seller/seller';
const app = getApp();
const request = require('../../utils/request');
export default {
	data() {
		return {
			pickerRegionIndex: ['广东省', '深圳市', '宝安区'],
			multiArray:['请选择行业','餐饮', '娱乐', '商圈', '酒店','景点','美容','交通','其他'],
			name: {
				zh: '',
				en: ''
			},
			seller_id: '',
			seller_select: {},
			manager_name: app.globalData.seller.name || '',
			manager_id: app.globalData.seller.user_id || '',
			multiIndex: 0,
			showPopup: false,
			typePopup: false,
			needRefresh: true,
			is_time: true,
			is_timeLength: false,
			isShow: false,
			isShowFree: false,
			sponsorPopup: false,
			isShowPlaceholder: true,
			tempFilePaths: '', //图片地址
			shop_type: 1,
			brokerage: '',
			oldName: '',
			brokerage_rate: '',
			longitude: '',
			latitude: '',
			address: '',
			province_code: '440000',
			city_code: '441900',
			district_code: '441924',
			tel: '',
			contacts: '',
			start_time: '',
			end_time: '',
			status: 1,
			billingunit: 1,
			billingtime: '',
			amount: '',
			freetime: '',
			ceiling: '',
			picture: '',
			picture_url: '',
			file_type: 0,
			video_url:'',
			updataAddress:'',
			updataShop:'',
			contacts:''
		};
	},
	components: {
		popup
	},
	watch: {
		shop_type: {
			handler(newName, oldName) {
				console.log(newName, oldName);
				this.oldName = oldName;
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		onLoad(option) {
			console.log(option);
			console.log(app.globalData.seller);
			console.log(getApp().globalData.seller)
			console.log(111111);
			if (option.seller_id) {
				uni.setNavigationBarTitle({
					title: this.$t('modify-store')
				});
				this.seller_id = option.seller_id;
				console.log(this.seller_id);
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('add.seller')
				});
			}
		},
		onShow() {
			console.log(this.picture);
			console.log(app.globalData.seller)
			if (app.globalData.seller) {
				this.manager_name = app.globalData.seller.name;
				this.manager_id = app.globalData.seller.user_id;
				this.updataShop = app.globalData.seller.user_id;
			}
			console.log(this.manager_name, this.manager_id);
			app.globalData.seller = '';
			if (this.seller_id) {
				this.getBilling();
				this.getInfo();
			}
			
			const postInfo= uni.getStorageSync('postInfo') || '';
			this.updataAddress = postInfo
			console.log(this.updataAddress)
			if(postInfo){
				console.log(JSON.parse(postInfo));
				let postInfos = JSON.parse(postInfo)
				try {
					uni.removeStorageSync('postInfo');
					
				} catch (e) {
					// error
				}
				this.longitude = postInfos.postion.lng
				this.latitude = postInfos.postion.lat
				this.address = postInfos.address
				console.log(this.longitude,this.latitude,this.address)
			}
			console.log(postInfo)
			console.log(getApp().globalData.seller)
		},
		fileType(e) {
			console.log(e);
			this.file_type = e.detail.value;
		},
		handleName(e) {
			this.name.zh = e.target.value;
			console.log(this.name.zh);
		},
		handleEngName(e) {
			this.name.en = e.target.value;
		},
		handleAddress(e) {
			this.address = e.target.value;
		},
		handleTel(e) {
			this.tel = e.target.value;
		},
		handleContacts(e) {
			this.contacts = e.target.value;
		},
		handleBro(e) {
			this.brokerage = e.target.value;
		},
		handleBil(e) {
			this.billingtime = e.target.value;
		},
		handleAmount(e) {
			this.amount = e.target.value;
		},
		handleFree(e) {
			this.freetime = e.target.value;
		},
		handleCeil(e) {
			this.ceiling = e.target.value;
		},
		// changeLocation() {
		// 	uni.chooseLocation({
		// 		success(res) {
		// 			console.log(res);
		// 			this.longitude = res.longitude;
		// 			this.latitude = res.latitude;
		// 			console.log(this.longitude, this.latitude);
		// 			let reg = /.+?(省|市|自治区|自治州|县|区)/g;
		// 			let region = res.address.match(reg);
		// 			console.log(region);
		// 			if (region.length) {
		// 				if (region.length < 3) {
		// 					region.unshift(region[0])
		// 				}
		// 			}
		// 			this.handleCityCode(region)
		// 			this.latitude = res.latitude
		// 			this.longitude = res.longitude
		// 			this.area = region[0] + region[1] + region[2]
		// 			this.address = res.name
		// 			this.pickerRegionIndex = region
		// 		}
		// 	});
		// },
		handleCityCode(arr) {
			let that = this;
			let codeArr = [];
			for (let item of cityData) {
				if (item.name == arr[0]) {
					codeArr.push(item.code);
					for (let items of item.cityList) {
						if (items.name == arr[1]) {
							codeArr.push(items.code);
							for (let itemss of items.areaList) {
								if (itemss.name == arr[2]) {
									codeArr.push(itemss.code);
									this.province_code = codeArr[0];
									this.city_code = codeArr[1];
									this.district_code = codeArr[2];
								}
							}
						}
					}
				}
			}
		},
		bindPickerRegionChange(e) {
			this.pickerRegionIndex = e.detail.value;
			this.area = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
			this.province_code = e.detail.code[0];
			this.city_code = e.detail.code[1];
			this.district_code = e.detail.code[2];
		},
		async submit() {
			this.name.zh = this.name.en
			if (this.seller_id == '') {
				const res = await addSeller({
					name: JSON.stringify(this.name),
					tel: this.tel,
					contacts: this.contacts,
					industry: this.multiIndex,
					longitude: this.longitude,
					latitude: this.latitude,
					address: this.address,
					logo: this.picture,
					seller_file: this.picture,
					file_type: this.file_type,
					shop_start: this.start_time,
					shop_end: this.end_time,
					brokerage: this.brokerage,
					billingunit: this.billingunit,
					billingtime: this.billingtime,
					billing_type: 2,
					amount: this.amount,
					freetime: this.freetime,
					ceiling: this.ceiling,
					status: this.status,
					manager_id: this.manager_id,
					manager_name: this.manager_name,
					
				});
				console.log(res);
				if (res.code == 1) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 1000
					});
					setTimeout(() => {
						console.log('页面跳转');
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 1000);
					console.log('跳转成功');
				}
			} else {
				const res = await editSeller({
					id: Number(this.seller_id),
					name: JSON.stringify(this.name),
					tel: this.tel,
					contacts: this.contacts,
					industry: this.multiIndex,
					longitude: this.longitude,
					latitude: this.latitude,
					address: this.address,
					logo: this.picture,
					seller_file: this.picture,
					file_type: this.file_type,
					shop_start: this.start_time,
					shop_end: this.end_time,
					brokerage: this.brokerage,
					billingunit: Number(this.billingunit),
					billingtime: this.billingtime,
					amount: this.amount,
					freetime: this.freetime,
					ceiling: this.ceiling,
					status: this.status,
					manager_id: this.manager_id,
					manager_name: this.manager_name
				});
				console.log(res);
				if (res.code == 1) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 1000
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				}
			}
			console.log(this.picture)
		},
		confirmBattery() {
			this.showPopup = false;
			this.isShowPlaceholder = false;
		},
		openPopup() {
			this.showPopup = true;
		},
		openTypePopup() { 
			this.typePopup = true;
		},
		closePopup() {
			this.showPopup = false;
		},
		closeSponsorPopup() {
			this.sponsorPopup = false;
		},
		closeTypePopup() {
			this.typePopup = false;
		},
		changeTime() {
			(this.is_time = true), (this.is_timeLength = false);
			if (this.is_time) {
				this.billingunit = 1;
			} else {
				this.billingunit = 2;
				this.billingtime = 30
			}
			console.log(this.billingunit);
		},

		changeTimeLength() {
			(this.is_time = false), (this.is_timeLength = true);
			if (this.is_timeLength) {
				this.billingunit = 2;
				this.billingtime = 30
			} else {
				this.billingunit = 1;
			}
			console.log(this.billingunit);
		},
		selectShopType(e) {
			console.log(e.detail.value, this.shop_type);
			uni.showModal({
				title: this.$t('tips'),
				content: this.$t('Determined-to-modify-merchant-type'),
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.shop_type = e.detail.value * 1;
						if (this.shop_type == 2) {
							this.brokerage = 0;
							this.brokerage_rate = 100;
						}
					} else if (res.cancel) {
						console.log('用户点击取消');
						this.shop_type = this.oldName * 1;
						console.log(this.shop_type);
					}
				}
			});
		},
		is_Show() {
			this.isShow = !this.isShow;
		},
		is_ShowFree() {
			this.isShowFree = !this.isShowFree;
		},
		clearManager() {
			app.globalData.seller = {};
			this.manager_id = 0;
			this.manager_name = '';
		},
		selectSeller() {
			uni.navigateTo({
				url: `/pages/selectSeller/selectSeller?type=seller`
			});
		},
		addIntroducer() {
			this.sponsorPopup = true;
		},
		selectSponsor() {
			uni.navigateTo({
				url: `/pages/selectSeller/selectSeller?type=sponsor`
			});
		},
		uploadImage() {
			console.log(this.file_type)
			let type;
			if (this.file_type == 0) {
				type = 'image';
				uni.chooseImage({
					count: 1,
					success: async res => {
						console.log(res)
						console.log(JSON.stringify(res.tempFilePaths));
						const tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths[0]);
						console.log(type)
						uni.getStorage({
						key: 'dl_app_info',
							success:  (res)=> {
								console.log(JSON.parse(res.data).token);
								const token = JSON.parse(res.data).token
								uni.uploadFile({
									url: 'https://cdb.thpcll.com/agency/seller/fileUpload', //仅为示例，非真实的接口地址
									filePath: tempFilePaths[0],
									name: 'img_file',
									formData: {
										'img_file': tempFilePaths[0]
									},
									header: {
										'token': token,
									},
									success: (res) => {
										console.log(res);
										this.picture = JSON.parse(res.data).msg
										console.log(this.picture)
										this.picture_url = tempFilePaths[0];
										console.log(this.picture_url)
									},fail(err) {
										console.log(err)
									}
								});
							}
						});
					}
				});
			} else {
				type = 'video';
				console.log(type)
				uni.chooseVideo({
					success: async res => {
						console.log(res)
						console.log(res.tempFilePath);
						const tempFile = res.tempFilePath;
						console.log(type)
						uni.getStorage({
						key: 'dl_app_info',
							success:  (res)=> {
								console.log(JSON.parse(res.data).token);
								const token = JSON.parse(res.data).token
								uni.uploadFile({
									url: 'https://cdb.thpcll.com/agency/seller/fileUpload', //仅为示例，非真实的接口地址
									filePath: tempFile,
									name: 'img_file',
									formData: {
										'img_file': tempFile,
										'type':'video',
									},
									header: {
										'token': token
									},
									success: (res) => {
										console.log(res);
										this.picture = JSON.parse(res.data).msg
										console.log(this.picture)
										this.video_url = tempFile
										console.log(this.video_url)
									},fail(err) {
										console.log(err)
									}
								});
							}
						});
					}
				});
			}

		},
		bindStartTime(e) {
			this.start_time = e.detail.value;
			console.log(this.start_time);
		},
		bindEndTime(e) {
			this.end_time = e.detail.value;
			console.log(this.end_time);
		},
		toSelectManager() {
			uni.navigateTo({
				url: '/pages/selectSeller/selectSeller'
			});
		},
		openMap() {
			uni.navigateTo({
				url: '/pages/openMap/openMap'
			});
		},
		switchStatus(e) {
			if (e.detail.value) {
				this.status = 2;
			} else {
				this.status = 1;
			}
			console.log(this.status);
		},
		//修改
		async getBilling() {
			const res = await billing({});
			console.log(res);
		},
		async getInfo() {
			const res = await detail({
				seller_id: this.seller_id
			});
			console.log(res);
			console.log(app.globalData.seller)
			this.name.zh = JSON.parse(res.data.name).zh;
			this.name.en = JSON.parse(res.data.name).en;
			if (this.updataShop == '') {
				this.manager_name = res.data.manager_name;
				this.manager_id = res.data.manager_id;
			}
			this.brokerage = res.data.brokerage;
			this.amount = res.data.amount;
			this.ceiling = res.data.ceiling;
			this.freetime = res.data.freetime;
			this.start_time = res.data.shop_start;
			this.end_time = res.data.shop_end;
			this.billingtime = res.data.billingtime;
			this.picture_url = res.data.seller_file;
			this.video_url = res.data.seller_file;
			// this.picture_url = `${res.data.seller_file}_thumb.jpg`
			this.file_type = res.data.file_type;
			this.billingunit = res.data.billingunit;
			this.isShowPlaceholder = false;
			this.tel = res.data.tel;
			this.contacts = res.data.contacts;
			this.multiIndex = res.data.industry;
			this.status = res.data.status;
			if(!this.updataAddress){
				this.address = res.data.address;
				this.latitude = res.data.latitude;
				this.longitude = res.data.longitude;
			}
			if (res.data.billingunit == 1) {
				this.changeTime();
			} else {
				this.changeTimeLength();
			}
			console.log(this.is_time, this.is_timeLength);
			console.log(res.data.seller_file)
			console.log(this.picture)
		},
		bindPickerChange(e){
			console.log('picker发送选择改变，携带值为', e.detail.value)
			this.multiIndex = e.detail.value
		}
	}
};
</script>

<style lang="scss" scoped>
.add_seller {
	position: relative;
	width: 100vw;
	height: 100vh;
	padding: 0 30rpx 70rpx 30rpx;
	box-sizing: border-box;
	.add_seller_comfirm {
		margin: 0 auto;
		width: 690rpx;
		height: 88rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
		line-height: 88rpx;
		text-align: center;
		background: #3D82FF;
		border-radius: 44rpx;
	}
	.add_seller_sub {
		margin: 0 auto;
		width: 690rpx;
		height: 88rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #ffffff;
		line-height: 88rpx;
		text-align: center;
		background: #3D82FF;
		border-radius: 4rpx;
	}
	.add_seller_subs {
		margin: 0 auto;
		width: 690rpx;
		height: 88rpx;
		font-size: 28rpx;
		line-height: 88rpx;
	}
	.add_seller_box {
		width: 690rpx;
		margin: 0 auto;
		.add_seller_box_title {
			margin: 30rpx 0;
		}
		.add_seller_list {
			.add_seller_item {
				.add_seller_item_title {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
					.add_seller_item_title_icon {
						margin-left: 12rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #f0513a;
						line-height: 36rpx;
					}
					.item_title {
						margin: 15rpx 0;
						width: 96rpx;
						height: 44rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
						line-height: 44rpx;
					}
				}
				.add_seller_item_subtitle{
					margin: 16rpx 0; 
					display: flex;
					align-items: center;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
				.add_seller_item_input {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 690rpx;
					height: 80rpx;
					margin: 20rpx 0;
					padding: 0 20rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					border-radius: 4rpx;
					border: 2rpx solid #e8e8e8;
					box-sizing: border-box;
					.input{
						width: 100%;
					}
					.add_seller_item_picker {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 640rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
						.pickerPlaceholder {
							font-size: 26rpx;
							font-weight: 400;
							color: #aaaaaa;
							line-height: 36rpx;
						}
						.image {
							width: 26rpx;
							height: 14rpx;
						}
					}
					.add_seller_item_input_text_placeholder {
						width: 460rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #aaaaaa;
						line-height: 36rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.add_seller_item_input_value {
						width: 400rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
					}
					.add_seller_item_input_text_icon {
						display: flex;
						align-items: center;
						.image {
							width: 20rpx;
							height: 28rpx;
						}
						.text {
							margin: 0 8rpx 0 8rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #3D82FF;
							line-height: 36rpx;
						}
						.text_red {
							color: #f0513a;
						}
						.line {
							height: 24rpx;
							margin: 0 4rpx 0 12rpx;
							border-left: 2rpx solid #e8e8e8;
						}
					}
					.price_placeholder {
						font-size: 26rpx;
						font-weight: 400;
						color: #aaaaaa;
						line-height: 36rpx;
					}
					.phcolor {
						width: 100%;
					}
				}
				.add_seller_item_tips {
					margin-bottom: 20rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #f0413a;
					line-height: 34rpx;
				}
				.picker_time_box {
					margin: 20rpx 0;
					.picker_time {
						display: flex;
						align-items: center;
						.picker {
							width: 332rpx;
							height: 80rpx;
							padding: 0 20rpx;
							line-height: 80rpx;
							border-radius: 4rpx;
							border: 2rpx solid #e8e8e8;
							box-sizing: border-box;
						}
						.line {
							width: 18rpx;
							border: 2rpx solid #e8e8e8;
						}
					}
				}
				.picker_image_box {
					margin-top: 20rpx;
					.picker_image {
						width: 690rpx;
						height: 240rpx;
					}
				}
			}
			.add_seller_item_switch {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 690rpx;
				margin-bottom: 30rpx;
				.text {
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
				.switch {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 40rpx;
					transform: scale(0.7);
				}
			}
		}
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
		.popup_list {
			.popup_item {
				display: flex;
				justify-content: space-between;
				margin: 0 auto;
				width: 690rpx;
				height: 96rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
				line-height: 96rpx;
				border-bottom: 2rpx solid #f5f5f5;
				.popup_item_radio {
					.radio_group {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 690rpx;
						.radio_box {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							font-weight: 400;
							color: #333333;
							.radio {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 36rpx;
								height: 36rpx;
								margin-right: 16rpx;
								transform: scale(0.75);
							}
						}
					}
				}
				.popup_item_left {
					width: 240rpx;
					.popup_red {
						margin-left: 12rpx;
						color: #f0513a;
					}
				}
				.popup_item_right {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 490rpx;
					.radio_group {
						display: flex;
						.radio_box {
							display: flex;
							align-items: center;
							.radio {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 36rpx;
								height: 36rpx;
								margin-left: 40rpx;
								margin-right: 16rpx;
								transform: scale(0.75);
							}
						}
					}
					.input {
						width: 300rpx;
					}
					.colorGrey {
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #777777;
						line-height: 36rpx;
					}
					.popup_item_right_input {
						display: flex;
						align-items: center;
						width: 150rpx;
						height: 68rpx;
						padding-left: 16rpx;
						margin-right: 16rpx;
						background: #ffffff;
						border-radius: 4rpx;
						border: 2rpx solid #e9eaf0;
						box-sizing: border-box;
						.input {
							width: 124rpx;
							text-align: right;
						}
					}
					.image_icon {
						width: 16rpx;
						height: 28rpx;
						margin-left: 24rpx;
					}
					.switch {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 80rpx;
						height: 40rpx;
						transform: scale(0.7);
					}
					.phcolor {
						width: 100%;
					}
				}
			}
		}
		.bottom_line {
			width: 750rpx;
			height: 2rpx;
			background: #f5f5f5;
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
						color: #f0513a;
						line-height: 36rpx;
					}
				}
				.switch {
					transform: scale(0.7);
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
					.item_title_red {
						margin-left: 12rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #f0513a;
						line-height: 36rpx;
					}
				}
				.item_info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.item_info_text {
						font-size: 26rpx;
						font-weight: 400;
						color: #333333;
						line-height: 36rpx;
					}
					.item_placeholder {
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #aaaaaa;
						line-height: 36rpx;
					}
					.item_image {
						width: 20rpx;
						height: 16rpx;
					}
					.input {
						width: 600rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #333;
					}
					.search_text {
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
					.tip {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 40rpx;
						height: 42rpx;
						background: #aaaaaa;
						opacity: 0.5;
						border-radius: 50%;
						text {
							height: 28rpx;
							font-size: 26rpx;
							font-weight: 400;
							color: #ffffff;
							line-height: 28rpx;
						}
						.tips_text {
							position: absolute;
							right: 50rpx;
							bottom: 2rpx;
							width: 420rpx;
							font-size: 20rpx;
							font-weight: 400;
							color: #ffffff;
							line-height: 52rpx;
							text-align: center;
							background: #000000;
							border-radius: 4rpx;
							opacity: 0.5;
						}
						.tips_free {
							position: absolute;
							top: -50rpx;
							right: 50rpx;
							width: 460rpx;
							font-size: 20rpx;
							font-weight: 400;
							color: #ffffff;
							line-height: 52rpx;
							text-align: center;
							background: #000000;
							border-radius: 4rpx;
							opacity: 0.5;
						}
					}
				}
			}
		}
	}
}
</style>
