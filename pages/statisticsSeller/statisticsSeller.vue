<template>
	<view class="content">
		<view class="date_box">
			<view class="time_box">
				<view class="time">{{ $t('cycle') }}：2022-09-01至2022-09-30</view>
				<view class="time_select" @click="remarks">
					<view class="time">{{ $t('select-time') }}</view>
					<image class="image" src="../../static/screen.png"></image>
				</view>
			</view>
		</view>
		<view class="statistics">
			<view class="title">
				<text>{{ $t('merchant-total-revenue') }}</text>
				<text class="text">(元)</text>
			</view>
			<view class="amount">¥999999999.99</view>
			<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
		</view>
		<view class="device">
			<view class="title">
				<view class="blue_box"></view>
				<view class="text">{{ $t('charge.battery') }}</view>
			</view>
			<view class="line"></view>
			<view class="list">
				<view class="item">
					<view class="item_title">{{ $t('number-of-orders') }}</view>
					<view class="item_text">6次</view>
				</view>
				<view class="item">
					<view class="item_title">{{ $t('total-amount') }}</view>
					<view class="item_text">32.00元</view>
				</view>
				<view class="item">
					<view class="item_title">{{ $t('total-refund') }}</view>
					<view class="item_text">99.00元</view>
				</view>
				<view class="item">
					<view class="item_title">{{ $t('received-amount') }}</view>
					<view class="item_text">32.00元</view>
				</view>
			</view>
		</view>
		<view class="date_popup" v-if="showRemarkPopup" @click.stop="cancle">
			<view class="date_popup_box" @click.stop="stop">
				<view class="title">{{ $t('please-select-a-period') }}</view>
				<view class="text">
					<view class="data_picker_wrap">
						<image src="../../static/data_picker.png"></image>
						<picker mode="date" fields="day" :value="start"><view class="placeholder">{{ $t('please-select-a-start-time') }}</view></picker>
					</view>
					<view class="data_picker_wrap">
						<image src="../../static/data_picker.png"></image>
						<picker mode="date" fields="day" :value="end"><view class="placeholder">{{ $t('please-select-an-end-time') }}</view></picker>
					</view>
				</view>
				<view class="btn_box" @click.stop="stop">
					<view class="btn" @click="cancle">{{ $t('cancle') }}</view>
					<view class="line"></view>
					<view class="btn confirm">{{ $t('submit') }}</view>
				</view>
			</view>
		</view>
		<!-- <button @click="changeOption">更新数据</button> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			showRemarkPopup: false,
			start: '',
			end: '',
			option: {
				tooltip: {},
				grid: {
					top: '3%',
					left: '4%',
					right: '6%',
					bottom: '8%',
					containLabel: true
				},
				xAxis: {
					data: ['2022/09/01', '2022/09/02', '2022/09/03', '2022/09/04', '2022/09/05', '2022/09/06'],
					type: 'category',
					axisLabel: {
						show: true,
						textStyle: {
							color: '#999999'
						},
						margin: 16
					},
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#999999'
						}
					}
				},
				series: [
					{
						name: this.$t('sales'),
						symbol: 'none',
						type: 'line',
						data: [5, 20, 36, 10, 10, 20],
						smooth: true,
						areaStyle: {
							//显示区域颜色---渐变效果
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 1,
										color: 'rgba(177,204,255,0)' // 110% 处的颜色
									},
									{
										offset: 0,
										color: 'rgba(94,184,255,0.2)' // 0% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						},
						itemStyle: {
							color: '#5B8FF9', //改变折线点的颜色
							lineStyle: {
								color: '#5B8FF9' //改变折线颜色
							}
						}
					}
				]
			}
		};
	},
	onLoad() {},
	methods: {
		changeOption() {
			const data = this.option.series[0].data;
			// 随机更新示例数据
			data.forEach((item, index) => {
				data.splice(index, 1, Math.random() * 40);
			});
		},
		onViewClick(options) {
			console.log(options);
		},
		remarks() {
			this.showRemarkPopup = true;
		},
		cancle() {
			this.showRemarkPopup = false;
		},
		stop() {}
	}
};
</script>

<script module="echarts" lang="renderjs">
let myChart
export default {
	mounted() {
		if (typeof window.echarts === 'function') {
			this.initEcharts()
		} else {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
			script.src = 'static/echarts.js'
			script.onload = this.initEcharts.bind(this)
			document.head.appendChild(script)
		}
	},
	methods: {
		initEcharts() {
			myChart = echarts.init(document.getElementById('echarts'))
			// 观测更新的数据在 view 层可以直接访问到
			myChart.setOption(this.option)
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			myChart.setOption(newValue)
		},
		onClick(event, ownerInstance) {
			// 调用 service 层的方法
			ownerInstance.callMethod('onViewClick', {
				test: 'test'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	width: 100vw;
	height: 100vh;
	background: #f4f5f5;
	overflow: scroll;
	.statistics {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: 750rpx;
		height: 530rpx;
		background: #ffffff;
		box-sizing: border-box;
		.echarts {
			width: 100%;
			height: 175px;
		}
		.title {
			margin-top: 30rpx;
			margin-left: 64rpx;
			height: 42rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #333333;
			line-height: 42rpx;
			.text {
				height: 34rpx;
				margin-left: 16rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				line-height: 34rpx;
			}
		}
		.amount {
			height: 48rpx;
			margin: 16rpx 0 30rpx 64rpx;
			font-size: 40rpx;
			font-weight: 500;
			color: #333333;
			line-height: 48rpx;
		}
	}

	.date_box {
		margin-bottom: 28rpx;
		width: 100vw;
		height: 88rpx;
		background: #ffffff;
		.time_box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 690rpx;
			height: 88rpx;
			margin: 0 auto;
			.time {
				height: 34rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				line-height: 34rpx;
			}
			.time_select {
				display: flex;
				align-items: center;
				.image {
					width: 22rpx;
					height: 26rpx;
					margin-left: 12rpx;
				}
			}
		}
	}
	.device {
		margin: 30rpx auto;
		width: 750rpx;
		height: 234rpx;
		padding: 30rpx;
		background: #ffffff;
		box-sizing: border-box;
		.title {
			display: flex;
			align-items: center;
			.blue_box {
				width: 8rpx;
				height: 32rpx;
				margin-right: 16rpx;
				background-color: #3D82FF;
			}
			.text {
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
				line-height: 40rpx;
			}
		}
		.line {
			width: 690rpx;
			height: 2rpx;
			margin: 24rpx 0;
			background: #f5f5f5;
		}
		.list {
			display: flex;
			justify-content: space-around;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				.item_title {
					height: 34rpx;
					margin-bottom: 16rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
					line-height: 34rpx;
				}
				.item_text {
					height: 34rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					line-height: 34rpx;
				}
			}
		}
	}
	.date_popup {
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
		.date_popup_box {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 622rpx;
			height: 384rpx;
			margin-bottom: 300rpx;
			background: #ffffff;
			border-radius: 8rpx;
			z-index: 3;
			.title {
				margin: 30rpx 0 24rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				line-height: 42rpx;
			}
			.text {
				.data_picker_wrap + .data_picker_wrap {
					margin-top: 30rpx;
				}
				.data_picker_wrap {
					display: flex;
					align-items: center;
					width: 558rpx;
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
			.btn_box {
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
				.line {
					height: 26rpx;
					border-left: 2rpx solid #f5f5f5;
				}
				.btn {
					width: 50%;
					height: 96rpx;
					line-height: 96rpx;
					text-align: center;
				}
				.confirm {
					font-weight: 500;
				}
			}
		}
	}
}
</style>
