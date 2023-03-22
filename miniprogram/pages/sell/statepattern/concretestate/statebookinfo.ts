import { State } from "../state";
import { Book } from "../../../../api/sell/types";

export default class StateBookInfo implements State{

    /** 书本信息组件实例 */
    private component: WechatMiniprogram.Component.TrivialInstance;

    constructor(){

      this.component = getCurrentPages()
        .pop()?.selectComponent('#bookinfo') as WechatMiniprogram.Component.TrivialInstance;
      // console.log(this.component.data.bookList);
      
      // 根据bookImg页面的图片数目确定书本个数，并初始化书本信息组件的bookList
      const booksTempPaths = getCurrentPages()
        .pop()?.selectComponent('#bookimg')
        .data.booksTempPaths as Array<[string,string,string]>;
      // console.log(booksTempPaths);
      
      const tempBookList:Book[] = this.component.data.bookList;
      let now = new Date().getTime()

      for (let i = 0; i < (booksTempPaths.length - this.component.data.bookList.length); i++) {
        const book:Book = {
          bookName    : "",
          price       : 0.00,
          press       : "",
          status      : 0,
          statusBox   : [],
          tag         : "",
          url1        : booksTempPaths[i][0],
          url2        : booksTempPaths[i][1],
          url3        : booksTempPaths[i][2],
          timestamp   : now.toString(),
          description : ""
        };
        now++;
        tempBookList.push(book);
      }
      
      // 更新组件视图
      this.component.setData({ bookList:tempBookList })
    }

  canIContinue():boolean {
    return true;
  }

  async handleContinue() {

  }

  handleBackwards() {

  }

}