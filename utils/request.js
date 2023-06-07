const config = {
	baseUrl: 'http://cdb.chaohuo365.com/agent/',
	ocode: '',
	headerKey: 'zdhx%&$^*app',
	qrcodeUrl: 'https://qrcode.w-dian.cn',
	version:120
}
const getLogin = () => {
	// uni.getStorage({
	// 	key: 'dl_app_info',
	// 	success: res => {
	// 		console.log(res.data);
	// 		console.log(JSON.parse(res.data));
	// 		console.log(JSON.parse(res.data).token);
	// 		const token =JSON.parse(res.data).token 
	// 		return token
	// 	},
	// 	fail: () => {
	// 		return null
	// 	}
	// });
	try {
		const value = uni.getStorageSync('dl_app_info');
		if (value) {
			return JSON.parse(value).token 
		}
	} catch (e) {
		// error
	}
}
const request = (obj) => {
	const token = getLogin()
	let lang  = uni.getLocale()
	if(lang == 'zh-Hans') {
		 lang = 'zh-cn'
	}else {
		lang = 'en-us'
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${config.baseUrl}${obj.url}`, //仅为示例，并非真实接口地址。
			header: {
				'token': token
			},
			data: obj.data,
			method: obj.method,
			success: (res) => {
				const code = res.data.code
				if (code == 1) {
					resolve(res.data)
				} else if (code == 0 || !code) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 1000
					});
					reject(res)
				} else if (code == 401 || code == 403) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 1000
					});
					if (token) {
						uni.removeStorage({
							key: 'dl_app_info',
							success: (res) => {

							}
						})
					}
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000)
					reject(res)

				} else {
					resolve(res.data)
				}

			},
			fail: err => {
				console.log(err);
			}
		});
	})
}
const uploadImage = (img,type) => {
  const token = getLogin()
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      filePath: img,
	  formData:{
		  type: type
	  },
      name: 'img_file',
      url: config.baseUrl + 'seller/fileUpload',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': token,
        'ocode': config.ocode,
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

module.exports = {
	request,
	config,
	uploadImage,
}
