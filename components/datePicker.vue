<template>
	<view class="datePicker" @click="close" catchtouchmove="stop">
		<view class="box" @click="stop">
			<view class="title">{{title}}</view>
			<view class="input_box">
				<view class="input_wrap">
					<image class="image" src="/static/images/popup_date.png"></image>
					<picker >
						<view class="picker">
							<view class="phcolor" >请选择起始时间</view>
							<view >{{start}}</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="input_box">
				<view class="input_wrap">
					<image class="image" src="/static/images/popup_date.png"></image>
					<picker >
						<view class="picker">
							<view class="phcolor">请选择结束时间</view>
							<view >{{end}}</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="btns_box">
				<view class="btns">
					<view class="btn refuse" @click="close">取消</view>
					<view class="line"></view>
					<view class="btn confirm" @click="confirm">提交</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"datePicker",
		data() {
			return {
				start: '',
				end: '',
				dateMax: ''
			};
		},
		props:{
			title:{
			  type: String,
			}
		},
		methods: {
			close() {

					this.triggerEvent('close')
				  
		
			},
		}
	}
</script>

<style lang="scss" scoped>
.datePicker {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99999999999;
}

.datePicker .box {
  position: absolute;
  top: 340rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 622rpx;
  height: 420rpx;
  padding-top: 30rpx;
  background: #FFFFFF;
  border-radius: 8rpx;
  box-sizing: border-box;
}

.datePicker .box .title {
  height: 42rpx;
  margin-bottom: 28rpx;
  font-size: 30rpx;
  font-weight: 500;
  text-align: center;
  color: #333333;
  line-height: 42rpx;
}

.datePicker .box .input_box {
  width: 534rpx;
  height: 82rpx;
  margin: 0 auto;
  margin-bottom: 30rpx;
}

.datePicker .box .input_box .input_wrap {
  display: flex;
  align-items: center;
  width: 534rpx;
  height: 82rpx;
  padding: 0 24rpx;
  background: #F8F8F8;
  border-radius: 4rpx;
  box-sizing: border-box;
}

.datePicker .box .input_box .input_wrap .image {
  width: 34rpx;
  height: 34rpx;
  margin-right: 24rpx;
}

.datePicker .box .input_box .input_wrap .picker {
  width: 420rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #000000;
}
.datePicker .box .input_box .input_wrap .picker .phcolor{
  color: #AAA;
}
.datePicker .btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 622rpx;
  height: 94rpx;
  border-top: 2rpx solid #f5f5f5;
}

.datePicker .btns .btn {
  width: 310rpx;
  height: 94rpx;
  font-size: 30rpx;
  color: #333333;
  text-align: center;
  line-height: 94rpx;
}

.datePicker .btns .refuse {
  font-weight: 400;
}

.datePicker .btns .confirm {
  font-weight: 500;
}

.datePicker .btns .line {
  width: 2rpx;
  height: 26rpx;
  background: #F5F5F5;
}
</style>