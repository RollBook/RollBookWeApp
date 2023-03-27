import { request } from "../../utils/request/index";

export async function getOrder() {
  let openid:string = wx.getStorageSync('openid');

  return await request<String[]>({url:"/order/get_order",method:"GET",auth:true,data:{
    openid
  }})
}

export async function getSellBook() {
  let openid:string = wx.getStorageSync('openid');

  return await request<String[]>({url:"/order/get_sell_book",method:"GET",auth:true,data:{
    openid
  }})
}
