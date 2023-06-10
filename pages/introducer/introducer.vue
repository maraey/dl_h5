<template>
	<view class="container">
		<scroll-view class="list" scroll-y="true" :scroll-top="scrollTop" @scrolltolower="scrolltolower">
			<view class="input_wrap">
				<image src="../../static/search_input.png"></image>
				<input type="text" placeholder-class="phcolor" v-model="name" @input="toSearch" :placeholder="$t('please-enter-a-keyword')"/>
			</view>
			<view class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item.user_id)">
				<view class="title">
					<text>{{item.name}}</text>
				</view>
				<view class="info">
					<view class="title">{{$t('commission-ratio')}}</view>
					<text class="text">: {{item.rate}}%</text>
				</view>
				<view class="info_box">
					<image src="../../static/more12.png"></image>
				</view>
				<view class="info_box">
					<view class="title">{{$t('phone-num-for-login')}}</view>
					<text class="text">: {{item.phone}}</text>
				</view>
			</view>
		</scroll-view>
		<image class="add_image" src="../../static/add_seller_btn.png" @click="addIntroducer"></image>
	</view>
</template>

<script>
	import {userList} from '../../utils/mine/mine.js'
	let timer = null
	export default {
		data() {
			return {
				list:[],
				page:1,
				page_size:10,
				role:'introducer',
				total:0,
				name:"",
				scrollTop:0
			};
		},
		onShow() {
			this.getData()
		},
		methods: {
			// 输入搜索未做
			toSearch(e){
				this.name = e.target.value
				console.log(this.name);
				clearTimeout(timer)
				timer = setTimeout(()=>{
					this.page=1
					this.getData()
					this.scrollTop = 0
				},300)
			},
			async getData(){
				const {page,page_size,role,list,name} = this
				const res = await userList({
					page,page_size,role,name
				})
				if(page==1){
					this.list = res.data.list
				}else{
					this.list.push(...res.data.list)
				}
				this.total = res.data.total
			},
			toDetail(id) {
				uni.navigateTo({
					url:'../introducerDetail/introducerDetail?id='+id
				})
			},
			addIntroducer() {
				uni.navigateTo({
					url:'../addIntroducer/addIntroducer'
				})
			},
			scrolltolower(){
				console.log(1);
				if(this.list.length<this.total){
					this.page+=1
					this.getData()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	position: relative;
	width: 100vw;
	height: 100vh;
	background: #f4f5f5;
	overflow: scroll;
	.list{
		width: 690rpx;
		height: 100vh;
		margin: 0 auto;
		.input_wrap {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			width: 690rpx;
			height: 72rpx;
			padding: 0 30rpx;
			background: #ffffff;
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
		.item{
			width: 690rpx;
			height: 236rpx;
			margin: 30rpx 0;
			padding: 36rpx 32rpx;
			background: #ffffff;
			border-radius: 8rpx;
			box-sizing: border-box;
			.title {
				display: flex;
				align-items: center;
				text {
					height: 44rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					line-height: 44rpx;
				}
			}
			.info{
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				.title{
					height: 40rpx;
					margin-right: 28rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #999999;
					line-height: 40rpx;
				}
				.text{
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 40rpx;
				}
				image {
					width: 12rpx;
					height: 24rpx;
					margin-left: 616rpx;
				}
			}
			.info_box{
				display: flex;
				align-items: center;
				.title{
					height: 40rpx;
					margin-right: 28rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #999999;
					line-height: 40rpx;
				}
				.text{
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 40rpx;
				}
				image {
					width: 12rpx;
					height: 24rpx;
					margin-left: 616rpx;
				}
			}
		}
	}
	.add_image{
		position: absolute;
		right: 22rpx;
		bottom: 278rpx;
		width: 106rpx;
		height: 106rpx;
	}
}

</style>
