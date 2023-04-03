// components/sell/BookInfo/BookInfo.ts
import { SellerInfo } from "../../../api/sell/types";
import { getPhoneNumber } from "../../../api/sell/index";
import { robokSetStorage } from "../../../api/index";

let timer:number|undefined = undefined;       // 定时器序号
export let isModifySellerInfo:boolean = false // 是否修改了卖家信息
/**对外导出状态修改方法 */
export function setModifySellerInfo(isModify:boolean):void{
  isModifySellerInfo = isModify;
}
export let tempSellerInfo:SellerInfo = {      // 临时卖家对象
  nickName  :'',
  school    :'',
  address   :'',
  phone     :'',
  longitude :0,
  latitude  :0
};

Component({
  /**
   * 组件的初始数据
   */
  data: {
    // 卖家信息
    sellerInfo:{
      nickName  :'',
      school    :'',
      address   :'',
      phone     :'',
      longitude :0,
      latitude  :0
    } as SellerInfo
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
    * @Description: 设定卖家 昵称&学校 信息
    * @Param: e 输入事件对象
    * @Author: FAll
    * @Date: 2023-03-02 16:25:22
    */
    setSellerInfo(e:WechatMiniprogram.Input){
      // 修改临时对象
      switch(e.currentTarget.id) {
        case 'nickName': {
          tempSellerInfo.nickName =  e.detail.value;
          break;
        }
        case "school": {
          tempSellerInfo.school = e.detail.value;
          break;
        }
      }
      // 页面防抖
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        // 赋值给卖家信息
        this.setData({
          sellerInfo:tempSellerInfo
        });
        robokSetStorage("userInfo",tempSellerInfo);
        isModifySellerInfo = true;
      }, 500);
    },

    /*
    * @Description: 获取地址信息
    * @Author: FAll
    * @Date: 2023-03-02 17:53:52
    */
   getAddress() {
    // 打开地图选择位置
    wx.chooseLocation({
      success:(res)=>{
        tempSellerInfo.address = res.address;
        tempSellerInfo.latitude = res.latitude;
        tempSellerInfo.longitude = res.longitude;
        this.setData({
          sellerInfo: tempSellerInfo
        });
        isModifySellerInfo = true;
      },
      fail:(err)=>{
        console.log(err);
      }
    });
   },

   /*
   * @Description: 获取手机号
   * @Param: e 获取手机号码事件对象
   * @Author: FAll
   * @Date: 2023-03-02 18:30:30
   */
  getPhoneNum: async function(e:WechatMiniprogram.ButtonGetPhoneNumber){

    // 用户取消获取
    if(e.detail.errMsg.match('fail')) {
      return;
    }
    // 请求获取用户手机号码
    let res = await getPhoneNumber(e.detail.code);
    if(!res.data.data){
      return;
    }
    tempSellerInfo.phone = res.data.data.valueOf();
    this.setData({
      sellerInfo:tempSellerInfo
    });
    isModifySellerInfo = true;
  }

  } 
})
