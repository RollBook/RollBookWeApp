import { request } from "../../utils/request/index";
import { robokGetStorage } from "../../api/index";

export async function getSaveBook() {
  let openid = robokGetStorage<string>("openid");
  return await request<String[]>({url:"/rollbook/get_save_book",method:"GET",auth:true,data:{
    openid
  }});
}

export async function getPickBook() {
  let openid = robokGetStorage<string>("openid");
  return await request<String[]>({url:"/rollbook/get_pick_order",method:"GET",auth:true,data:{
    openid
  }});
}

export async function saveBook(bookId:string) {
  return await request<Number>({url:"/rollbook/save_book?bookId="+encodeURIComponent(bookId),method:"POST",auth:true});
}


export async function pickBook(orderId:string) {
  return await request<Number>({url:"/rollbook/pick_order?orderId="+orderId,method:"POST",auth:true});
}