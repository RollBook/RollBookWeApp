import { request } from "../../utils/request/index";

export async function searchGoods(input:String) {
  return await request<String[]>({url:"/mall/search_goods",method:"GET",auth:true,data:{
    input
  }})
}

export async function searchGoodsByHow(input:String) {
  return await request<String[]>({url:"/mall/search_goods_how",method:"GET",auth:true,data:{
    input
  }})
}

export async function searchGoodsByPrice(input:String) {
  return await request<String[]>({url:"/mall/search_goods_price",method:"GET",auth:true,data:{
    input
  }})
}