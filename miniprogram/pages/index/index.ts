// index.ts
import { robokGetStorage, robokSetStorage } from "../../api/index";
import { getIndexSwiper } from "../../api/index/index"

// 获取应用实例
// const app = getApp<IAppOption>();

Page({
  data: {
    imgList: [] as string[]
  },

  scan(){
    wx.scanCode({
      success (res) {
        if (res.result=="RollBook二手书屋") {
          wx.navigateTo({
            url: '/pages/scan/scan',
          })
        }
      }
    })
  },

  onLoad:async function() {
    
    // 更新tabbar激活状态
    if(typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        active:0
      });
    }
   
    // 获取并设置首页轮播url
    let indexSwiper = robokGetStorage<string[]>("indexSwiper");    
    
    if(typeof indexSwiper === "string" || !indexSwiper) {
      indexSwiper = (await getIndexSwiper())?.data.data;
      robokSetStorage("indexSwiper",indexSwiper);
    }

    this.setData({
      imgList: indexSwiper
    });
    
  },

  /*
  * @Description: 跳转不同功能页
  * @Param: e 事件对象
  * @Author: FAll
  * @Date: 2023-03-31 16:43:47
  */
  navigateTo(e:WechatMiniprogram.BaseEvent):void{
    switch (e.currentTarget.id) {
      case "1":{
        wx.navigateTo({
          url:"/pages/mall/mall"
        })
        break;
      }
      case "2":{
        wx.navigateTo({
          url:"/pages/sell/sell"
        })
        break;
      }
      case "3":{
        wx.navigateTo({
          url:"/pages/scan/scan"
        })
        break;
      }
      case "4":{
        wx.showToast({
          title:"敬请期待"
        })
        break;
      }
    }
    
  }

})
