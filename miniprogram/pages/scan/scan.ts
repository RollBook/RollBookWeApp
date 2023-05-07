// pages/scan/scan.ts
import { ChangeEvent } from "../../api/bookshelf/types";
import { getSaveBook,getPickBook,saveBook, pickBook } from "../../api/scan/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    bookList: [] as String[] | undefined,
    orderList:[] as String[] | undefined,
  },

    //切换书架
    onChange:async function(event:ChangeEvent) {
      let tag:string = ""
      if(event.detail.index===0) {
        tag = "存书";
        this.setData({
          bookList: (await getSaveBook())?.data?.data
        })
      }else{
        tag = "取书";
        const ret = (await getPickBook()).data.data
        this.setData({
          orderList: ret
        })
      }
      wx.showToast({
        title: `切换到 ${tag}`,
        icon: 'none'
      });
    },

    async saveBook(e:WechatMiniprogram.BaseEvent){
      let ret = (await saveBook(e.currentTarget.dataset.item.bookId)).data.data
      if (ret==2) {
        this.onLoad();
        wx.showToast({
          title: '成功存入',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '存入失败',
          icon: 'error',
          duration: 2000
        })
      }
    },

    async pickBook(e:WechatMiniprogram.BaseEvent){
      let ret = (await pickBook(e.currentTarget.dataset.item.orderId)).data.data
      if (ret==2) {
        this.onLoad();
        wx.showToast({
          title: '成功取出',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '取出失败',
          icon: 'error',
          duration: 2000
        })
      }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function() {
    let bookList = (await getSaveBook())?.data?.data
    let orderList = (await getPickBook()).data.data
    this.setData({
      bookList: bookList,
      orderList: orderList
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