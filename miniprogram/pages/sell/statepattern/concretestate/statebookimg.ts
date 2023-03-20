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
    return true;
  }

  async handleContinue() {

  }

  handleBackwards() {

  }
}