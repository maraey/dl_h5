<template>
	<view class="container">
		<view class="radio" @click="selectLang('zh-Hans')">
			<text>中文</text>
			<image src="../../static/unselected(1).png" v-if="lang != 'zh-Hans'"></image>
			<image src="../../static/selected1.png" v-if="lang == 'zh-Hans'"></image>
			<!-- <image src="../../static/selected1.png"></image> -->
		</view>
		<view class="radio" @click="selectLang('en')">
			<text>English</text>
			<image src="../../static/unselected(1).png" v-if="lang != 'en'"></image>
			<image src="../../static/selected1.png" v-if="lang == 'en'"></image>
		</view>
	</view>
</template>

<script>
import { setlang } from '../../utils/login/login';
export default {
	data() {
		return {
			lang: 'en',
			systemLocale: '',
			applicationLocale: ''
		};
	},
	onLoad() {
		let systemInfo = uni.getSystemInfoSync();
		this.systemLocale = systemInfo.language;
		this.applicationLocale = uni.getLocale();
		this.lang = uni.getLocale();
		this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
		uni.onLocaleChange(e => {
			this.applicationLocale = e.locale;
			this.lang = e.locale;
		});
		console.log(this.lang);
	},
	methods: {
		selectLang(lang) {
			this.lang = lang;
			this.onLocaleChange(lang);
		},
		onLocaleChange(lang) {
			if (this.isAndroid) {
				uni.showModal({
					content: this.$t('index.language-change-confirm'),
					confirmText: this.$t('sure'),
					cancelText: this.$t('cancel'),
					success: res => {
						if (res.confirm) {
							let lng = 'en-us';
							if (lang == 'zh-Hans') {
								lng = 'zh-cn';
							}
							setlang({
								lang:lng
							})
							uni.setLocale(lang);
						} else {
							this.lang = this.applicationLocale;
						}
					}
				});
			} else {
				uni.setLocale(lang);
				this.$i18n.locale = lang;
				let lng = 'en-us';
				if (lang == 'zh-Hans') {
					lng = 'zh-cn';
				}
				setlang({
					lang:lng
				})
				plus.runtime.restart();
				uni.navigateBack();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.radio {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		height: 100rpx;
		margin: 0 auto;
		border-bottom: 2rpx solid #f8f8f8;
		image {
			width: 36rpx;
			height: 36rpx;
		}
	}
}
</style>
