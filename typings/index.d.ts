/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo    ?: WechatMiniprogram.UserInfo,
    $api        ?: string,
    isLogin     ?: boolean,
    robokInfo   ?: RobokInfo,
    openid      ?: string,
    session_key ?: string
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
