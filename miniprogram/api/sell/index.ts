import { robokGetStorage } from "../../api/index";
import { request,uploadFiles } from "../../utils/request/index";
import { Book, SellerInfo } from "./types";

/*
* @Description: 获取用户手机号
* @Param: code 接口调用代码
* @Author: FAll
* @Date: 2023-03-02 19:10:00
*/
export async function getPhoneNumber(code:string){
  let openid = robokGetStorage<string>("openid");

  return await request<String>({url:"/user/code2phone_num",
    method:"GET",
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
  console.log(books);
  const openId = robokGetStorage<string>("openid");
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

/*
* @Description: 卖家上传书本图片
* @Param: books 所有书本
* @Author: FAll
* @Date: 2023-03-29 16:00:44
*/
export async function uploadBookImgs(books: Book[]) {
  const bookImgs:string[] = []
  const formDatas:WechatMiniprogram.IAnyObject[] = []
  const openid = robokGetStorage("openid");

  // 遍历书本列表，获取书本图片数组以及书本标识数组
  books.forEach((book)=>{

    for (let i = 0; i < 3; i++) {
      bookImgs.push(book[`url${i+1}`])
      formDatas.push({
        rank: (i+1).toString(),
        openid,
        timestamp: book.timestamp,
      })
    }

  })  

  // 调用uploadFiles上传所有图片
  return await uploadFiles({
    filePaths: bookImgs,
    formDatas,
    url:"/seller/set_img"
  })
  
}
