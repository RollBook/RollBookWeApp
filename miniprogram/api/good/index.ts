import { request } from "../../utils/request/index";
import { BookInfo } from "../../api/good/types";

export async function getGoodById(bookId:string | undefined){
  return await request<BookInfo>({url:"/mall/get_good_id",method:"GET",auth:true,data:{
    bookId
  }})
}