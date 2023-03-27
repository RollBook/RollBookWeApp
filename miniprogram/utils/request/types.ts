/** 自定义小程序请求 */
export interface RobokWechatRequest<T> extends WechatMiniprogram.RequestOption<T>{
  auth?:boolean
  header?: WechatMiniprogram.IAnyObject
}

/** 自定义响应 */
export type RobokWechatResponse<T> = WechatMiniprogram
  .RequestSuccessCallbackResult<RobokWechatResponseData<T>>

/** 自定义响应数据 */
export interface RobokWechatResponseData<T> {
  data:T,
  msg:string,
  status:number
}