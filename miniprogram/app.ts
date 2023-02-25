// app.ts
import { userSession } from "./api/types";
import { CommonWechatResponseData } from "./utils/request/types";

App<IAppOption>({
  // 全局变量
  globalData: {
    $api:'http://127.0.0.1:8899/api'
  },
  /**
  *  app.ts中不可以使用asnyc/await，否则会出现其它接口获取不到globalData的奇怪问题。
  *  因此生命周期onLauch函数中所有请求使用原生wx.request --FAll
  */
  onLaunch() {
    // 检查用户是否登录

    // 调用wx登录接口获取code
    wx.login({
      success: res => {
        // 调用罗伯克登录接口，用微信官方返回的code进行注册或登录
        wx.request({
          url:`${this.globalData.$api}/user/login`,
          method:"POST",
          data:{
            code:res.code
          },
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res){
            // 登录成功后本地缓存用户的openid和session_key
            const responseData = res.data as CommonWechatResponseData<userSession>
            wx.setStorageSync("openid",responseData.data.openid)
            wx.setStorageSync("session_key",responseData.data.session_key)
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })



  },
})