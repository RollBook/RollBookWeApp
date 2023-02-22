// custom-tab-bar/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  options: {
    styleIsolation: 'shared',
  },

  /**
   * 选项卡初始数据
   */
  data: {
    selected: 0 as number,
    color: "#737674" as string,
    selectedColor: "#26ff8e" as string,
    list: [{
      pagePath: "../index/index",
      icon:"home-o",
      text: "首页"
    }, {
      pagePath: "../bookshelf/bookshelf",
      icon:"tosend",
      text: "书架"
    }, {
      pagePath: "../user/user",
      icon:"user-o",
      text: "用户"
    }] as {
      pagePath: string,
      icon: string,
      text: string
    }[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换选项卡
    switchTab(e:WechatMiniprogram.BaseEvent) {
      const data:Record<string, any> = e.currentTarget.dataset
      const url:string = data.path
      
      wx.switchTab({url})
      this.setData({
        selected: data.index as number
      })
    }

  }
})
