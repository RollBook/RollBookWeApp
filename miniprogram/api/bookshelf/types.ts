export interface BookInfo{
  bookId      : string
  openId      : string
  bookName    : string
  price       : number
  pressId     : number
  status      : number
  audit       : number
  tagId       : number
  url1        : string
  url2        : string
  url3        : string
  description : string
  timeStamp   : string
}

interface DetailInfo{
  index :number
  name  :number
  title :string
}

export type ChangeEvent = WechatMiniprogram.CustomEvent<DetailInfo>