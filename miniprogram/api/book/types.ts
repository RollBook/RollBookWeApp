export interface BookInfo{
  bookId : string,
  openId : string,
  bookName : string,
  price : number,
  pressId : number,
  status : string,
  audit : number,
  tagId : number,
  url1 : string,
  url2 : string,
  url3 : string,
  description : string,
  timeStamp : string
}

interface DetailInfo{
  index:number,
  name:number,
  title:string

}

export interface changeEvent extends DetailInfo{
  detail : DetailInfo
}