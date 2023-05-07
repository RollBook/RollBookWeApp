// pages/search/search.ts
import { SearchEvent } from "../../api/search/types";
import { searchGoods,searchGoodsByHow,searchGoodsByPrice } from "../../api/search/index";
import { getStatus } from "../../api/mall/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:"",
    HRecord:[],
    goodList:[] as String[] | undefined,
    tabs:[{
      id:0,
      name:"综合",
      isActive:false
    },{
      id:1,
      name:"完好度",
      isActive:false
    },{
      id:2,
      name:"价格",
      isActive:false
    }],
    change:[true,false],
    status:[] as string[][]
  },
  searchInput(e:SearchEvent){
    this.setData({
      input:e.detail.value
    })
  },
  async searchButton(){
    let input = this.data.input
    this.setData({
      [`tabs[0].isActive`]:true,
      [`tabs[1].isActive`]:false,
      [`tabs[2].isActive`]:false
    })
    let goodList = (await searchGoods(input)).data.data
    let m:string[][] = getStatus(goodList)
    this.setData({
      goodList:goodList,
      status:m
    })
  },

  tapTo(e:any){
    var bookId = e.currentTarget.dataset.item.bookId;
    wx.navigateTo({
      url:'/pages/good/good?id='+encodeURIComponent(bookId)
    })
  },
  go_update(){
    console.log('我更新啦')
  },



  async handleItem(e:WechatMiniprogram.BaseEvent){
    let input = this.data.input
    let {index} = e.currentTarget.dataset
    let tabs = this.data.tabs
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs:tabs
    })
    if (index==0) {
      let goodList = (await searchGoods(input)).data.data
      let m:string[][] = getStatus(goodList)
      this.setData({
        status:m,
        goodList:goodList,
        [`change[0]`]:true,
        [`change[1]`]:false
      })
    }
    if(index==1){
      let goodList = (await searchGoodsByHow(input)).data.data
      let m:string[][] = getStatus(goodList)
      this.setData({
        status:m,
        goodList:goodList,
        [`change[0]`]:true,
        [`change[1]`]:false
      })
    }
    if(index==2){
      let goodList = (await searchGoodsByPrice(input)).data.data
      let m:string[][] = getStatus(goodList)
      this.setData({
        status:m,
        goodList:goodList,
        [`change[0]`]:true,
        [`change[1]`]:false
      })
    }
  },
  handleChange(e:WechatMiniprogram.BaseEvent){
    let i 
    let mid
    let mid2
    let goodList:String[] | undefined=this.data.goodList!
    let status=this.data.status
    let change0 = !(this.data.change[0])
    let change1 = !(this.data.change[1])
    this.setData({
      [`change[0]`]:change0,
      [`change[1]`]:change1
    })
    for(i=0;i<goodList.length/2;i++){
      mid = goodList[i]
      mid2 = status[i]
      goodList[i]=goodList[goodList.length-1-i]
      status[i]=status[goodList.length-1-i]
      goodList[goodList.length-1-i] = mid
      status[goodList.length-1-i]=mid2
    }
    this.setData({
      status:status,
      goodList:goodList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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