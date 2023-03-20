import { State } from "../state";

export default class StateBookImg implements State {

  /** 书本图片组件实例 */
  private component: WechatMiniprogram.Component.TrivialInstance;

  constructor(){
    
    // 组件实例初始化
    this.component = getCurrentPages()
      .pop()?.selectComponent('#bookimg') as WechatMiniprogram.Component.TrivialInstance;
    
  }

  canIContinue():boolean {
    // 更新组件实例
    this.component = getCurrentPages()
      .pop()?.selectComponent('#bookimg') as WechatMiniprogram.Component.TrivialInstance;

    // 判断最后一本书图片是拍摄完成
    const booksTempPaths:Array<[string,string,string]> = this.component.data.booksTempPaths
    if(booksTempPaths.length === 0)
      return false;
     
    let ret = true;
    booksTempPaths[booksTempPaths.length-1].forEach((bookPath:string)=>{
      if(bookPath.trim() === "") {
        ret = false;
      }
    })
    return ret;
  }

  async handleContinue() {

  }

  handleBackwards() {

  }
}