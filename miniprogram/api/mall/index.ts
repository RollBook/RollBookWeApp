import { request } from "../../utils/request/index";

export async function getMallSwiper(){
  return await request<string[]>({url:"/mall/get_mall_swiper",method:"GET",auth:true})
}

export async function getGoods(nowPage:number) {
  return await request<string[]>({url:"/mall/get_goods",method:"GET",auth:true,data:{
    nowPage
  }})
}

export function getStatus(goodsList:String[]){
  let m:string[][] = []
  for (let j = 0; j < goodsList.length; j++) {
    m[j] = []
  }
  for (let i = 0; i < goodsList.length; i++) {
    const s = goodsList[i]["status"];
    let a = bookDecode(s);  
    for (let j = 0; j < a.length; j++) {
      switch (a[j]) {
        case 1:
          m[i][j] = "封面干净"
          break;
        case 2:
          m[i][j] = "无污渍、笔记"
          break;
        case 4:
          m[i][j] = "印刷清晰"
          break;
        case 8:
          m[i][j] = "无缺页、残页"
          break;
      } 
    }
  }
  return m;
}


function bookDecode(status:number) {
  return [1,2,4,8]
  .map((statusCode)=>{
    return (status&statusCode)
  })
  .filter((status)=>{return status!== 0})
}