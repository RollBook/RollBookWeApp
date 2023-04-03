const app = getApp<IAppOption>();

/*
* @Description: 封装wx缓存
* @Param: key 缓存对象key
* @Param: object 缓存对象值
* @Author: FAll
* @Date: 2023-04-03 17:13:12
*/
export function robokSetStorage<T extends Object>(key:string,object:T) {

  wx.setStorageSync(key,object);

  if(app.globalData.hasOwnProperty(key)) {
    app.globalData[key] = object;
  }
  
}

/*
* @Description: 封装wx获取缓存
* @Param: key 缓存对象key
* @Author: FAll
* @Date: 2023-04-03 17:14:15
*/
export function robokGetStorage<T extends Object>(key:string):T {

  if(app.globalData[key]) {
    return app.globalData[key];
  }

  app.globalData[key] = wx.getStorageSync(key);
  return app.globalData[key];
}

/*
* @Description: 小程序显示模态框
* @Param: params 模态框参数 https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showModal.html
* @Author: FAll
* @Date: 2023-02-25 19:18:08
*/
export async function robokShowModal<T extends WechatMiniprogram.ShowModalOption = WechatMiniprogram.ShowModalOption>(
  option?: T) {
  wx.showModal({
    title: "罗伯克书屋",
    confirmColor: "#38b48b",
    ...option
  })
}
