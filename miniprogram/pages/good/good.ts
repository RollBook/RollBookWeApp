// pages/good/good.ts
import { cartInfo } from "../../api/cart/types";
import { getGoodById,addCart, pay } from "../../api/good/index";
import { BookInfo, Sign } from "../../api/good/types";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:'',
    goodList:{} as BookInfo,
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
  async addCart() {
    let goodList = this.data.goodList;
    let cart:cartInfo ={
      bookId:"",
      sellId:"",
      bookName:"",
      price:0,
      url1:"",
      description:"",
      userId:"",
      checked:false
    }
    cart.bookId = goodList.bookId,
    cart.sellId = goodList.openId,
    cart.bookName = goodList.bookName,
    cart.price = goodList.price,
    cart.url1 = goodList.url1,
    cart.description = goodList.description,
    cart.userId = this.data.user_openid;
    cart.checked = false;
    let res = await addCart(cart);
    if(res.data.data==1){
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        duration: 2000//持续的时间
      })
    }else{
      wx.showToast({
        title: '已在购物车中',
        icon: 'error',
        duration: 2000//持续的时间
      })
    }
    
  },

  async pay(){
    let goodList = this.data.goodList;
    let price = goodList.price*100
    let sign:Sign = (await pay(1,this.data.user_openid,goodList.openId,goodList.bookId)).data.data;
    wx.requestPayment({
      timeStamp: sign.timeStamp,
      nonceStr: sign.nonceStr,
      package: sign.package,
      signType: sign.signType,
      paySign: sign.paySign,
      success (res) { 
        console.log('success:' + JSON.stringify(res));
        let pages = getCurrentPages();
        let beforePage = pages[pages.length -2]; 
        beforePage.go_update(); 
        wx.navigateBack({
          delta:1
        })
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail (res) { 
        console.log('fail:' + JSON.stringify(res));
        wx.showToast({
          title: '支付失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(e:Record<string, string | undefined>) {
    var user_openid = wx.getStorageSync('openid')
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