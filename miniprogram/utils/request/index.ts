import { CommonWechatRequest } from './types'

const app = getApp<IAppOption>()

/*
* @Description: 封装wx网络请求
* @Param: params http请求参数
* @Param: auth 接口是否需要鉴权
* @Author: FAll
* @Date: 2023-02-23 15:58:49
*/
export async function request<T extends object>(requestparams: CommonWechatRequest<T>):Promise<WechatMiniprogram.RequestSuccessCallbackResult<T>> {

  // 从全局变量中读取baseURL
  const baseURL: string | undefined = app.globalData.$api

  // 需要鉴权，则请求头中添加key
  if (requestparams.auth && requestparams.header) {
    requestparams.header.openid = wx.getStorageSync('openid')
    requestparams.header.session_key = wx.getStorageSync('session_key')
  }

  // 方法为POST，则默认content-type为application/json
  if(requestparams.method === "POST" && requestparams.header) {
    requestparams.header = {
      ...requestparams.header,
      "content-type":"application/json",
    }
  }

  // 封装wx.request()为Promise并返回
  return new Promise((resolve, reject) => {
    wx.request({
      ...requestparams,
      url: baseURL + requestparams.url,
      timeout: 6000,
      success: (result:WechatMiniprogram.RequestSuccessCallbackResult<T>) => {
        // 取得响应，则完成Promise
        resolve(result);
      },
      fail: (err) => {
        // 请求超时或服务未启动，提示服务异常，拒绝Promise
        wx.showToast({
          title:"服务异常",
          icon:"error",
          duration:1000
        });
        reject(err);
      }
    });
  });
}

export async function uploadFile(uploadOption:WechatMiniprogram.UploadFileOption):Promise<WechatMiniprogram.UploadFileSuccessCallbackResult> {

  const baseURL: string | undefined = app.globalData.$api;

  return new Promise((resolve,reject)=>{
    wx.uploadFile({
      ...uploadOption,
      url: baseURL + uploadOption.url,
      success:(result)=>{
        resolve(result);
      }
    })
  })
}