import { request } from "../../utils/request/index";

/*
* @Description: 获取首页轮播图
* @Author: FAll
* @Date: 2023-02-24 10:55:18
*/
export async function getIndexSwiper() {
  return await request({url:"/rollbook/get_index_swiper",method:"GET"})
}