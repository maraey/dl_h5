
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/addAgency/addAgency","pages/addwithdrawal/addwithdrawal","pages/applyWithdrawal/applyWithdrawal","pages/forgetPsw/forgetPsw","pages/order/order","pages/statistics/statistics","pages/seller/seller","pages/mine/mine","pages/change_lang/change_lang","pages/orderBenefitDetail/orderBenefitDetail","pages/orderBenefit/orderBenefit","pages/addEmployee/addEmployee","pages/addSellerManager/addSellerManager","pages/addSellerVip/addSellerVip","pages/endOrder/endOrder","pages/agency/agency","pages/agencyDetail/agencyDetail","pages/sellerAccount/sellerAccount","pages/acountDetail/acountDetail","pages/sellerVip/sellerVip","pages/checkVip/checkVip","pages/editShop/editShop","pages/business/business","pages/businessDetail/businessDetail","pages/password/password","pages/replenish/replenish","pages/replenishRecord/replenishRecord","pages/sellerDetail/sellerDetail","pages/depositRecord/depositRecord","pages/batteryDevice/batteryDevice","pages/orderDetail/orderDetail","pages/batteryDeviceDetail/batteryDeviceDetail","pages/addSeller/addSeller","pages/selectSeller/selectSeller","pages/statisticsSeller/statisticsSeller","pages/orderIncome/orderIncome","pages/selectSellerVip/selectSellerVip","pages/openMap/openMap","pages/webview/webview","pages/aboutUs/aboutUs","pages/register/register","pages/openPrivacy/openPrivacy"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"%index.title%","navigationBarBackgroundColor":"#ffffff","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#AAAAAA","selectedColor":"#333333","borderStyle":"rgba(204,204,204,0.3000)","backgroundColor":"#FFFFFF","height":"50","iconWidth":"20","spacing":"3","fontSize":"12","list":[{"pagePath":"pages/index/index","iconPath":"static/tab_index.png","selectedIconPath":"static/tab_index_s.png","text":"%tabbar.index%"},{"pagePath":"pages/order/order","iconPath":"static/tab_order.png","selectedIconPath":"static/tab_order_s.png","text":"%tabbar.order%"},{"pagePath":"pages/statistics/statistics","iconPath":"static/tab_statistics.png","selectedIconPath":"static/tab_statistics_s.png","text":"%tabbar.statistics%"},{"pagePath":"pages/seller/seller","iconPath":"static/tab_seller.png","selectedIconPath":"static/tab_seller_s.png","text":"%tabbar.seller%"},{"pagePath":"pages/mine/mine","iconPath":"static/tab_my.png","selectedIconPath":"static/tab_my_s.png","text":"%tabbar.mine%"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"XINGHAI","compilerVersion":"3.7.9","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"locale":"","fallbackLocale":"zh-Hans","locales":{"en":{"locale.auto":"System","locale.en":"English","locale.zh-hans":"简体中文","locale.zh-hant":"繁体中文","locale.ja":"日语","Version-Update":"Version Update","index.title":"XINGHAI","index.home":"Home","index.component":"Component","index.api":"API","index.schema":"Schema","index.demo":"uni-app globalization","index.demo-description":"Include uni-framework, manifest.json, pages.json, tabbar, Page, Component, API, Schema","index.detail":"Detail","index.language":"Language","index.language-info":"Settings","index.system-language":"System language","index.application-language":"Application language","index.language-change-confirm":"Applying this setting will restart the app","api.message":"Message","schema.name":"Name","schemas.name":"Account Name","input-the-name":"Please input the name","schema.add":"Add","schema.add-success":"Add success","tabbar.index":"Home","tabbar.order":"Order","cancel-the-binding":"Delete","tabbar.statistics":"Statistics","tabbar.seller":"Store","tabbar.mine":"Account","income.today":"Today's Income","income.yesterday":"Yesterday's Income","income.total":"Total Income","income.month":"Current Month","income.month-l":"Last Month","yuan":"$","income.order":"Order Details","withdraw.apply":"Withdrawal Request","add.seller":"Add Merchant Store","add.agency":"Add Partner","add.staff":"Add Sales Representative","add.seller-account":"Add Merchant's Account","charge.battery":"Power Bank Device","add.seller-vip":"Add VIP User","phone":"Phone","password":"Password","forget-password":"Forget Password","login":"Login","please-enter-phone":"Please enter the phone number","please-enter-password":"Please enter password","code":"Verification Code","get-code":"Get code","please-enter-code":"Please input the verification code","new-password":"New Password","please-enter-new-password":"Please enter the new password","retype-new-password":"Retype new password","submit":"Submit","please-enter-captcha":"Please enter the captcha","incorrect-input":"Incorrect input","click-picture-refresh":"Click picture refresh","cancle":"Cancel","confirm":"Confirm","hello":"Hello ","logout":"Logout","accumulated-commission":"Total Commission","total-refund-amount":"Total refund amount","withdrawn-amount":"Amount Withdrawn","withdrawable-amount":"Current Balance","withdrawal-frozen-amount":"Pending Approval","role-settings":"Role Settings","agent":"Partner","seller":"Merchant","vip-user":"VIP User","staff":"Sales Representative","more":"More","change-password":"Change Password","withdrawals-record":"Withdrawal History","power-bank-supplement":"power bank supplement","language-switch":"Change Language","modify-withdrawal-Information":"Edit Bank Details","add-withdrawal-Information":"Bank Details","end-order":"End","bank-card":"Bank Account Number or Paynow Number","input-bank-card":"Please input Account No. or Paynow No.","bank-name":"Bank Name","input-bank-name":"Please input Bank Name","seller-detail":"Merchant Detail","vip-detail":"VIP detail","edit_store":"Edit store","supplement-records":"Supplement records","store-detail":"Merchant Detail","input-the-order-num":"Please input the Order Number","order-num":"Order Number","order-amount":"Order amount","status":"Status","percentage":"Percentage","charging-time":"Charging time","order-type":"Order type","device-number":"Device Number","please-input-the-withdrawal-amount":"Withdrawal Amount","account-name":"Account Name","account-number":"Account Number","withdraw-money":"Withdraw Money","verification-code":"Verification Code","input-verification-code":"Please input the verification code","save":"Save","basic-information":"Basic Information","franchise-type":"Partner Type","purchase":"Purchase","investor":"Consign","user-name":"Name","user-names":"Merchant Name","input-user-name":"Please input the name","phone-num-for-login":"Login ID (Mobile Number)","password-for-login":"Login Password","commission-ratio":"Commission %","please-input-the-commission-ratio":"Please input the commission ratio","permission-settings":"Permission Setting","allow-adding-subordinate-agents":"allow adding subordinate agents","adding-subordinate-agents":"adding subordinate agents","pop-up-battery":"Pop up Power bank","prohibited-to-use":"Terminate User","store-grade":"Store grade","please-select-the-store-grade":"Please select the store grade","seller-type":"Merchant type","seller-level":"Merchant level","seller-name":"Merchant Name","store-address":"Merchant Address","please-input-the-seller-name":"Please input the merchant name","select-industry":"Select industry","industry":"Industry","please-select-your-industry":"Please select your industry","region":"Region","latitude-and-longitude":"Map Location","please-select-your-latitude-and-longitude":"Please select your latitude and longitude","map-search":"Map Search","address-details":"Address","please-input-your-address-details":"Please input your address details","select-the-seller":"Select the merchant","clear":"Clear","select":"Select","billing-information":"Billing Information","charging-strategy-of-power-bank":"Power Bank Rental Fee","please-input-the-charging-strategy":"Please input the charging strategy","other-information":"Other Information","merchant-phone":"Contact Number","please-input-the-merchant-phone":"Please input the contact number","open-hours":"Operating Hours","store-picture":"Banner","picture":"Picture","video":"Video","store-logo":"Merchant Logo","disabled":"Disabled","charging-unit":"Charging Unit","hour":"Hour","half-hour":"half hour","billing-amount":"Billing Amount","free-minutes":"Free Minutes","minutes":"Minutes","hours":"hours","highest-consumption":"Maximum Charges","now-time":"Time","total":"Total","copy":"Copy","rental-time":"Rental Period","rental-store":"Merchant Name","to":" to ","rental-information":"Rental Information","charge-standard":"Charge Standard","daily-max-bill-amount":"Daily max bill amount","rental-deposit":"Rental Deposit","battery-id":"Power bank ID","device-id":"Device ID","fee-information":"fee information","payment-amount":"Payment Amount","order-status":"Order Status","payment-time":"Payment Time","return-information":"Return information","return-store":"Return Merchant","return-slot":"Return Slot","return-time":"Return Time","commission-details":"Commission Details","user-info":"User Info","users-nickname":"User's nickname","member-id":"Member ID","order-info":"Order Info","consumption-amount":"consumption amount","use-time":"Use Time","deducted-amount":"Deducted Amount","remark":"Remark","add-remark":"Add remark","return-or-not":"Return or not","NAV":"NAV","DEL":"DEL","statistics":"Statistics","belong-staff":"Sales Representative","order-quantity":"Order Quantity","total-amount":"Total Amount","total-refund":"Total Refund","received-amount":"Received Amount","discount-method":"discount method","free":"Free","discount":"Discount","free-rules-of-power-bank":"Free rules of power bank","times":"times","duration":"Duration","select-store":"Merchant Store","find-member":"Find Member","search":"Search","add":"Add","free-rules":"Free rules","free-times-of-power-bank":"free times of power bank","time-earned":"Grace Period","online-device":"Online Device","total-s":"Total","check-the-details":"Check the details","bind-agent":"Add Partner","device-revenue":"Device revenue","slot-management":"Slot Management","sim-card":"SIM Card","added-time":"Added On","working-time":"Working Time","Qr-code":"QR Code","year":"year","month":"month","pop-up-all-power-bank":"Pop up All","refresh-battery":"Refresh Status","reboot":"Reboot Machine","set-as-fault":"Set as fault","set-volume":"Set volume","slot":"Slot","pending-review":"Pending Review","pop-up":"Pop up","battery-power":"Power bank Level","store-name":"Store name","withdrawn":"Withdrawn","account-balance":"Account balance","handling-fee":"Handling fee","transaction-number":"Transaction number","consignee-name":"Consignee name","mobile-phone":"Mobile phone","address":"Address","supplements-quantity":"Supplements quantity","apply-for-supplement":"Apply for supplement","check-supplement-records":"Check supplement records","Are-you-sure-you-want-to-log-out":"Are you sure you want to log out","Are-you-sure-to-submit":"Are you sure to submit","Are-you-sure-to-delete":"Are you sure to delete","normal":"Normal","error":"Error","edit-seller-account":"Edit merchant account","online":"Online","offline":"Offline","unbound":"Unlinked","fault":"Faulty","billing-time":"Billing Time","replenish-power-bank":"Replenish","must-be-an-integer-and-less-than-the-commission-ratio":"Must be an integer, and less than the commission ratio (","of-the-superior-division":") of the superior division","depreciation-rate":"depreciation rate","please-depreciation-rate":"Please input the depreciation rate","the-actual-ratio-of-the-merchant-is-commission-percentage-depreciation-rate":"the actual ratio of the merchant is: commission percentage * depreciation rate, such as 70*80=56%","store-list-display-ratio":"store list display ratio","please-store-list-display-ratio":"Please input the store list display ratio","referrer":"referrer","please-input":"Please input","if-there-is-a-referrer-please-fill-in":"if there is a referrer, please fill in","add-the-referrer":"Add the referrer","it-is-not-free":"How many minutes are free for users before each rental. Fill in 0 or leave it blank to indicate that it is not free.","maximum-daily-consumption-limit":"The maximum daily consumption limit, if the exceeding time is calculated according to this amount, fill in 0 or empty to indicate no consumption limit.","share-ratio":"share ratio","please-enter-the-sharing-ratio-for-the-referrer":"Please enter the sharing ratio for the referrer","depreciation-ratio":"Depreciation ratio","please-enter-a-depreciation-ratio":"Please enter a depreciation ratio","show-order-amount":"Show order amount","hidden-daily-revenue":"Hidden daily revenue","please-enter-a-keyword":"Please enter a keyword","buy":"Buy","reset":"Reset","allow":"Allow","not-allowed":"Not allowed","store":"Store","modify-store":"Edit Info","modify-agent":"Edit Partner","bind-the-device":"Scan & Link device","affiliated-store":"Merchant","click-to-select-store":"Click to select merchant","network":"Signal","rentable":"Slots Available","returnable":"Return Slot Available","reminder-the-minimum-withdrawal":"reminder: the minimum withdrawal is ","per-day-the-maximum-withdrawal":"$ per day, the maximum withdrawal is ","the-withdrawal-is-allowed":"$,and the withdrawal is allowed once a day. the withdrawal handling fee is ","my-data":"My Data","sub-data":"Distributor Data","data-selection":"Data Selection","state-selection":"Status","input-shop-name":"Please enter Merchant Name","filter":"Filter","please-rental-store":"Please enter Merchant Name","please-device-id":"Please enter the device number","year-s":"year","month-s":"month","cancel-fault":"Cancel fault","starting-time":"Start Time","end-time":"End Time","please-enter-volume":"Please enter volume","on-the-order":"Rented","return-the-order":"Returned","cancel-the-order":"Cancelled","timeout-orders":"Exceeded Time","binding":"Linked","modify-staff":"Edit Sales Rep","edit-store":"Edit store","delete-store":"Delete store","get-a-discount":"get a discount","free-time-of-power-bank":"Free time of power bank","power-bank-discount":"Power bank discount","please-enter-deducted-amount":"Please enter deducted amount","returned":"Returned","not-returned":"Not-returned","order-duration":"Order duration","type":"Type","settled":"Settled","unsettled":"Unsettled","pending-settlement":"Pending settlement","free-time":"Free time","non-deposit-rent":"non-deposit rent","slot-of-rent":"Slot of rent","completed":"Completed","rental-duration":"Rental duration","old-password":"Old Password","confirm-the-new-password":"Confirm the New Password","the-password-is-composed":"Password composed of Letters & Number","please-enter-the-recipient-name":"Please enter the recipient's name","please-enter-the-recipient-phone":"Please enter the recipient's phone","please-enter-shipping-address":"Please enter shipping address","affiliated-agent":"Affiliated agent","creation-time":"Created On","free-time-minute":"Free Time in minute","please-enter-your-membership-number":"Please enter Member Number","deleted":"Deleted","remove-membership":"Remove membership","daily":"Daily","monthly":"Monthly","annual":"Annual","sales":"Sales","cycle":"Cycle","select-time":"Select Time","merchant-total-revenue":"merchant total revenue","number-of-orders":"number of orders","please-select-a-period":"Please select a period","please-select-a-start-time":"Please select a start time","please-select-an-end-time":"Please select an end time","reward-leve-1":"Rewards – Tier 1","reward-leve-2":"Rewards – Tier 2","recommender":"Referred By","order-detail":"Order Details","add-the-merchants":"Add the merchants","select-merchant":"Select Merchant","data-statistics":"Data statistics","order-income":"Order Details","select-vip":"Select VIP","google-maps":"Google Maps","Chinese":"Chinese","English":"English","amount":"Amount","time":"Time","please-select":"Please select","tips":"Tips","Wait-for-a-moment-please":"Wait for a moment, please","Are-all-power-banks-ejected":"Are all power banks ejected?","Do-you-want-to-refresh-the-battery":"Do you want to refresh the Power bank?","Whether-to-restart-the-cabinet":"Whether to restart the cabinet?","Is-it-set-to-Fault":"Is it set to Fault?","Cancel-the-fault":"Cancel the fault?","Is-the-power-bank-ejected":"Is the power bank ejected?","Is-the-volume-set":"Is the volume set?","Determined-to-modify-merchant-type":"Determined to modify merchant type?","No-member-found":"No member found?","minutes-free":"minutes free","S$":"$","charge-bank-free-minutes":"charge bank free minutes","have-been-selected":"have been selected","merchants":"Merchants","none":"None","$/hour":"$/hour","binding-success":"Binding success","Verification-code-error":"Verification code error","sellers":"Merchant","staffs":"Sales Rep","agents":"Partner","add.vip":"Add No-charge User","renting":"On renting","others":"Others","dates":"Date","workingDay":"Working Day","weekend":"Weekend","holidays":"Holidays","aboutUs":"Contact Information","contact-number":"Contact number","company-email":"Company email","30minutes":"30min","name":"Name","please-enter-your-name":"Please enter your name","register":"Registered account","register-btn":"Register","hourss":"hr","charge.batterys":"Status of Device","vip-users":"Add VIP User","please-enter-passwords":"Please re-enter your new password","user-name-agency":"Partner Name","user-name-employee":"Sales Representive Name","add-the-merchant":"Add Merchant Store","seller-name-s":"Brand Name","staff-s":"Sales Rep","cancel":"Cancel","sure":"Yes","cancel-account":"Cancel Account","Are-you-sure-you-want-to-cancel-account":"Are you sure you want to cancel the account?","privacy-policy":"Privacy Policy","last-page":"Last Page","next-page":"Next Page"},"ja":{"locale.auto":"システム","locale.en":"英語","locale.zh-hans":"简体中文","locale.zh-hant":"繁体中文","locale.ja":"日语","index.title":"Hello i18n","index.home":"ホーム","index.component":"コンポーネント","index.api":"API","index.schema":"Schema","index.demo":"uni-app globalization","index.demo-description":"ユニフレームワーク、manifest.json、pages.json、タブバー、ページ、コンポーネント、APIを含める、Schema","index.detail":"詳細","index.language":"言語","index.language-info":"設定","index.system-language":"システム言語","index.application-language":"アプリケーション言語","index.language-change-confirm":"この設定を適用すると、アプリが再起動します","api.message":"メッセージ","schema.add":"追加","schema.add-success":"成功を追加","uni.app.quit":"もう一度押すと、アプリケーションが終了します","uni.async.error":"サーバーへの接続がタイムアウトしました。画面をクリックして再試行してください","uni.showActionSheet.cancel":"キャンセル","uni.showToast.unpaired":"使用するには、showToastとhideToastをペアにする必要があることに注意してください","uni.showLoading.unpaired":"使用するには、showLoadingとhideLoadingをペアにする必要があることに注意してください","uni.showModal.cancel":"キャンセル","uni.showModal.confirm":"OK","uni.chooseImage.cancel":"キャンセル","uni.chooseImage.sourceType.album":"アルバムから選択","uni.chooseImage.sourceType.camera":"カメラ","uni.chooseVideo.cancel":"キャンセル","uni.chooseVideo.sourceType.album":"アルバムから選択","uni.chooseVideo.sourceType.camera":"カメラ","uni.previewImage.cancel":"キャンセル","uni.previewImage.button.save":"画像を保存","uni.previewImage.save.success":"画像をアルバムに正常に保存します","uni.previewImage.save.fail":"画像をアルバムに保存できませんでした","uni.setClipboardData.success":"コンテンツがコピーされました","uni.scanCode.title":"スキャンコード","uni.scanCode.album":"アルバム","uni.scanCode.fail":"認識に失敗しました","uni.scanCode.flash.on":"タッチして点灯","uni.scanCode.flash.off":"タップして閉じる","uni.startSoterAuthentication.authContent":"指紋認識...","uni.picker.done":"完了","uni.picker.cancel":"キャンセル","uni.video.danmu":"「弾幕」","uni.video.volume":"ボリューム","uni.button.feedback.title":"質問のフィードバック","uni.button.feedback.send":"送信"},"zh-Hans":{"locale.auto":"系统","locale.en":"English","locale.zh-hans":"简体中文","locale.zh-hant":"繁体中文","locale.ja":"日语","Version-Update":"版本更新","index.title":"设备管理","index.home":"主页","index.component":"组件","index.api":"API","index.schema":"Schema","index.demo":"uni-app 国际化演示","index.demo-description":"包含 uni-framework、manifest.json、pages.json、tabbar、页面、组件、API、Schema","index.detail":"详情","index.language":"语言","index.language-info":"语言信息","index.system-language":"系统语言","index.application-language":"应用语言","index.language-change-confirm":"应用此设置将重启App","api.message":"提示","schema.name":"姓名","schemas.name":"账户名","input-the-name":"请输入姓名","schema.add":"新增","schema.add-success":"新增成功","tabbar.index":"首页","tabbar.order":"订单","tabbar.statistics":"统计","tabbar.seller":"商户","tabbar.mine":"我的","income.today":"今日收入","income.yesterday":"昨日收入","income.total":"累计收入","income.month":"本月收入","income.month-l":"上月收入","yuan":"$","income.order":"订单收益","withdraw.apply":"申请提现","add.seller":"添加商户","add.agency":"添加代理","add.staff":"添加业务员","add.seller-account":"添加商户账户","charge.battery":"充电宝设备","add.seller-vip":"添加商户VIP","phone":"手机号","password":"密码","forget-password":"忘记密码","login":"登录","please-enter-phone":"请输入手机号","please-enter-password":"请输入密码","code":"验证码","get-code":"获取验证码","please-enter-code":"请输入验证码","new-password":"新密码","please-enter-new-password":"请输入新密码","retype-new-password":"确认密码","submit":"提交","please-enter-captcha":"请输入图形验证码","incorrect-input":"输入不正确","click-picture-refresh":"点击图片刷新","cancle":"取消","confirm":"确定","reset":"重置","hello":"你好","logout":"退出","accumulated-commission":"累计分成","total-refund-amount":"总退款金额","withdrawn-amount":"已提现金额","withdrawable-amount":"可提现金额","withdrawal-frozen-amount":"提现冻结金额","role-settings":"角色设置","agent":"代理","seller":"商户账户","vip-user":"商户VIP","staff":"业务员","more":"其他功能","sellers":"商户","staffs":"业务员","agents":"代理","change-password":"修改密码","withdrawals-record":"提现记录","power-bank-supplement":"补宝","language-switch":"语言切换","add-withdrawal-Information":"添加提现信息","end-order":"结束订单","seller-detail":"商户详情","vip-detail":"查看会员","edit_store":"编辑店铺","supplement-records":"补宝记录","store-detail":"商户详情","input-the-order-num":"请输入订单编号","order-num":"订单编号","order-amount":"订单金额","status":"状态","percentage":"比例","charging-time":"使用时间","bank-card":"银行卡号","input-bank-card":"请输入银行卡号","bank-name":"所属银行","input-bank-name":"请输入所属银行","input-shop-name":"请输入所属商户","order-type":"订单类型","device-number":"设备号","please-input-the-withdrawal-amount":"请输入提款金额","account-name":"账户名","account-number":"账户号","withdraw-money":"提现","modify-withdrawal-Information":"修改提现信息","save":"保存","basic-information":"基本信息","franchise-type":"加盟方式","purchase":"购买","investor":"投放","user-name":"用户名","user-names":"用户名","input-user-name":"请输入用户名","phone-num-for-login":"登录手机","password-for-login":"登录密码","commission-ratio":"佣金百分比","please-input-the-commission-ratio":"请输入佣金百分比","permission-settings":"权限设置","allow-adding-subordinate-agents":"允许添加下级代理","adding-subordinate-agents":"添加下级代理","pop-up-battery":"弹出电池","prohibited-to-use":"禁止使用","store-grade":"店铺等级","please-select-the-store-grade":"请选择店铺等级","seller-type":"商户类型","seller-level":"商户级别","seller-name":"商户名称","store-address":"商户地址","please-input-the-seller-name":"请输入商户名称","select-industry":"选择行业","industry":"行业","please-select-your-industry":"请选择所在行业","region":"所在区域","latitude-and-longitude":"经纬度","please-select-your-latitude-and-longitude":"请选择经纬度","map-search":"地图搜索","address-details":"详细地址","please-input-your-address-details":"请输入详细地址","select-the-seller":"选择商户负责人","clear":"清空","select":"选择","billing-information":"计费信息","charging-strategy-of-power-bank":"充电宝计费策略","please-input-the-charging-strategy":"请输入计费策略","other-information":"其他信息","merchant-phone":"商户电话","please-input-the-merchant-phone":"请输入店铺电话","open-hours":"营业时间","store-picture":"商户图片","store-logo":"商户logo","disabled":"禁用状态","charging-unit":"计费单位","hour":"小时","half-hour":"半小时","billing-time":"计费时间","billing-amount":"计费金额/元","free-minutes":"分钟内免费","minutes":"分钟","hours":"小时","highest-consumption":"最高消费","now-time":"当前筛选时间","total":"总数量","copy":"复制","rental-time":"租借时间","rental-store":"租借商户","please-rental-store":"请输入租借商户","starting-time":"请选择起始时间","end-time":"请选择结束时间","to":"至","rental-information":"租借信息","charge-standard":"收费标准","daily-max-bill-amount":"每天封顶","rental-deposit":"租借押金","battery-id":"电池ID","device-id":"设备编号","fee-information":"费用信息","payment-amount":"支付金额","order-status":"订单状态","payment-time":"付款时间","return-information":"归还信息","return-store":"归还店铺","return-slot":"归还孔位","return-time":"归还时间","commission-details":"分成明细","user-info":"用户信息","users-nickname":"用户昵称","member-id":"会员ID","order-info":"订单信息","consumption-amount":"消费金额","use-time":"使用时长","deducted-amount":"扣除金额","remark":"备注","add-remark":"添加备注","return-or-not":"是否归还","NAV":"导航","DEL":"删除","statistics":"数据统计","belong-staff":"所属业务员","order-quantity":"订单数量","total-amount":"总金额","total-refund":"总退款","received-amount":"到账金额","discount-method":"优惠方式","free":"免费","discount":"打折","free-rules-of-power-bank":"充电宝免费规则","free-time-of-power-bank":"充电宝免费时长","times":"次数","duration":"时长","select-store":"选择商户","find-member":"查找会员","search":"查询","add":"添加","free-rules":"免费规则","free-times-of-power-bank":"充电宝免费次数","time-earned":"免费时长","online-device":"在线设备","total-s":"总数","check-the-details":"查看详情","bind-agent":"绑定代理","device-revenue":"设备收益","slot-management":"槽位管理","sim-card":"流量卡","added-time":"添加时间","working-time":"心跳时间","Qr-code":"二维码","year":"年份","month":"月份","pop-up-all-power-bank":"弹出所有","refresh-battery":"刷新电池","reboot":"重启","set-as-fault":"设为故障","set-volume":"设置音量","slot":"槽位","pending-review":"审核金额","pop-up":"弹出","battery-power":"电池电量","store-name":"店铺名","withdrawn":"已提现","account-balance":"账户余额","handling-fee":"手续费","transaction-number":"流水号","mobile-phone":"收货手机","address":"收货地址","supplements-quantity":"补宝数量","apply-for-supplement":"申请补宝","check-supplement-records":"查看补宝记录","Are-you-sure-you-want-to-log-out":"确定退出登录吗?","Are-you-sure-to-submit":"确定提交吗?","Are-you-sure-to-delete":"确定删除吗?","normal":"正常","error":"异常","edit-seller-account":"修改商户账户","online":"在线","offline":"离线","unbound":"未绑","fault":"故障","on-the-order":"租借订单","return-the-order":"归还订单","cancel-the-order":"撤销订单","timeout-orders":"超时订单","cancel-the-binding":"取消绑定","replenish-power-bank":"补宝","must-be-an-integer-and-less-than-the-commission-ratio":"必须小于所属上级分成比(","of-the-superior-division":")的整数","depreciation-rate":"折旧率","please-depreciation-rate":"请输入折旧率","please-device-id":"请输入设备编号","please-input":"请输入","the-actual-ratio-of-the-merchant-is-commission-percentage-depreciation-rate":"商户实际比例为:佣金百分比*折旧率,如70*80=56%","store-list-display-ratio":"商户列表显示比例","please-store-list-display-ratio":"请输入显示比例","referrer":"介绍人","if-there-is-a-referrer-please-fill-in":"如有介绍人请填写","add-the-referrer":"添加介绍人","it-is-not-free":"用户每次租借前多少分钟免费填0或者为空表示不免费","maximum-daily-consumption-limit":"每日最高消费限额,超出时长按照金额来算填0或者为空表示不限制","share-ratio":"分成比","please-enter-the-sharing-ratio-for-the-referrer":"请输入介绍人分成比","depreciation-ratio":"折旧费率比","please-enter-a-depreciation-ratio":"请输入折旧费率比","show-order-amount":"显示订单金额","hidden-daily-revenue":"隐藏日收益","please-enter-a-keyword":"请输入关键词","buy":"购买","allow":"允许","not-allowed":"不允许","store":"商户管理","modify-store":"修改商户","modify-agent":"修改代理","bind-the-device":"绑定设备","affiliated-store":"所属商户","click-to-select-store":"点击选择商户","network":"网络","rentable":"可借","returnable":"可还","reminder-the-minimum-withdrawal":"温馨提示:每天最低提现","per-day-the-maximum-withdrawal":",最高提现","the-withdrawal-is-allowed":",每天允许提现一次。提现手续费","my-data":"我的数据","sub-data":"下级数据","data-selection":"数据选择","state-selection":"状态选择","filter":"筛选","year-s":"年","month-s":"月","cancel-fault":"取消故障","please-enter-volume":"请输入音量","binding":"已绑","modify-staff":"修改业务员","edit-store":"编辑店铺","delete-store":"删除店铺","get-a-discount":"享受折扣","power-bank-discount":"充电宝折扣","please-enter-deducted-amount":"请输入需扣除金额","returned":"已归还","not-returned":"未归还","order-duration":"订单时长","type":"类型","settled":"已结算","unsettled":"未结算","pending-settlement":"待结算","free-time":"免费时长","non-deposit-rent":"免押租借","slot-of-rent":"租借孔位","completed":"已完成","rental-duration":"租借时长","old-password":"旧密码","confirm-the-new-password":"确认新密码","the-password-is-composed":"请输入密码（密码为英文字母与数字组成）","please-enter-the-recipient-name":"请输入收货人名字","please-enter-the-recipient-phone":"请输入收货手机","please-enter-shipping-address":"请输入收货地址","consignee-name":"收货人姓名","affiliated-agent":"所属代理","creation-time":"创建时间","free-time-minute":"免费时长/分钟","please-enter-your-membership-number":"请输入会员号","deleted":"已删除","delete":"删除","remove-membership":"删除会员","daily":"日期","monthly":"月度","annual":"年度","sales":"销量","cycle":"周期","select-time":"筛选时间","merchant-total-revenue":"商户收益总金额","number-of-orders":"订单次数","please-select-a-period":"请选择周期","please-select-a-start-time":"请选择起始时间","please-select-an-end-time":"请选择结束时间","reward-leve-1":"一级奖励","reward-leve-2":"二级奖励","recommender":"推荐人","order-detail":"订单详情","add-the-merchants":"添加商户","select-merchant":"选择商户","data-statistics":"数据统计","order-income":"订单收益","select-vip":"选择商户Vip","google-maps":"谷歌地图","Chinese":"中文","English":"英文","amount":"金额","time":"时间","please-select":"请选择","tips":"提示","Wait-for-a-moment-please":"请稍等","Are-all-power-banks-ejected":"是否弹出所有充电宝?","Do-you-want-to-refresh-the-battery":"是否刷新电池?","Whether-to-restart-the-cabinet":"是否重启机柜?","Is-it-set-to-Fault":"是否设为故障?","Cancel-the-fault":"是否取消故障?","Is-the-power-bank-ejected":"是否弹出充电宝?","Is-the-volume-set":"是否设置音量?","Determined-to-modify-merchant-type":"确定修改商户类型?","No-member-found":"未查询到会员?","minutes-free":"分钟免费","S$":"元","charge-bank-free-minutes":"充电宝免费分钟","have-been-selected":"已选择","merchants":"位商户","none":"无","$/hour":"元/小时","binding-success":"绑定成功","Verification-code-error":"验证码错误","picture":"图片","video":"视频","renting":"租借中","others":"其他","dates":"日期","workingDay":"工作日","weekend":"周末","holidays":"节假日","aboutUs":"联系方式","contact-number":"联系电话","company-email":"公司邮箱","30minutes":"30分钟","name":"名字","please-enter-your-name":"请输入名字","register":"注册账号","register-btn":"注册","hourss":"小时","charge.batterys":"充电宝设备","vip-users":"商户VIP","please-enter-passwords":"请重新输入新密码","user-name-agency":"用户名","user-name-employee":"用户名","add-the-merchant":"添加商户","seller-name-s":"商户名","staff-s":"业务员","cancel":"取消","sure":"确定","cancel-account":"注销账户","Are-you-sure-you-want-to-cancel-account":"确定要注销账户吗？","privacy-policy":"隐私政策","last-page":"上一页","next-page":"下一页"},"zh-Hant":{"locale.auto":"系統","locale.en":"English","locale.zh-hans":"简体中文","locale.zh-hant":"繁體中文","locale.ja":"日语","index.title":"Hello i18n","index.home":"主頁","index.component":"組件","index.api":"API","index.schema":"Schema","index.demo":"uni-app 國際化演示","index.demo-description":"包含 uni-framework、manifest.json、pages.json、tabbar、頁面、組件、API、Schema","index.detail":"詳情","index.language":"語言","index.language-info":"語言信息","index.system-language":"系統語言","index.application-language":"應用語言","index.language-change-confirm":"應用此設置將重啟App","api.message":"提示","schema.name":"姓名","schema.add":"新增","schema.add-success":"新增成功"}}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/login/login","meta":{},"window":{"enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/addAgency/addAgency","meta":{},"window":{"navigationBarTitleText":"%add.agency%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/addwithdrawal/addwithdrawal","meta":{},"window":{"navigationBarTitleText":"%modify-withdrawal-Information%","bounce":"none"}},{"path":"/pages/applyWithdrawal/applyWithdrawal","meta":{},"window":{"navigationBarTitleText":"%withdraw.apply%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/forgetPsw/forgetPsw","meta":{},"window":{"navigationBarTitleText":"%forget-password%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/order/order","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/statistics/statistics","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/seller/seller","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/change_lang/change_lang","meta":{},"window":{"navigationBarTitleText":"%language-switch%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/orderBenefitDetail/orderBenefitDetail","meta":{},"window":{"navigationBarTitleText":"%income.order%","bounce":"none"}},{"path":"/pages/orderBenefit/orderBenefit","meta":{},"window":{"navigationBarTitleText":"%income.order%","bounce":"none"}},{"path":"/pages/addEmployee/addEmployee","meta":{},"window":{"navigationBarTitleText":"%add.staff%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/addSellerManager/addSellerManager","meta":{},"window":{"navigationBarTitleText":"%add.seller-account%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/addSellerVip/addSellerVip","meta":{},"window":{"navigationBarTitleText":"%add.seller-vip%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/endOrder/endOrder","meta":{},"window":{"navigationBarTitleText":"%end-order%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/agency/agency","meta":{},"window":{"navigationBarTitleText":"%agent%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/agencyDetail/agencyDetail","meta":{},"window":{"navigationBarTitleText":"%agent%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/sellerAccount/sellerAccount","meta":{},"window":{"navigationBarTitleText":"%seller%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/acountDetail/acountDetail","meta":{},"window":{"navigationBarTitleText":"%seller-detail%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/sellerVip/sellerVip","meta":{},"window":{"navigationBarTitleText":"%vip-user%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/checkVip/checkVip","meta":{},"window":{"navigationBarTitleText":"%vip-detail%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/editShop/editShop","meta":{},"window":{"navigationBarTitleText":"%edit_store%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/business/business","meta":{},"window":{"navigationBarTitleText":"%staff%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/businessDetail/businessDetail","meta":{},"window":{"navigationBarTitleText":"%staff%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/password/password","meta":{},"window":{"navigationBarTitleText":"%change-password%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/replenish/replenish","meta":{},"window":{"navigationBarTitleText":"%power-bank-supplement%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/replenishRecord/replenishRecord","meta":{},"window":{"navigationBarTitleText":"%supplement-records%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/sellerDetail/sellerDetail","meta":{},"window":{"navigationBarTitleText":"%store-detail%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/depositRecord/depositRecord","meta":{},"window":{"navigationBarTitleText":"%withdrawals-record%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/batteryDevice/batteryDevice","meta":{},"window":{"navigationBarTitleText":"%charge.battery%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/orderDetail/orderDetail","meta":{},"window":{"navigationBarTitleText":"%order-detail%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/batteryDeviceDetail/batteryDeviceDetail","meta":{},"window":{"navigationBarTitleText":"%slot-management%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/addSeller/addSeller","meta":{},"window":{"navigationBarTitleText":"%add-the-merchant%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/selectSeller/selectSeller","meta":{},"window":{"navigationBarTitleText":"%select-merchant%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/statisticsSeller/statisticsSeller","meta":{},"window":{"navigationBarTitleText":"%data-statistics%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/orderIncome/orderIncome","meta":{},"window":{"navigationBarTitleText":"%order-income%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/selectSellerVip/selectSellerVip","meta":{},"window":{"navigationBarTitleText":"%select-vip%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/openMap/openMap","meta":{},"window":{"navigationBarTitleText":"%google-maps%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/webview/webview","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/aboutUs/aboutUs","meta":{},"window":{"navigationBarTitleText":"%aboutUs%","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/openPrivacy/openPrivacy","meta":{},"window":{"navigationBarTitleText":"%privacy-policy%","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});