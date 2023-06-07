<template>
	<view class="container_tab">
		<view class="tab_item" v-for="(item, index) in tabList" :key="item.type" @click="selectType(item.type)">
			<view :class="type==item.type?'title title_s':'title'" >
				{{ item.title }}
			</view>
			<view :class="type==item.type?'line line_s':'line'">
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tab',
	data() {
		return {
			type:1
		};
	},
	props: {
		tabList: {
			type: [Object, Array],
			default: () => {
				return [];
			}
		}
	},
	methods:{
		selectType(type){
			this.type=type
			console.log(this.type)
			this.$emit('typeSelect',this.type)
		}
	}
};
</script>

<style lang="scss" scoped>
	.container_tab{
		display: flex;
		align-items: center;
		padding: 30rpx 30rpx 24rpx;
		box-sizing: border-box;
		.tab_item{
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			height: 60rpx;
			.title{
				height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
			}
			.title_s{
				height: 44rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: $global-color;
				line-height: 44rpx;
			}
			.line{
				width: 48rpx;
				height: 8rpx;
				margin-top: 10rpx;
				border-radius: 4rpx;
			}
			.line_s{
				margin-top: 8rpx;
				background: $global-color;
			}
		}
		.tab_item+.tab_item{
			margin-left: 40rpx;
		}
	}
</style>
