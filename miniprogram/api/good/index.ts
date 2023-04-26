import { request } from "../../utils/request/index";
import { BookInfo } from "../../api/good/types";
import { cartInfo } from "../cart/types";

export async function getGoodById(bookId:string | undefined){
  return await request<BookInfo>({url:"/mall/get_good_id",method:"GET",auth:true,data:{
    bookId
  }})
}

export async function addCart(cart:cartInfo | undefined) {
  return await request<Number>({url:"/mall/add_cart",method:"POST",auth:true,data:{
    ...cart
  }})
}