// pages/cart/cart.ts
import { getCart,delCart } from "../../api/cart/index";
import { cartInfo } from "../../api/cart/types";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    cartList:[] as cartInfo[],
    allChecked:false,
    sum:0,
    show:[],
    idList:[] as string[],
    check:true
  },

  checkboxChange(e:WechatMiniprogram.BaseEvent){
    let sum = 0
    let cartList = this.data.cartList
    cartList[e.currentTarget.id].checked=!cartList[e.currentTarget.id].checked;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].checked) {
        sum = sum + cartList[i].price;
      }
    }
    this.setData({
      cartList:cartList,
      sum:sum
    })
  },
  allCheckboxChange(){
    let cartList = this.data.cartList;
    let sum=0
    this.setData({
      allChecked:!this.data.allChecked
    })
    for (let i = 0; i < cartList.length; i++) {
      if (this.data.allChecked) {
        sum = sum+cartList[i].price;
        cartList[i].checked=true;
      }else{
        sum=0;
        cartList[i].checked=false;
      }
    }
    this.setData({
      cartList:cartList,
      sum:sum
    })
  },
  toGood(e:WechatMiniprogram.BaseEvent){
    var bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/good/good?id='+encodeURIComponent(bookId)
    })
  },

  async delCart(e:WechatMiniprogram.BaseEvent){
    let bookId = e.currentTarget.id
    wx.showModal({
      title: '删除',
      content: '确定删除该商品？',
      async success (res) {
        if (res.confirm) {
          let k = await delCart(bookId)
          if(k.data.data==1){
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000//持续的时间
            })
          }else{
            wx.showToast({
              title: '删除失败',
              icon: 'error',
              duration: 2000//持续的时间
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(){
    let idList:string[] =[]
    var userId = wx.getStorageSync('openid')
    this.setData({
      userId:userId
    })
    let cartList = (await getCart(userId)).data.data;
    cartList.forEach(element => {
      idList.push(element.bookId)
    });
    this.setData({
      cartList:cartList,
      idList:idList
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