import { request } from "../../utils/request/index";
import { robokGetStorage } from "../../api/index";

export async function getOrder() {
  let openid = robokGetStorage<string>("openid");

  return await request<String[]>({url:"/order/get_order",method:"GET",auth:true,data:{
    openid
  }});
}

export async function getSellBook() {
  let openid = robokGetStorage<string>("openid");

  return await request<String[]>({url:"/order/get_sell_book",method:"GET",auth:true,data:{
    openid
  }});
}
