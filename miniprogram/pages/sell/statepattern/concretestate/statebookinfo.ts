import { State } from "../state";
import { Book } from "../../../../api/sell/types";

export default class StateBookInfo implements State{

    /** 书本信息组件实例 */
    private component: WechatMiniprogram.Component.TrivialInstance;

    constructor(){

      this.component = getCurrentPages()
        .pop()?.selectComponent('#bookinfo') as WechatMiniprogram.Component.TrivialInstance;

      // 根据bookImg页面的图片数目确定书本个数，并初始化书本信息组件的bookList
      const booksTempPaths = getCurrentPages()
        .pop()?.selectComponent('#bookimg')
        .data.booksTempPaths as Array<[string,string,string]>

      const tempBookList:Book[] = []
      let now = new Date().getTime()

      booksTempPaths.forEach((bookTempPaths)=>{
        const book:Book = {
          bookName    : "",
          price       : 0.00,
          press       : "",
          status      : 0,
          statusBox   : [],
          tag         : "",
          url1        : bookTempPaths[0],
          url2        : bookTempPaths[1],
          url3        : bookTempPaths[2],
          timestamp   : now.toString(),
          description : ""
        };
        now++;
        tempBookList.push(book);
      })
      
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