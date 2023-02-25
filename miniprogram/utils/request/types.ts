// 小程序响应
export interface CommonWechatResponse<T> {
  data: CommonWechatResponseData<T>
  statusCode: boolean
  header: object
  cookies: string[]
}

export interface CommonWechatResponseData<T> {
  data: T,
  msg: string,
  status: number
}

export type RobokPromise<T = any> = Promise<CommonWechatResponse<T>>
