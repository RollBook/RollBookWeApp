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
      icon:"icon-book1",
      text: "首 页"
    }, {
      pagePath: "../bookshelf/bookshelf",
      icon:"icon-bookcaselibrarybookshelf",
      text: "书 架"
    }, {
      pagePath: "../user/user",
      icon:"icon-yonghu1",
      text: "用 户"
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
