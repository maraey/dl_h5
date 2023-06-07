<template>
	<view class="container1">
		<view class="tabbar">
			<view class="item" v-for="(item, index) in title" :key="index">
				<text class="text" @click="show">{{ item.title }}</text>
				<image src="../static/unselected.png"></image>
			</view>
		</view>
		<view class="popup_box" v-if="showtitle">
			<view class="popup_wrap">
				<template v-if="isShow">
					<view class="popup_title">数据选择</view>
					<view class="selected_list">
						<view class="selected_item">我的数据</view>
						<view class="selected_item">下级数据</view>
					</view>
				</template>
				<template v-if="!isShow">
					<view class="popup_title">商户名称</view>
					<view class="input_wrap"><input type="text" placeholder-class="phcolor" placeholder="请输入商户名称" /></view>
					<view class="popup_title">创建时间</view>
					<view class="data_picker_box">
						<view class="data_picker_wrap">
							<image src="../static/data_picker.png"></image>
							<picker mode="date" fields="day" :value="start" @change="bindstart">
								<view class="placeholder" v-if="!start">请选择起始时间</view>
								<view class="picker_date" v-if="start">{{ start }}</view>
							</picker>
						</view>
						<view class="data_picker_wrap">
							<image src="../static/data_picker.png"></image>
							<picker mode="date" fields="day" :value="end" @change="bindend">
								<view class="placeholder" v-if="!end">请选择结束时间</view>
								<view class="picker_date" v-if="end">{{ end }}</view>
							</picker>
						</view>
					</view>
				</template>
				<view class="popup_line"></view>
				<view class="btns">
					<view class="reset">重置</view>
					<view class="confirm">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showtitle: false,
			isShow: false,
			start: '',
			end: ''
		};
	},
	props: {
		title: {
			type: [Object, Array],
			default: () => {
				return [];
			}
		}
	},
	mounted() {},
	methods: {
		show() {
			this.showtitle = !this.showtitle;
		},
		bindstart(e) {
			this.start = e.detail.value;
		},
		bindend(e) {
			this.end = e.detail.value;
		}
	}
};
</script>

<style lang="scss" scoped>
.container1 {
	z-index: 3;
	.tabbar {
		display: flex;
		justify-content: space-around;
		width: 100vw;
		height: 88rpx;
		background: #ffffff;
		z-index: 3;
		.item {
			display: flex;
			align-items: center;
			.text {
				height: 36rpx;
				margin-right: 12rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #999999;
				line-height: 36rpx;
			}
			image {
				width: 20rpx;
				height: 20rpx;
			}
		}
	}
	.popup_box {
		position: fixed;
		top: 90rpx;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 3;
		.popup_wrap {
			width: 100vw;
			padding: 24rpx 30rpx;
			background: #ffffff;
			box-sizing: border-box;
			.popup_title {
				height: 42rpx;

				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			.selected_list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 30rpx;
				.selected_item {
					width: 25%;
					height: 62rpx;
					text-align: center;
					line-height: 62rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					background: #f8f8f8;
					border-radius: 4rpx;
				}
				.selected_item + .selected_item {
					margin-left: 16rpx;
				}
			}
			.popup_line {
				width: 690rpx;
				height: 2rpx;
				margin: 24rpx auto;
				background: #f5f5f5;
			}
			.btns {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.reset {
					width: 160rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #333333;
					background: #ffffff;
					border-radius: 4rpx;
					opacity: 0.3;
					border: 2rpx solid #999999;
					box-sizing: border-box;
				}
				.confirm {
					width: 506rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 26rpx;
					font-weight: 500;
					color: #ffffff;
					background: #3D82FF;
					border-radius: 4rpx;
				}
			}
			.input_wrap {
				display: flex;
				align-items: center;
				width: 690rpx;
				height: 74rpx;
				padding: 0 20rpx;
				margin: 16rpx auto 24rpx;
				background: #f8f8f8;
				border-radius: 4rpx;
				box-sizing: border-box;
				input {
					width: 650rpx;
				}
			}
			.data_picker_box {
				width: 690rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 16rpx;
				.data_picker_wrap {
					display: flex;
					align-items: center;
					width: 332rpx;
					height: 74rpx;
					padding: 0 24rpx;
					background: #f8f8f8;
					border-radius: 4rpx;
					box-sizing: border-box;
					image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 24rpx;
					}
					.placeholder {
						width: 226rpx;
						height: 34rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #aaaaaa;
						line-height: 34rpx;
					}
					.picker_date {
						width: 226rpx;
						height: 34rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #333333;
						line-height: 34rpx;
					}
				}
			}
		}
	}
}
</style>
