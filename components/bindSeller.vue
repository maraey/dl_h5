<template>
	<view class="bindAgency">
<!-- 		<view class="bindAgency_screen">
			<view class="bindAgency_screen_item" :class="[role==='agency'?'select':'']"  @click="selectRole('agency')">{{$t('agent')}}</view>
			<view class="bindAgency_screen_item" :class="[role==='employee'?'select':'']"  @click="selectRole('employee')">{{$t('staff')}}</view>
		</view> -->
		<view class="input_box">
			<image class="image" src="../static/search_bar.png"></image>
			<input class="input" type="text" :value="keyword" @input="handleKeyword" placeholder-class="phcolor" :placeholder="$t('please-enter-a-keyword')"  />
		</view>
		 <view class="list">
			<radio-group @change="handleSeller" >
				<view class="item" v-for="item in sellerArr" :key="item.seller_id">
					<text class="name">{{item.name}}</text>
					<view class="radio">
						<radio color="#3D82FF" :value="String(item.seller_id)"></radio>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="bottom">
			<!-- <pagination bindnewPage="handlePage" v-if="total>20" :total="total" :pageSize="pageSize"></pagination> -->
			<view class="btn">
				<view class="cancel" @click="cancle">{{$t('cancle')}}</view>
				<view class="sub" @click="sub">{{$t('confirm')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name:"bindSeller",
		data() {
			return {
				total:0,
				page:1,
				pageSize:20,
				selected:'',
				name: '',
				list: [],
				role:'agency',
				seller_id: '',
				keyword: '',
			};
		},
		props: {
			sellerArr: {
				type: Array,
			},
		},
		mounted() {
			console.log(this.sellerArr)
		},
		methods: {
			sub(){
			  this.$emit('selected',this.seller_id)
			  this.$emit('cancle')
			},
			cancle(){
			  this.$emit('cancle')
			},
			selectRole(e){
				this.role = e
				console.log(e)
			},
			handleSeller(e) {
				this.seller_id = e.detail.value
				console.log(this.seller_id)
			},
			handleKeyword(e) {
				this.keyword = e.detail.value
				console.log(this.keyword)
				this.$emit('search',this.keyword)
			}
		}
	}
</script>

<style lang="scss" scoped>
.bindAgency{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100vh;
	background-color: #fff;
	z-index: 2;
	.bindAgency_screen{
		display: flex;
		justify-content: space-around;
		width: 750rpx;
		height: 88rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
		background: #FFFFFF;
		.bindAgency_screen_item{
			display: flex;
			align-items: center;
			height: 88rpx;
			box-sizing: border-box;
		}
		.select{
			font-weight: 500;
			color: #3D82FF;
			border-bottom: 4rpx solid #3D82FF;
		}
	}
	.input_box{
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 72rpx;
		margin: 0 auto;
		margin-top: 24rpx;
		padding: 0 30rpx;
		font-size: 22rpx;
		background: #F8F8F8;
		border-radius: 4rpx;
		box-sizing: border-box;
		.image{
			width: 28rpx;
			height: 28rpx;
			margin-right: 22rpx;
		}
		.input{
			width: 570rpx;
		}
	}
	.list{
		width: 690rpx;
		height: calc(100vh - 400rpx);
		margin: 0 auto;
		overflow: scroll;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 690rpx;
			height: 100rpx;
			padding-left: 24rpx;
			border-bottom: 2rpx solid #f5f5f5;
			box-sizing: border-box;
			.name{
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
			.radio{
				display: flex;
				align-items: center;
				transform: scale(.75);
			}
		}
	}
	.bottom{
		position: fixed;
		bottom: 38rpx;
		left: 30rpx;
		width: 690rpx;
		.btn{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 690rpx;
			margin-top: 30rpx;
			.cancel{
				width: 160rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
				background: #FFFFFF;
				border-radius: 4rpx;
				border: 2rpx solid rgba(153, 153, 153, .3);
				box-sizing: border-box;
			}
			.sub{
				width: 506rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 26rpx;
				font-weight: 500;
				color: #FFFFFF;
				background: #3D82FF;
				border-radius: 4rpx;
			}
		}
	}
}
</style>