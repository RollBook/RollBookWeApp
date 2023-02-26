// components/robok-nav-bar/robok-nav-bar.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示返回按钮
    isShowBack :{
      type:Boolean,
      value:false
    }
  },

  options: {
    styleIsolation: 'shared',
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */

   /*
   * @Description: 页面回退
   * @Author: FAll
   * @Date: 2023-02-26 09:59:35
   */
  methods: {
    goBack:function() {
      wx.navigateBack()
    }
  }
})
