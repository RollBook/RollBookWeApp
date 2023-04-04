import { UserInfo } from "../types";

/** 卖家信息 */
export type SellerInfo = UserInfo

/** 书本 */
export interface Book {
  bookName    : string
  price       : number
  press       : string
  status      : number
  statusBox   : StatusBox
  tag         : string
  url1        : string
  url2        : string
  url3        : string
  description : string
  timestamp   : string
}

export type StatusBox = Array<"8"|"4"|"2"|"1">

/** 书本拍摄状态 */
export type ShotState = 
| "COVER"
| "FLYLEAF"
| "BACK"

/** 书本状态 */
export enum BookState {
  COMPLETE    = 8,  // 无缺页、残页
  CLEARPRINT  = 4,  // 印刷清晰
  NOPAINTING  = 2,  // 无污渍、笔记
  CLEARCOVER  = 1   // 封面干净
}

/** 自定义书本信息输入事件 */
export type BookOnSaleInput<Mark extends WechatMiniprogram.IAnyObject = WechatMiniprogram.IAnyObject,
  TargetDataset extends WechatMiniprogram.IAnyObject = WechatMiniprogram.IAnyObject
    > = WechatMiniprogram.CustomEvent<
    StatusBox|String|Number,
    Mark,
    TargetDataset
    >