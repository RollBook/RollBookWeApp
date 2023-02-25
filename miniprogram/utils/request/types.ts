// 小程序响应
export interface CommonWechatResponse<T> {
  data: CommonWechatResponseData<T>
  statusCode: boolean
  header: object
  cookies: string[]
}

// 小程序响应的数据
export interface CommonWechatResponseData<T> {
  data: T,
  msg: string,
  status: number
}

// Promise封装小程序响应
export type RobokPromise<T = any> = Promise<CommonWechatResponse<T>>
