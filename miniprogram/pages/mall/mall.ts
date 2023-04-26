// pages/mall/mall.ts
// import { goodInfo } from "../../api/mall/types";
import { getMallSwiper,getGoods,getStatus } from "../../api/mall/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[
      {
        image_src:'../../img/A-sixiang.svg',
        name:'分享小间'
      },
      {
        image_src:'../../img/F-jingji.svg',
        name:'提升空间'
      },
      {
        image_src:'../../img/O-shuxue.svg',
        name:'智慧书屋'
      },
      {
        image_src:'../../img/G-wenhua.svg',
        name:'轻享书角'
      }
    ],
    swiperList:[] as String[] | undefined,
    goodsList: [] as String[] | undefined,
    nowPage:1,
    totalPage:1,
    status:[] as string[][]
  },
  tapTo(e:WechatMiniprogram.BaseEvent){
    var bookId = e.currentTarget.dataset.item.bookId;
    wx.navigateTo({
      url:'/pages/good/good?id='+encodeURIComponent(bookId)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function() {

    //获取商城轮播图
    let ret = (await getMallSwiper()).data.data
    this.setData({
      swiperList: ret?ret:undefined
    })
    
    //初始化加载商品
    let nowPage = 1;
    let goodsList = (await getGoods(nowPage)).data.data
    let m:string[][] = getStatus(goodsList);
    this.setData({
      goodsList: goodsList?goodsList:undefined,
      nowPage:nowPage+1,
      status:m
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
  onReachBottom:async function() {
    //下拉触底加载后续商品
    let nowPage = this.data.nowPage;
    let goodsList = this.data.goodsList;
    let status = this.data.status;
    let newGoodsList = (await getGoods(nowPage)).data.data;
    let m:string[][] = getStatus(newGoodsList);  
    goodsList = goodsList?.concat(newGoodsList);
    status = status.concat(m);
    this.setData({
      goodsList: goodsList?goodsList:undefined,
      nowPage:nowPage+1,
      status:status
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})