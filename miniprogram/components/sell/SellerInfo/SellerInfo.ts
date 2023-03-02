// components/sell/BookInfo/BookInfo.ts
import { SellerInfo } from "../../../api/sell/types";
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
    // 设定书本信息
    setSellerInfo(e:WechatMiniprogram.BaseEvent){
      // 防抖
      console.log(e);
      
      
    }
  }
})
