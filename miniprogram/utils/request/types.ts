/** 自定义小程序请求 */
export interface CommonWechatRequest<T> extends WechatMiniprogram.RequestOption<T>{
  auth?:boolean
  header?: WechatMiniprogram.IAnyObject
}
