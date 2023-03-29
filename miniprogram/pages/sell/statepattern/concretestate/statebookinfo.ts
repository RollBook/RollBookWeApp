import { State } from "../state";
import { addBooks,uploadBookImgs } from "../../../../api/sell/index";
import { Book } from "../../../../api/sell/types";
import { uploadFile,uploadFiles } from "../../../../utils/request/index";

export default class StateBookInfo implements State{

    /** 书本信息组件实例 */
    private component: WechatMiniprogram.Component.TrivialInstance;

    constructor(){

      this.component = getCurrentPages()
        .pop()?.selectComponent('#bookinfo') as WechatMiniprogram.Component.TrivialInstance
      
      // 根据bookImg页面的图片数目确定书本个数，并初始化书本信息组件的bookList
      const booksTempPaths = getCurrentPages()
        .pop()?.selectComponent('#bookimg')
        .data.booksTempPaths as Array<[string,string,string]>
      
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

    // 更新组件实例
    this.component = getCurrentPages()
    .pop()?.selectComponent('#bookinfo') as WechatMiniprogram.Component.TrivialInstance;

    // 检查书本必填信息是否完整
    const bookList:Book[] = this.component.data.bookList
    
    let isListOk:boolean = true;
    bookList.forEach((book)=>{
      // 检查必要信息
      if(book.bookName.trim() === "" || book.price === 0) {
        isListOk = false;
        return;
      }
      
      // 根据书本statusBox初始化status
      book.statusBox.forEach(status=>{
        book.status = book.status | parseInt(status)
      })  

    })

    this.component.setData({
      bookList:bookList
    })
  
    return isListOk;
    
  }

  async handleContinue() {
    // 更新组件实例
    this.component = getCurrentPages()
    .pop()?.selectComponent('#bookinfo') as WechatMiniprogram.Component.TrivialInstance;
  
    // 请求添加书本接口，上架书本
    const ret = await (await addBooks(this.component.data.bookList)).data;
    if(ret.status === 200) {
      // 上架成功则请求上传书本图片
      await uploadBookImgs(this.component.data.bookList);
      wx.redirectTo({
        url:"/pages/index/index"
      })

      setTimeout(()=>{
        wx.showToast({
          title:"上传成功"
        })
      },500)
      
    } else {
      wx.showToast({
        title   : "上传错误",
        icon    : "error",
        duration: 3000 
      })
    }
    
  }

  handleBackwards() {

  }

}