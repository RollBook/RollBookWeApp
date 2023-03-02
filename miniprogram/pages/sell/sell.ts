// pages/sell/sell.ts
import { getComponent } from "./statepattern/statemachine";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '信息',
        desc: '完善信息',
      },
      {
        text: '照片',
        desc: '选择上传书本图片',
      },
      {
        text: '保证',
        desc: '书本质量保证',
      },
      {
        text: '提交审核',
        desc: '待审核',
      },
    ],
  },

  pageChange:async function(e:WechatMiniprogram.SwiperChange){
    getComponent()
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
    getComponent()
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