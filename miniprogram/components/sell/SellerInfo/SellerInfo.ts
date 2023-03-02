// components/sell/BookInfo/BookInfo.ts
import { SellerInfo } from "../../../api/sell/types";

let timer:number|undefined = undefined; // 定时器序号
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    sellerInfo:{
      nickName:'',
      school  :'',
      address :'',
      phoneNum:''
    } as SellerInfo,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 设定卖家信息
    setSellerInfo(e:WechatMiniprogram.Input){
      console.log(e);
      
      // 防抖
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(()=>{
        // 初始化临时对象
        let temp:SellerInfo; 
        temp = this.data.sellerInfo
        // 修改临时对象
        switch(e.currentTarget.id) {
          case 'nickName': {
            temp.nickName =  e.detail.value
            break;
          }
          case "school": {
            temp.school = e.detail.value
            break;
          }
        }
        // 赋值给卖家信息
        this.setData({
          sellerInfo:temp
        })
        console.log(this.data.sellerInfo);
        
      },500)
    }
  }
})
