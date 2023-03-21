// components/sell/BookStatus/BookStatus.ts
import { Book } from "../../../api/sell/types";

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
    onChange(e:WechatMiniprogram.Input) {
      console.log(e);
      
    }
  }
})
