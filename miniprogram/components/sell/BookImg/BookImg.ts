// components/sell/BookImg/BookImg.ts
import { ShotState } from "../../../api/sell/types";

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowCamera  : false as boolean,                   // 是否显示相机
    bookImgPreview:"" as string,                        // 预览图片
    shotState     :"COVER" as ShotState,                // 拍摄状态
    booksTempPaths:[] as Array<[string,string,string]>  // 图片暂存路径
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    /*
    * @Description: 拍照
    * @Author: FAll
    * @Date: 2023-03-19 20:07:53
    */
    takePhoto(){
      // 创建相机对象
      const ctx = wx.createCameraContext();
      // 拍照
      ctx.takePhoto({
        quality:"normal",
        success:(res)=>{
          // 预定义下一个状态
          let nextState:ShotState = "COVER";
          // 根据当前状态判断图片存储位置
          switch(this.data.shotState) {
            case "COVER": {
              this.data.booksTempPaths.push([res.tempImagePath,"",""]);
              nextState = "FLYLEAF";
              break;
            }
            case "FLYLEAF":{
              this.data.booksTempPaths[this.data.booksTempPaths.length-1][1] = res.tempImagePath;
              nextState = "BACK";
              break;
            }
            case "BACK":{
              this.data.booksTempPaths[this.data.booksTempPaths.length-1][2] = res.tempImagePath;
              nextState = "COVER";
              wx.showToast({
                title: `第${this.data.booksTempPaths.length}本采集成功`,
                icon: "success",
                duration: 600
              })
              break;
            }
          }
          // 更新显示数据
          this.setData({ 
            booksTempPaths:this.data.booksTempPaths,
            bookImgPreview: res.tempImagePath,
            shotState: nextState
          });
          
        }

      })
    }


  }
})
