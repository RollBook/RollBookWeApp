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

/*
* @Description: 更新卖家信息
* @Param: info 卖家信息
* @Author: FAll
* @Date: 2023-03-18 17:20:22
*/
export async function setSellerInfo(info:SellerInfo):RobokPromise<String> {
  
  return await request({url:"/seller/set_seller_info",method:"POST",auth:true,json:true,data:{
    ...info
  }})
}