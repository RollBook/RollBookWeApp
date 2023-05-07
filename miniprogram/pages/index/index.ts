// index.ts
import { getIndexSwiper } from "../../api/index/index"

// 获取应用实例
const app = getApp<IAppOption>();

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
    // TODO: 本地缓存轮播图url
    this.setData({
      imgList: (await getIndexSwiper())?.data.data
    });
    
  },
  getUserProfile() {
    
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
      
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
