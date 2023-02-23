// app.ts
App<IAppOption>({
  globalData: {
    $api:'http://127.0.0.1:8899/api'
  },
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})