(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register-register"],{3508:function(t,e,n){"use strict";(function(t){n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("c7eb")),o=i(n("1da1")),r=n("1ee8"),s=null,c={data:function(){return{name:"",password:"",lang:"en-us",time:0,code:"",phone:""}},mounted:function(){t("log",uni.getLocale()," at pages/register/register.vue:55"),"zh-Hans"==uni.getLocale()?this.lang="zh-cn":this.lang="en-us"},methods:{getCode:function(){var e=this;return(0,o.default)((0,a.default)().mark((function n(){var i;return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(""==e.phone){n.next=8;break}return n.next=3,(0,r.registerSms)({phone:65+e.phone,type:"register"});case 3:i=n.sent,t("log",i," at pages/register/register.vue:70"),1==i.data.code&&(e.time=i.data.data.time,t("log",e.time," at pages/register/register.vue:73"),clearInterval(s),s=setInterval((function(){if(e.time>0){var t=e.time;t-=1,e.time=t}else clearInterval(s)}),1e3),uni.showToast({title:i.data.msg,icon:"none",duration:3e3})),n.next=9;break;case 8:uni.showToast({title:e.$t("please-enter-phone"),icon:"none",duration:1e3});case 9:case"end":return n.stop()}}),n)})))()},register:function(){var e=this;return(0,o.default)((0,a.default)().mark((function n(){var i;return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,r.register)({name:e.name,mobile:65+e.phone,code:e.code,password:e.password});case 2:i=n.sent,t("log",i," at pages/register/register.vue:106"),1===i.code&&(uni.showModal({title:i.msg,icon:"none"}),uni.reLaunch({url:"/pages/login/login"}));case 5:case"end":return n.stop()}}),n)})))()}}};e.default=c}).call(this,n("0de9")["log"])},"4dd4":function(t,e,n){"use strict";n.r(e);var i=n("3508"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"575f":function(t,e,n){var i=n("9cf2");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("c5abf354",i,!0,{sourceMap:!1,shadowMode:!1})},"5d09":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"top"},[n("v-uni-image",{attrs:{src:"/static/logo@2x.png"}})],1),n("v-uni-view",{staticClass:"info_box"},[n("v-uni-view",{staticClass:"info_item"},[n("v-uni-text",{staticClass:"title"},[t._v(t._s(t.$t("name")))]),n("v-uni-input",{attrs:{type:"text",placeholder:t.$t("please-enter-your-name"),"placeholder-class":"phcolor"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),n("v-uni-view",{staticClass:"info_item"},[n("v-uni-text",{staticClass:"title"},[t._v(t._s(t.$t("phone")))]),n("v-uni-view",{staticClass:"input_type"},[n("v-uni-text",{staticClass:"number"},[t._v("+65")]),n("v-uni-input",{attrs:{type:"number",placeholder:t.$t("please-enter-phone"),"placeholder-class":"phcolor"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1)],1),n("v-uni-view",{staticClass:"info_item"},[n("v-uni-view",{staticClass:"title"},[t._v(t._s(t.$t("code")))]),n("v-uni-view",{staticClass:"input_box"},[n("v-uni-input",{attrs:{type:"text","placeholder-class":"phcolor",placeholder:t.$t("please-enter-code")},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),t.time?t._e():n("v-uni-view",{staticClass:"get_code",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}},[t._v(t._s(t.$t("get-code")))]),t.time>0?n("v-uni-view",{staticClass:"get-sms",staticStyle:{"background-color":"#F8F8F8",color:"#999999"}},[t._v(t._s(t.time)+"s")]):t._e()],1)],1),n("v-uni-view",{staticClass:"info_item"},[n("v-uni-text",{staticClass:"title"},[t._v(t._s(t.$t("password")))]),n("v-uni-input",{attrs:{type:"password",placeholder:t.$t("please-enter-password"),"placeholder-class":"phcolor"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),n("v-uni-view",{staticClass:"login",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.register.apply(void 0,arguments)}}},[t._v(t._s(t.$t("register-btn")))])],1)},a=[]},"9b8b":function(t,e,n){"use strict";n.r(e);var i=n("5d09"),a=n("4dd4");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("aa51");var r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"6a363c26",null,!1,i["a"],void 0);e["default"]=s.exports},"9cf2":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 全局颜色 */.container .top[data-v-6a363c26]{position:relative;width:100vw;height:%?276?%;background-size:%?750?% %?276?%}.container .top uni-image[data-v-6a363c26]{position:absolute;width:%?230?%;height:%?154?%;top:%?126?%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.container .info_box[data-v-6a363c26]{width:%?690?%;margin:%?50?% auto %?30?%}.container .info_box .info_item[data-v-6a363c26]{display:flex;flex-direction:column;justify-content:center;width:%?690?%;height:%?162?%;border-bottom:%?2?% solid #f5f5f5}.container .info_box .info_item .title[data-v-6a363c26]{height:%?40?%;margin-bottom:%?24?%;font-size:%?28?%;font-weight:400;color:#333;line-height:%?40?%}.container .info_box .info_item .input_type[data-v-6a363c26]{display:flex;align-items:center}.container .info_box .info_item .input_type .number[data-v-6a363c26]{width:%?68?%;font-size:%?26?%;font-weight:400;color:#333}.container .info_box .info_item uni-input[data-v-6a363c26]{width:%?510?%;font-size:%?26?%;font-weight:400;color:#333}.container .info_box .info_item .input_box[data-v-6a363c26]{display:flex;justify-content:space-between;align-items:center}.container .info_box .info_item .input_box uni-input[data-v-6a363c26]{width:%?500?%}.container .info_box .info_item .input_box .get_code[data-v-6a363c26]{width:%?150?%;height:%?44?%;font-size:%?22?%;font-weight:400;color:#3D82FF;text-align:center;line-height:%?44?%;background:#fff;border-radius:%?22?%;border:%?1?% solid #3D82FF}.container .forget[data-v-6a363c26]{display:flex;justify-content:flex-end;padding:0 %?30?%}.container .forget .forget_password[data-v-6a363c26]{height:%?34?%;color:#3D82FF;font-size:%?24?%;font-weight:500;line-height:%?34?%}.container .login[data-v-6a363c26]{width:%?690?%;height:%?88?%;margin:%?30?% auto;text-align:center;line-height:%?88?%;font-size:%?32?%;font-weight:500;color:#fff;background-color:#3D82FF;border-radius:%?44?%}.container .about[data-v-6a363c26]{position:absolute;width:%?690?%;margin:%?30?% auto;text-align:center;bottom:%?56?%;left:%?30?%}.container .about uni-text[data-v-6a363c26]{height:%?16?%;font-size:%?22?%;font-weight:400;color:#333;line-height:%?16?%}',""]),t.exports=e},aa51:function(t,e,n){"use strict";var i=n("575f"),a=n.n(i);a.a}}]);