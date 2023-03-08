
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