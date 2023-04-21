import { request } from "../../utils/request/index";
import { cartInfo } from "../../api/cart/types";

export async function getCart(userId:string) {
  return await request<cartInfo[]>({url:"/cart/get_cart",method:"GET",auth:true,data:{
    userId
  }})
}

export async function delCart(bookId:string) {
  return await request<Number>({url:"/cart/del_cart?bookId="+encodeURIComponent(bookId),method:"DELETE",auth:true})
}