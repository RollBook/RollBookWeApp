import { request } from "../../utils/request/index";
import { RobokPromise } from "../../utils/request/types";


export async function getOrder():RobokPromise<String[]> {
  let openid:string = wx.getStorageSync('openid')

  return await request({url:"/trade/get_order",method:"GET",auth:true,data:{
    openid
  }})
}