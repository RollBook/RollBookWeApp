import { request } from "../../utils/request/index";
import { RobokPromise } from "../../utils/request/types";


export async function getSellBook():RobokPromise<String[]> {
  let openid:string = wx.getStorageSync('openid')

  return await request({url:"/seller/get_sell_book",method:"GET",auth:true,data:{
    openid
  }})
}