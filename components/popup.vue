<template>
	<view class="popup" @click.stop="close">
		<view class="popup_box" @click.stop="stop">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"popup",
		data() {
			return {
				
			};
		},
		methods: {
			close() {
				this.$emit('close')
			},
			stop() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.popup{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  .popup_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 900rpx;
    padding-top: 34rpx;
    background-color: #fff;
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    box-sizing: border-box;
    z-index: 3;
  }
}

</style>