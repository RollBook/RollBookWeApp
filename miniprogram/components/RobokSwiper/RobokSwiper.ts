/**
* 自定义图片轮播图
*/
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      value: true as boolean
    },
    // 当前选中的指示点颜色
    indicatorActiveColor: {
      type: String,
      value: "#3bb168" as string
    },
    // 是否自动切换
    autoplay: {
      type: Boolean,
      value: true as boolean
    },
    // 自动切换时间间隔
    interval: {
      type: Number,
      value: 7000 as number
    },
    // 轮播图内容
    items: {
      type:Array,
      value:[] as string[]
    },
  },

  /**
  * 组件声明周期
  */
  lifetimes:{
    attached(){

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    
    /*
    * @Description: 图片加载失败时替换为默认图片
    * @Param: e 图片异常事件
    * @Author: FAll
    * @Date: 2023-02-23 11:03:16
    */
    imgLoadError(e:WechatMiniprogram.ImageError) {
      const index:number = e.currentTarget.dataset.index
      const img:string = `items[${index}]`
      this.setData({
        [img]: "../../img/custom-empty-image.jpg"
      })
    }
  }
})
