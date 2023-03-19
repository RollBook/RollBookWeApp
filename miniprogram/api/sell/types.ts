/** 卖家信息 */
export interface SellerInfo {
    nickName  : string
    school    : string
    phone     : string
    address   : string
    latitude  : number
    longitude : number
}

/** 书本拍摄状态 */
export type ShotState = 
| "COVER"
| "FLYLEAF"
| "BACK"
