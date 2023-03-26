import { request } from "../../utils/request/index";
import { Book, SellerInfo } from "./types";

/*
* @Description: 获取用户手机号
* @Param: code 接口调用代码
* @Author: FAll
* @Date: 2023-03-02 19:10:00
*/
export async function getPhoneNumber(code:string){
  let openid:string = wx.getStorageSync("openid")

  return await request<String>({url:"/user/code2phone_num",
    method:"POST",
    auth:true,
    data:{
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
export async function setSellerInfo(info:SellerInfo) {
  
  return await request<String>({
    url:"/seller/set_seller_info",
    method:"POST",
    auth:true,
    data:{
      ...info
    }})
}

/*
* @Description: 卖家添加书本（不包含图片）
* @Param: books 卖家上架书本
* @Author: FAll
* @Date: 2023-03-23 20:01:57
*/
export async function addBooks(books:Book[]) {

  const openId:string = wx.getStorageSync("openid");
  const bookToAdd = books.map((book:Book)=>{
    return {
      openId,
      bookName:book.bookName,
      price:book.price,
      status:book.status,
      description:book.description,
      timestamp:book.timestamp
    }
  })
  
  return await request<Book[]>({
    url:"/seller/add_books",
    method:"POST",
    auth:true,
    data:bookToAdd
  })
}