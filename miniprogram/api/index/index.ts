import { request } from "../../utils/request/index";
import { RobokPromise } from "../../utils/request/types";

/*
* @Description: 获取首页轮播图
* @Author: FAll
* @Date: 2023-02-24 10:55:18
*/
export async function getIndexSwiper():RobokPromise<string[]> {
  return await request({url:"/rollbook/get_index_swiper",method:"GET"})
}