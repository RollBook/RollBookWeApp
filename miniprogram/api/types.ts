/** 用户登录态 */
export interface UserSession {
  openid: string,
  session_key: string
}

/** 用户信息 */
export interface UserInfo {
  nickName  : string
  school    : string
  phone     : string
  address   : string
  latitude  : number
  longitude : number
}


