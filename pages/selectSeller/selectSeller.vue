<template>
	<view class="container">
		<view class="list">
			<view class="input_wrap">
				<image src="../../static/search_input.png"></image>
				<input :value="keyword" @input="handleKeyword" @confirm="search" type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-a-keyword')" />
			</view>
		</view>
		<view class="item_list" v-if="type === 'sellervip'">
			<checkbox-group>
				<view class="item" v-for="item in list" :key="item.user_id" @click="selectVip(item)">
					<text>{{item.name.zh}}</text>
					<view class="radio"  >
						<checkbox color="#3D82FF" :checked="item.checked"/>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="item_list" v-if="type !== 'sellervip'">
		    <radio-group >
				<view class="item" v-for="item in list" :key="item.user_id" @click="selectInfo(item)">
					<text>{{item.name}}</text>
					<view class="radio"  >
						<radio color="#3D82FF" :checked="info.user_id"/>
					</view>
				</view>
		    </radio-group>
		</view>
<!-- 		<view class="pageing">
			<view class="page_up" @click="toLastPage">
				<text class="up_text">{{$t('last-page')}}</text>
			</view>
			<view class="page_num">{{page}}</view>
			<view class="page_down" @click="toNextPage">
				<text class="down_text">{{$t('next-page')}}</text>
			</view>
		</view> -->
		<view class="btn">
			<view class="cancle" @click="cancle">{{$t('cancle')}}</view>
			<view class="sub" @click="submit">{{$t('confirm')}}</view>
		</view>
	</view>
</template>

<script>
import {roleList} from '../../utils/addSeller/addSeller'
import {searchShop} from '../../utils/addSellerVip/addSellerVip'
const app = getApp()
	export default {
		data() {
			return {
				name:'',
				page: 1,
				page_size: 10000,
				list: [],
				info: {},
				type:'',
				keyword: '',
				total:'',
				total_page:''
			};
		},
		onLoad(option) {
			console.log(option)
			if(option.type==='sellervip'){
				uni.setNavigationBarTitle({
					title: this.$t('select-vip'),
				})
			}else {
				uni.setNavigationBarTitle({
					title: this.$t('select-merchant'),
				})
			}
			this.type = option.type
		},
		mounted() {
			if(this.type==='sellervip'){
				this.getShopList()
			}else{
				this.getList()
			}
			app.globalData.seller = '';
		},
		methods: {
			getList() {
				uni.getStorage({
				key: 'dl_app_info',
					success:  (res)=> {
						console.log(JSON.parse(res.data).token);
						const token = JSON.parse(res.data).token
						let lang  = uni.getLocale()
						if(lang == 'zh-Hans') {
							 lang = 'zh-cn'
						}else {
							lang = 'en-us'
						}
						uni.request({
							url: `https://cdb.thpcll.com/agency/role/selectList?lang=${lang}&page=${this.page}`, //仅为示例，并非真实接口地址。
							header: {
								'token': token
							},
							data: {
								page_size: this.page_size,
								role: 'manager',
								name: this.keyword
							},
							method: 'POST',
							success: (res) => {
								const code = res.data.code
								if (code == 1) {
									console.log(res.data)
									this.list = res.data.data.list
									this.total = res.data.data.total
									console.log(this.list)
								} 
							},
							fail: err => {
								console.log(err);
							}
						});
					}
				});
			},
			async getShopList() {
				const res = await searchShop({
					page: this.page,
					page_size: this.page_size,
					keyword: this.keyword
				})
				console.log(res)
				res.data.list.forEach(item=>{
					item.name = JSON.parse(item.name)
					item.checked = false
				})
				this.list = res.data.list
			},
			cancle() {
				uni.navigateBack({
					delta: 1
				})
			},
			selectInfo(e) {
				this.info.name = e.name
				this.info.user_id = e.user_id
				console.log(e)
				console.log(111111)
				console.log(this.info.user_id)
				
			},
			selectVip(e) {
				this.info.name = e.name
				this.info.user_id = e.id
				this.info.checked= !this.info.checked
				console.log(e)
				console.log(111111)
				console.log(this.info.user_id)
				console.log(this.info.checked)
				console.log(this.list)
			},
			submit() {
				getApp().globalData.seller = {
					name: this.info.name,
					user_id : this.info.user_id
				}
				console.log(getApp().globalData.seller)
				uni.navigateBack({
					delta: 1
				})
			},
			toLastPage(){
				if(this.page!= 1){
					this.page --
					this.getList()
				}
			},
			toNextPage(){
				const value = this.total/this.page_size
				let isNext = Math.ceil(value)
				console.log(isNext)
				if(this.page < isNext){
					this.page ++
					this.getList()
				}
			},
			handleKeyword(e) {
				this.keyword = e.target.value;
			},
			search() {
				this.getList();
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	position: relative;
	width: 690rpx;
	height: 92vh;
	margin: 0 auto;
	background: #ffffff;
	.list{
		width: 690rpx;
		margin: 0 auto;
		.input_wrap {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			width: 690rpx;
			height: 72rpx;
			padding: 0 30rpx;
			background: #F8F8F8;
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
				color: #AAAAAA;
			}
		}
		
	}
	.item_list{
		height: 1080rpx;
		overflow: scroll;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 690rpx;
			height: 100rpx;
			margin: 0 auto;
			padding: 0 24rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			border-bottom: 2rpx solid #f5f5f5;
			box-sizing: border-box;
			.radio{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 36rpx;
				height: 36rpx;
				transform: scale(.8);
			}
		}
	}
	.btn {
		position: absolute;
		bottom: 40rpx;
		display: flex;
		justify-content: space-between;
		width: 690rpx;
		.cancle{
			width: 160rpx;
			height: 80rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
			line-height: 80rpx;
			text-align: center;
			background: #FFFFFF;
			border-radius: 4rpx;
			border: 2rpx solid rgba(153, 153, 153, .3);
			box-sizing: border-box;
		}
		.sub {
			width: 506rpx;
			height: 80rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
			background: #3D82FF;
			border-radius: 4rpx;
		}
	}
	.pageing{
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: absolute;
		width: 690rpx;
		bottom: 260rpx;
		.page_up{
			display:flex;
			align-items: center;
			justify-content: center;
			width: 214rpx;
			height: 64rpx;
			background: #F1F6FB;
			border-radius: 32rpx;
			.up_text{
				height: 36rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #8189B0;
				line-height: 36rpx;
			}
		}
		.page_down{
			display:flex;
			align-items: center;
			justify-content: center;
			width: 214rpx;
			height: 64rpx;
			background: #F1F6FB;
			border-radius: 32rpx;
			.down_text{
				height: 36rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #8189B0;
				line-height: 36rpx;
			}
		}
		.page_num{
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			line-height: 32rpx;
		}
	}

}

</style>
