/** 卖家信息 */
export interface SellerInfo {
    nickName  : string
    school    : string
    phone     : string
    address   : string
    latitude  : number
    longitude : number
}

/** 书本 */
export interface Book {
  bookName    : string
  price       : number
  press       : string
  status      : number
  statusBox   : Array<"8"|"4"|"2"|"1">
  tag         : string
  url1        : string
  url2        : string
  url3        : string
  description : string
  timestamp   : string
}

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
