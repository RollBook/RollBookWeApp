// pages/user/user.ts
import { robokGetStorage,robokSetStorage } from "../../api/index";
import { getUserInfo } from "../../api/index";
import { UserInfo } from "../../api/types";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName  : "" as string,
    avatar    : "" as string
  },

  cartTo(){
    wx.navigateTo({
      url:'/pages/cart/cart'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    //更新tabbar激活状态
    if(typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        active:2
      })
    }
    let userInfo = robokGetStorage<UserInfo>("robokInfo");
    if(!userInfo) {
      userInfo = (await getUserInfo()).data.data;
      robokSetStorage("robokInfo",userInfo);
    }
    
    // 显示昵称
    this.setData({
      nickName: userInfo.nickName
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})