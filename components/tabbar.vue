<template>
	<view class="tabbar">
	  <view class="item" @click="toPage('order')" >
		<image class="image" src="../static/tab_order_s.png" v-if="selected=='order'"></image>
		<image class="image" src="../static/tab_order.png" v-if="selected!='order'"></image>
		<text :class="[selected=='order'?'text':'text1']">订单</text>
	  </view>
	  <view class="item" @click="toPage('statistics')" v-if="role!='seller'&&role!='introducer'">
		<image class="image" src="../static/tab_statistics_s.png" v-if="selected=='statistics'"></image>
		<image class="image" src="../static/tab_statistics.png" v-if="selected!='statistics'"></image>
		<text :class="[selected=='statistics'?'text':'text1']">统计</text>
	  </view>
	  <view class="item" >
		<image class="image" src="../static/index.png" v-if="selected=='index'"></image>
		<image class="image" src="../static/index.png" v-if="selected!='index'"></image>
		<text :class="[selected=='index'?'text':'text1']"></text>
	  </view>
	  <view class="item" @click="toPage('seller')" >
		<image class="image" src="../static/tab_seller_s.png" v-if="selected=='seller'"></image>
		<image class="image" src="../static/tab_seller.png" v-if="selected!='seller'"></image>
		<text :class="[selected=='seller'?'text':'text1']">门店</text>
	  </view>
	  <view class="item" @click="toPage('mine')">
		<image class="image" src="../static/tab_my_s.png" v-if="selected=='mine'"></image>
		<image class="image" src="../static/tab_my.png" v-if="selected!='mine'"></image>
		<text :class="[selected=='mine'?'text':'text1']">我的</text>
	  </view>
	  <view class="index" @click="toPage('index')">
		<image src="../static/index.png" class="index_img"></image>
	  </view>
	</view>


</template>

<script>
	export default {
		name:"tabbar",
		data() {
			return {
				role:''
			};
		},
		props: {
			selected: {
				type: String,
			},
		},
	  attached() {
		uni.getStorage({
		  key: 'dl_app_info',
		  success: (res)=> {
			  this.role = res.data.role
		  }
		})
	  },
	  methods: {
		toPage(e) {
			console.log(e)
			if(e == this.selected){
				return
			}
				// this.selected = e
			uni.redirectTo({
				url: `/pages/${e}/${e}`
			})
		}
	  }
	}
</script>

<style lang="scss" scoped>
.tabbar{
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 98rpx;
  padding: 8rpx 54rpx 8rpx 54rpx;
  margin-bottom: 6rpx;
  background-color: #fff;
  box-shadow: 0px -2px 2px 0px rgba(204, 204, 204, 0.3);
  box-sizing: border-box;
}
.tabbar .item{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tabbar .item .image{
  width: 44rpx;
  height: 44rpx;
  margin-bottom: 4rpx;
}
.tabbar .item .text{
  font-size: 24rpx;
  font-weight: 500;
  color: #3D82FF;
  line-height: 34rpx;
}
.tabbar .item .text1{
  font-size: 24rpx;
  font-weight: 400;
  color: #AAAAAA;
  line-height: 34rpx;
}

.tabbar .index{
  position: absolute;
  left: 42.5%;
  bottom: 26rpx;
  width: 100rpx;
  height: 100rpx;
  z-index: 99;
}

.index .index_img{
  width: 120rpx;
  height: 120rpx;
}
</style>