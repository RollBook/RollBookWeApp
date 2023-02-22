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
    active: null as number|null,
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
    async switchTab(e:any) {
      await wx.switchTab({
        url:this.data.list[e.detail as number].pagePath
      })
    }

  }
})
