import { State } from "../state";
import { setSellerInfo } from "../../../../api/sell/index";
import { SellerInfo } from "../../../../api/sell/types";
import { tempSellerInfo, isModifySellerInfo, setModifySellerInfo }
  from "../../../../components/sell/SellerInfo/SellerInfo";

/**
* 卖家信息状态
*/
export default class StateSellerInfo implements State {

  /** 卖家信息 组件实例 */
  private component: WechatMiniprogram.Component.TrivialInstance;

  constructor() {
    
    // 初始化组件实例
    this.component = getCurrentPages()
      .pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance;
    // 从缓存中获取卖家信息
    const storedSellerInfo = wx.getStorageSync("sellerInfo") as SellerInfo;
    // 如果缓存信息不存在，则向服务器请求买家信息
    if (!storedSellerInfo) {
      let openid = wx.getStorageSync('openid');
      let session_key = wx.getStorageSync('session_key');

      wx.request({
        url: getApp<IAppOption>().globalData.$api + "/seller/get_seller_info",
        method: "GET",
        header: {
          openid,
          session_key
        },
        success: (res: any) => {
          this.initSellerInfoAndTempInfo(tempSellerInfo, res.data.data);
        }
      })
    } else {
      this.initSellerInfoAndTempInfo(tempSellerInfo, storedSellerInfo);
    }

  }

  canIContinue(): boolean {
    // 更新组件实例
    this.component = getCurrentPages()
      .pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance;

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
    if (isModifySellerInfo) {
      // 如果信息修改，将新的卖家信息发送至服务器，并在本地缓存
      await wx.showLoading({
        title: "信息同步中"
      })
      const ret = await setSellerInfo(this.component.data.sellerInfo);
      await wx.hideLoading()
      wx.setStorageSync("sellerInfo", this.component.data.sellerInfo);
      setModifySellerInfo(false);
      wx.showToast({
        title: ret.statusCode === 200 ? "同步成功" : "同步失败",
        icon: ret.statusCode === 200 ? "success" : "error",
        duration: 300
      })
    }
  }

  handleBackwards(): void {
    // 更新组件实例
    this.component = getCurrentPages()
      .pop()?.selectComponent('#sellerinfo') as WechatMiniprogram.Component.TrivialInstance;
  }

  /*
* @Description: 初始化卖家对象和临时对象
* @Param: tempSellerInfo 临时对象
* @Param: tempSellerInfo 本地/远程 存储对象
* @Author: FAll
* @Date: 2023-03-18 17:57:01
*/
  initSellerInfoAndTempInfo(tempSellerInfo: SellerInfo, storedSellerInfo: SellerInfo) {
    // 初始化临时卖家对象
    for (const key in storedSellerInfo) {
      if (Object.prototype.hasOwnProperty.call(storedSellerInfo, key)) {
        tempSellerInfo[key] = storedSellerInfo[key];
      }
    }
    // 初始化卖家对象
    this.component.setData({
      sellerInfo: storedSellerInfo
    });

  }

}