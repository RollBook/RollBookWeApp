/// <reference path="./types/index.d.ts" />
import { SellerInfo } from "../miniprogram/api/sell/types";

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    $api?: string,
    isLogin?:boolean,
    robokInfo?: SellerInfo
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}