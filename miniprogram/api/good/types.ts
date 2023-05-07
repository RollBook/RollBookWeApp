export interface BookId{
  id:string;
}

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

export interface Sign{
  timeStamp: string,
  nonceStr: string,
  package: string,
  signType: "MD5" | "HMAC-SHA256" | "RSA" | undefined,
  paySign: string,
}
