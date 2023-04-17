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
    if (s==1) {
      m[i][0] = "封面干净"
    }else if(s==2){
      m[i][0] = "无污渍、笔记"
    }else if(s==4){
      m[i][0] = "印刷清晰"
    }else if(s==8){
      m[i][0] = "无缺页、残页"
    }else if(s==3){
      m[i][0] = "封面干净",
      m[i][1] = "无污渍、笔记"
    }else if(s==5){
      m[i][0] = "封面干净",
      m[i][1] = "印刷清晰"
    }else if(s==9){
      m[i][0] = "封面干净"
      m[i][1] = "无缺页、残页"
    }else if(s==6){
      m[i][0] = "无污渍、笔记",
      m[i][1] = "印刷清晰"
    }else if(s==10){
      m[i][0] = "无污渍、笔记",
      m[i][1] = "无缺页、残页"
    }else if(s==12){
      m[i][0] = "印刷清晰",
      m[i][1] = "无缺页、残页"
    }else if(s==7){
      m[i][0] = "封面干净",
      m[i][1] = "无污渍、笔记",
      m[i][2] = "印刷清晰"
    }else if(s==11){
      m[i][0] = "无缺页、残页",
      m[i][1] = "印刷清晰",
      m[i][2] = "无缺页、残页"
    }else if(s==13){
      m[i][0] = "封面干净",
      m[i][1] = "印刷清晰",
      m[i][2] = "无缺页、残页"
    }else if(s==14){
      m[i][0] = "无污渍、笔记",
      m[i][1] = "印刷清晰",
      m[i][2] = "无缺页、残页"
    }else if(s==15){
      m[i][0] = "封面干净",
      m[i][1] = "无污渍、笔记",
      m[i][2] = "印刷清晰",
      m[i][3] = "无缺页、残页"
    }
  }
  return m;
}