<template>
	<view class="container">
		<scroll-view class="list" scroll-y="true">
			<view class="input_wrap">
				<image src="../../static/search_input.png"></image>
				<input type="text" placeholder-class="phcolor" @input="toSearch" :placeholder="$t('please-enter-your-membership-number')" />
			</view>
			<view class="item" v-for="(item,index) in list" :key="index" @click="toDetail">
				<view class="title">
					<text>{{item.nick}}</text>
				</view>
				<view class="info_box">
					<view class="title">{{$t('member-id')}}</view>
					<text class="text">: {{item.member_id}}</text>
				</view>
				<view class="button_box">
					<view class="check" @click="checkVip(item.uid)">
						<text>{{$t('vip-detail')}}</text>
					</view>
					<view class="delete" @click="deleteVip(item.uid)">
						<text>{{$t('remove-membership')}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<image class="add_image" src="../../static/add_seller_btn.png" @click="addSellerVip"></image>
	</view>
</template>

<script>
	import {specialList} from '../../utils/special/special'
	import {deleteVip} from '../../utils/seller/seller'
	let timer = null;
	export default {
		data() {
			return {
				page: 1,
				page_size: 10,
				list:[],
				keyword: '',
				uid:'',
				scrollTop: 0
			};
		},
		mounted() {
			this.getList()
		},
		methods: {
			toSearch(e) {
				this.keyword = e.target.value
				console.log(this.keyword);
				clearTimeout(timer);
				timer = setTimeout(() => {
					this.page = 1;
					this.getList();
					this.scrollTop = 0;
				}, 300);
			},
			toDetail() {

			},
			checkVip(e) {
				this.uid = e
				uni.navigateTo({
					url:`../checkVip/checkVip?uid=${this.uid}`
				})
			},
			addSellerVip() {
				 uni.navigateTo({
				 	url:'../addSellerVip/addSellerVip'
				 })
			},
			async getList() {
				const res = await specialList({
					page: this.page,
					page_size: this.page_size,
					keyword: this.keyword
				})
				console.log(res)
				this.list = res.data.list
			},
			async deleteVip(uid) {
				const res = await deleteVip({
					uid,
				})
				console.log(res)
				this.getList()
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
			height: 276rpx;
			margin: 30rpx 0;
			padding: 36rpx 32rpx 0 32rpx;
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
			.info_box{
				display: flex;
				height: 94rpx;
				align-items: center;
				border-bottom: 2rpx solid #F5F5F5;
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
			}
			.button_box {
				display: flex;
				flex-direction: row-reverse;
				margin-top: 16rpx;
				height: 100rpx;
				.delete {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 24rpx;
					width: 156rpx;
					height: 60rpx;
					border-radius: 8rpx;
					border: 2rpx solid #E9EAF0;
					text {
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
				}
				.check {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 156rpx;
					height: 60rpx;
					background: #3D82FF;
					border-radius: 8rpx;
					text {
						height: 36rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 36rpx;
					}
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
