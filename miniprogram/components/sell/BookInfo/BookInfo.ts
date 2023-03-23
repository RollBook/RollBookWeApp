// components/sell/BookStatus/BookStatus.ts
import { Book,BookOnSaleInput,StatusBox } from "../../../api/sell/types";

let timer:number|undefined = undefined;       // 定时器序号
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
    bookList:[] as Book[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e:BookOnSaleInput) {

      switch(e.currentTarget.dataset.type) {
        case "status": {
          this.data.bookList[e.currentTarget.dataset.index].statusBox = e.detail as StatusBox;
          break;
        }
        case "bookName": {
          this.data.bookList[e.currentTarget.dataset.index].bookName = e.detail as string;
          break;
        }
        case "price": {
          this.data.bookList[e.currentTarget.dataset.index].price = e.detail as number;
          break;
        }
        case "description":{
          this.data.bookList[e.currentTarget.dataset.index].description = e.detail as string;
          break;
        }
      };
      // 页面防抖
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        // 书本列表试图更新
        this.setData({
          bookList:this.data.bookList
        });
        
      }, 500);
      
    }
  }
})
