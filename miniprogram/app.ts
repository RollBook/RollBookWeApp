// app.ts
import { userSession } from "./api/types";
import { CommonWechatResponseData } from "./utils/request/types";

App<IAppOption>({
  /**
  * 全局变量
  */
  globalData: {
    // 生产环境 http://tqnnan.top:8899/api
    // 开发环境 http://127.0.0.1:8899/api
    $api: "http://127.0.0.1:8899/api",
    isLogin: false
  },

  /**
  *  app.ts中不可以使用asnyc/await，否则会出现其它接口获取不到globalData的奇怪问题。
  *  因此生命周期onLauch函数中所有请求使用原生wx.request 
  *   --FAll
  */
  onLaunch() {
    // 获取用户登录态
    let openid = wx.getStorageSync("openid")
    let session_key = wx.getStorageSync("session_key")
    const $api = this.globalData.$api

    if (!openid && !session_key) {
      // 如果用户本地缓存不存在登录态，则直接执行登录
      userLogin()
      return
    } else {
      // 存在则检查登录态
      wx.request({
        url: `${$api}/user/check_login`,
        method: 'GET',
        data: {
          openid,
          session_key
        },
        success: (res) => {
          if (res.statusCode === 200) {
            // 登录态未过期，欢迎使用
            this.globalData.isLogin = true
            wx.showToast({
              title: "欢迎使用罗伯克",
              icon: "success",
              duration: 2000
            })
          } else {            
            // 登录过期，执行登录
            userLogin()
          }

        }
      })
    }

    /*
    * @Description: 用户登录
    * @Author: FAll
    * @Date: 2023-02-25 18:46:45
    */
    function userLogin() {
      // 调用wx登录接口获取code
      wx.login({
        success: (res) => {
          // 调用罗伯克登录接口，用微信官方返回的code进行注册或登录
          wx.request({
            url: `${$api}/user/login`,
            method: "POST",
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            // 登录成功后本地缓存用户的openid和session_key
            success: res => {
              if (res.statusCode === 200) {
                const responseData = res.data as CommonWechatResponseData<userSession>
                wx.setStorageSync("openid", responseData.data.openid)
                wx.setStorageSync("session_key", responseData.data.session_key)
                wx.showToast({
                  title: "欢迎使用罗伯克",
                  icon: "success",
                  duration: 2000
                })
              } else {
                // 登录失败
                wx.showToast({
                  title: "当前服务异常",
                  icon: "error",
                  duration: 2000
                })
              }

            }

          })
        }
      })

    }

  },
})