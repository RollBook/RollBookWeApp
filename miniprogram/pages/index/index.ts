// index.ts
import { getIndexSwiper } from "../../api/index/index"

// 获取应用实例
const app = getApp<IAppOption>();

Page({
  data: {
    imgList: [] as string[]
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
      imgList: (await getIndexSwiper())?.data?.data
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

})
