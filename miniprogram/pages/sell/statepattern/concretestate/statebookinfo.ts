import { State } from "../state";


export default class StateBookInfo implements State{

    /** 书本信息组件实例 */
    private component: WechatMiniprogram.Component.TrivialInstance;

    constructor(){
      this.component = getCurrentPages()
        .pop()?.selectComponent('#bookinfo') as WechatMiniprogram.Component.TrivialInstance;
    }

  canIContinue():boolean {
    return true;
  }

  async handleContinue() {

  }

  handleBackwards() {

  }

}