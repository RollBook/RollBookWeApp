// pages/good/good.ts
import { getGoodById } from "../../api/good/index";
import { BookInfo,BookId } from "../../api/good/types";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:'',
    goodList:{},
    user_openid:"",
    urlList:[] as string[],
    check:true,
    value:3
  },
  previewImage(e:WechatMiniprogram.BaseEvent){
    let handleUrl = e.currentTarget.dataset.url
    let urls=[]
    for(var i=0;i<3;i++){
      urls[i]=this.data.urlList[i]
    }
    wx.previewImage({
      current: handleUrl,
      urls: urls
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(e:Record<string, string | undefined>) {
    var user_openid = wx.getStorageSync('open_id')
    let a:string |undefined
    if(e.id){
      a = decodeURIComponent(e.id);
    }
    this.setData({
      bookId:a,
      user_openid:user_openid
    });
    let goodList:BookInfo = (await getGoodById(a)).data.data;
    this.setData({
      [`urlList[0]`]:goodList.url1,
      [`urlList[1]`]:goodList.url2,
      [`urlList[2]`]:goodList.url3,
      goodList:goodList
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