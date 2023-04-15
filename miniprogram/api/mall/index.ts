import { request } from "../../utils/request/index";

export async function getMallSwiper(){
  return await request<string[]>({url:"/mall/get_mall_swiper",method:"GET",auth:true})
}

export async function getGoods(nowPage:number) {
  return await request<string[]>({url:"/mall/get_goods",method:"GET",auth:true,data:{
    nowPage
  }})
}