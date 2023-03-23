import { RobokPromise, CommonWechatRequest } from './types'

const app = getApp<IAppOption>()

/*
* @Description: 封装wx网络请求
* @Param: params http请求参数
* @Param: auth 接口是否需要鉴权
* @Author: FAll
* @Date: 2023-02-23 15:58:49
*/
export async function request<T extends object>(requestparams: CommonWechatRequest): RobokPromise<T> {

  const baseUrl: string | undefined = app.globalData.$api

  if (requestparams.auth) {
    let openid = wx.getStorageSync('openid')
    let session_key = wx.getStorageSync('session_key')
    requestparams.header = {
      'content-type': requestparams.json ? "application/json" : "application/x-www-form-urlencoded",
      openid,
      session_key
    }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...requestparams,
      url: baseUrl + requestparams.url,
      timeout: 6000,
      success: (result: any) => {
        resolve(result)
      },
      fail: (err) => {
        wx.showToast({
          title:"服务异常",
          icon:"error",
          duration:1000
        })
        reject(err)
      }
    })
  })
}