// pages/bookshelf/bookshelf.ts
import { ChangeEvent } from "../../api/bookshelf/types";
import { getSellBook,getOrder } from "../../api/bookshelf/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    bookList: [] as String[] | undefined,
    orderList:[] as String[] | undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function() {
    //更新tabbar激活状态
    if(typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        active:1
      })
    }
    const ret = (await getSellBook())?.data?.data
    this.setData({
      bookList: ret?ret:undefined
    })
    
  },

  //切换书架
   onChange:async function(event:ChangeEvent) {
    let tag:string = ""
    if(event.detail.index===0) {
      tag = "卖书书架";
      this.setData({
        bookList: (await getSellBook())?.data?.data
      })
    }else{
      tag = "买书书架";
      const ret = (await getOrder()).data.data
      this.setData({
        orderList: ret
      })
    }
    wx.showToast({
      title: `切换到 ${tag}`,
      icon: 'none'
    });
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