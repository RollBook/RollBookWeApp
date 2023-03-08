// pages/sell/sell.ts
import { robokShowModal } from "../../api/index";
import SellerStateMachine from "./statepattern/statemachine";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 步骤条 */
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
    /** 页面状态机 */
    machine: undefined as SellerStateMachine|undefined,
    /** 当前轮播索引 */
    swiperIndex: 0
  },

  /*
  * @Description: 轮播页面切换处理器
  * @Param: e 轮播切换事件对象
  * @Author: FAll
  * @Date: 2023-03-03 15:08:52
  */
  pageChange:async function(e:WechatMiniprogram.SwiperChange) {

    const state = this.data.machine?.getState();
    
    if(e.detail.current - this.data.swiperIndex > 0) {
      // 用户想要进入下一步
      if(state?.canIContinue()) {
        // 满足条件，进入下一步
        state.handleContinue();
        this.data.swiperIndex = e.detail.current;
      } else {
        // 不满足条件，退回当前页
        this.setData({
          swiperIndex:this.data.swiperIndex
        })
        // 模态框提示条件不满足
        robokShowModal({
          content:'请补全信息 (=￣▽￣=)'
        })
        
      }
    } else {
      // 用户想要退回上一步
      state?.handleBackwards();
      this.data.swiperIndex = e.detail.current;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.data.machine = new SellerStateMachine()
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