<template>
	<view class="container">
		<view class="list">
			<view class="input_wrap">
				<image src="../../static/search_input.png"></image>
				<input type="text" placeholder-class="phcolor" :placeholder="$t('please-enter-a-keyword')" />
			</view>
		</view>
		<view class="item_list" >
			<checkbox-group @change="selectSeller(list)">
				<view class="item" v-for="(item,index) in list" :key="item.user_id" @click="selectVip(item,index)">
					<text>{{item.name.en}}</text>
					<view class="radio"  >
						<checkbox color="#3D82FF" :checked="item.checked"/>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="btn">
			<view class="cancle" @click="cancle">{{$t('cancle')}}</view>
			<view class="sub" @click="submit">{{$t('confirm')}}</view>
		</view>
	</view>
</template>

<script>
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
				selectedList:[],
			};
		},
		onLoad(option) {
			console.log(option)

		},
		mounted() {
				this.getShopList()
		},
		methods: {
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
			selectVip(e,index) {
				this.info.name = e.name
				this.info.user_id = e.id
				this.info.checked= !this.info.checked
				this.list[index].checked = !this.list[index].checked
				console.log(e,index)
				console.log(111111)
				console.log(this.info.user_id)
				console.log(this.info.checked)
				console.log(this.list)
			},
			selectSeller(e){
				console.log(e)
			},
			submit() {
				const selectedListOld = this.list
				let selectedList = []
				selectedListOld.forEach(item=> {
					if(item.checked){
						selectedList.push(item)
					}
				})
				console.log(selectedList)
				uni.redirectTo({
					url: `/pages/addSellerVip/addSellerVip?List=${JSON.stringify(selectedList)}`
				})
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

}

</style>
