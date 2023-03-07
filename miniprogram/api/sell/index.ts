import { request } from "../../utils/request/index";
import { RobokPromise } from "../../utils/request/types";
import { SellerInfo } from "./types";

/*
* @Description: 获取用户手机号
* @Param: code 接口调用代码
* @Author: FAll
* @Date: 2023-03-02 19:10:00
*/
export async function getPhoneNumber(code:string):RobokPromise<String> {
  let openid:string = wx.getStorageSync('openid')

  return await request({url:"/user/code2phone_num",method:"POST",auth:true,data:{
    openid,
    code
  }})
}

export async function setSellerInfo(info:SellerInfo) {
  
  return await request({url:"/seller/update_seller_info",method:"POST",auth:true,data:{
    ...info
  }})
}