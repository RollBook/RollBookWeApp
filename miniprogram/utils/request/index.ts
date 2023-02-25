import { RobokPromise } from './types'

const app = getApp<IAppOption>()

/*
* @Description: 封装wx网络请求
* @Param: params http请求参数
* @Author: FAll
* @Date: 2023-02-23 15:58:49
*/
export async function request<T extends object>(params: WechatMiniprogram.RequestOption<string | Record<string, any> | ArrayBuffer>): RobokPromise<T> {

  const baseUrl: string | undefined = app.globalData.$api

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result: any) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}