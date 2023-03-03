import { State } from "../state";

/**
* 卖家信息状态
*/
export default class StateSellerInfo implements State {

  /**
  * 卖家信息 组件实例
  */
  private component:WechatMiniprogram.Component.TrivialInstance

  constructor() {
    // 初始化组件实例
    this.component = getCurrentPages().pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance
  }

  canIContinue(): boolean { 
    // 更新组件实例
    this.component = getCurrentPages().pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance
    const sellerInfo = this.component.data.sellerInfo;
    let isInfoComplete = true;
    // 判断信息是否完善
    for (const key in sellerInfo) {
      if (Object.prototype.hasOwnProperty.call(sellerInfo, key)) {
        const element = sellerInfo[key];
        if(!element) {
          isInfoComplete = false
        }
      }
    }
    
    return isInfoComplete
  }

  handleContinue(): void {
    
  }

  handleBackwards(): void {
    // 更新组件实例
    this.component = getCurrentPages().pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance
  }
  
}