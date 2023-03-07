/** 小程序请求 */
export interface CommonWechatRequest extends WechatMiniprogram.RequestOption<string | Record<string, any> | ArrayBuffer>{
  auth?:boolean,
  json?:boolean
}

/** 小程序响应 */
export interface CommonWechatResponse<T> {
  data: CommonWechatResponseData<T>
  statusCode: boolean
  header: object
  cookies: string[]
}

/** 小程序响应的数据 */
export interface CommonWechatResponseData<T> {
  data: T,
  msg: string,
  status: number
}

/** 小程序响应Promise */
export type RobokPromise<T = any> = Promise<CommonWechatResponse<T>>
