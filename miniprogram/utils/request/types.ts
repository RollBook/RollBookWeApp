// 小程序响应
export interface CommonWechatResponse {
  data: { data:object,msg:string,status:number }
  statusCode:boolean
  header:object
  cookies:string[]
}