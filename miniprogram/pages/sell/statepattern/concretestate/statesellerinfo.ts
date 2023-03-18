import { State } from "../state";
import { setSellerInfo } from "../../../../api/sell/index";

/**
* 卖家信息状态
*/
export default class StateSellerInfo implements State {

  /**
  * 卖家信息 组件实例
  */
  private component: WechatMiniprogram.Component.TrivialInstance

  constructor() {
    // 初始化组件实例
    this.component = getCurrentPages().pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance;
  }

  canIContinue(): boolean {
    // 更新组件实例
    this.component = getCurrentPages().pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance;

    // 判断信息是否完善
    const sellerInfo = this.component.data.sellerInfo;
    let isInfoComplete = true;
     
    for (const key in sellerInfo) {
      if (Object.prototype.hasOwnProperty.call(sellerInfo, key) && (!sellerInfo[key])) {
        isInfoComplete = false;
      }
    }

    return isInfoComplete;
  }

  async handleContinue() {
    // TODO: 将卖家信息发送至服务器，并在本地缓存
    await setSellerInfo(this.component.data.sellerInfo)
  }

  handleBackwards(): void {
    // 更新组件实例
    this.component = getCurrentPages().pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance;
  }

}