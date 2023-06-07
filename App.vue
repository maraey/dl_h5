<script>
import { version } from './utils/login/login';
import { config } from 'utils/request.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: async () => {
		console.log('App Show');
		const systemInfo = uni.getSystemInfoSync();
		const client = systemInfo.platform.toLowerCase();
		console.log(client);
		// const res = await version({
		// 	client: client
		// });
		// console.log(res);
		// uni.setStorage({
		// 	key: 'version_info',
		// 	data: JSON.stringify(res.data)
		// })
		// const ver = config.version;
		// if (res.data.update == 1 && ver != res.data.version) {
		// 	console.log(111);
		// 	const url = res.data.url
		// 	const lang = uni.getLocale();
		// 	let content = 'Version-Update'
		// 	console.log(lang);
		// 	if(lang=='zh-Hans'){
		// 		content='版本更新'
		// 	}
		// 	uni.showModal({
		// 		content: content,
		// 		success: res => {
		// 			if (res.confirm) {
		// 				plus.runtime.openURL(url)
		// 			}
		// 		}
		// 	});
		// }
		try {
			const value = uni.getStorageSync('dl_app_info');
			if (value) {
				const role = JSON.parse(value).role;
				getApp().globalData.userInfo = JSON.parse(value);
				console.log(role);
				if (role == 'seller') {
					uni.setTabBarItem({
						index: 2,
						visible: false
					});
				} else {
					uni.setTabBarItem({
						index: 2,
						visible: true
					});
				}
			}
		} catch (e) {
			// error
		}
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		userInfo: null,
		introducer: '',
		seller: '',
		pileBalance: '',
		pileTemporary: '',
		pileMonth: '',
		info: ''
	}
};
</script>

<style>
.global_color {
	color: #3D82FF;
}
.phcolor {
	width: 100%;
	font-size: 26rpx;
	font-weight: 400;
	color: #aaaaaa;
}
</style>
