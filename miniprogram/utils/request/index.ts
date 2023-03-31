import { RobokWechatRequest,RobokWechatResponse,uploadFilesOptions } from './types'

const app = getApp<IAppOption>()

/*
* @Description: 封装wx网络请求
* @Param: params http请求参数
* @Param: auth 接口是否需要鉴权
* @Author: FAll
* @Date: 2023-02-23 15:58:49
*/
export async function request<T extends object>(requestparams: RobokWechatRequest<T>):Promise<RobokWechatResponse<T>> {

  // 从全局变量中读取baseURL
  const baseURL: string | undefined = app.globalData.$api;

  // 如果调用方未定义header，则header定义为空对象
  requestparams.header = requestparams.header ? requestparams.header : { };

  // 需要鉴权，则header中添加key
  if (requestparams.auth) {
    requestparams.header.openid = wx.getStorageSync('openid');
    requestparams.header.session_key = wx.getStorageSync('session_key');
  }

  // 方法为POST，则默认content-type为application/json
  if(requestparams.method === "POST") {
    requestparams.header = {
      ...requestparams.header,
      "content-type":"application/json",
    };
  }

  // 封装wx.request()为Promise并返回
  return new Promise((resolve, reject) => {
    wx.request({
      ...requestparams,
      url: baseURL + requestparams.url,
      timeout: 6000,
      success: (result:RobokWechatResponse<T>) => {
        if(result.statusCode === 500) {
          wx.showToast({
            title:"服务异常",
            icon:"error",
            duration:1000
          });
          reject(result);
        }
        
        // 成功取得响应，则完成Promise
        resolve(result);
      },
      fail: (err) => {
        // 请求超时或服务未启动，提示服务异常，拒绝Promise
        wx.showToast({
          title:"服务异常",
          icon:"error",
          duration:1000
        });
        
        reject(err);
      }
    });
  });
}


/*
* @Description: 封装wx文件上传
* @Param: uploadOption 文件上传请求参数
* @Author: FAll
* @Date: 2023-03-26 21:41:23
*/
export async function uploadFile(uploadOption:WechatMiniprogram.UploadFileOption):Promise<WechatMiniprogram.UploadFileSuccessCallbackResult> {

  const baseURL: string | undefined = app.globalData.$api;
  uploadOption.header = uploadOption.header ? uploadOption.header : { };

  uploadOption.header = {
    openid      : wx.getStorageSync('openid'),
    session_key : wx.getStorageSync('session_key')
  }

  return new Promise((resolve,reject)=>{
    wx.uploadFile({
      ...uploadOption,
      url: baseURL + uploadOption.url,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err)
      }
    })

  })
}

/*
* @Description: 封装wx多个文件上传
* @Param: uploadOptions 自定义多文件上传options
* @Author: FAll
* @Date: 2023-03-29 15:41:30
*/
export async function uploadFiles(uploadOptions:uploadFilesOptions) {
  
  const baseURL: string | undefined = app.globalData.$api;
  const uploadPromises:Promise<WechatMiniprogram.UploadFileSuccessCallbackResult>[] = [];
  const formDatas = uploadOptions.formDatas;
  uploadOptions.header = uploadOptions.header ? uploadOptions.header : { };

  uploadOptions.header = {
    openid      : wx.getStorageSync('openid'),
    session_key : wx.getStorageSync('session_key')
  }

  wx.showLoading({
    title : "上传中",
    mask  : true
  })

  let isUploadErrorOccur:boolean = false;

    // 遍历文件地址数组，初始化文件上传promises数组
    uploadOptions.filePaths.forEach((path,index)=>{
      
      // 单个文件上传promise给push进promises数组，包含文件本体以及formData
      uploadPromises.push(new Promise((resolve,reject)=>{
        wx.uploadFile({
          ...uploadOptions,
          timeout: 6000,
          filePath: path,
          url: baseURL + uploadOptions.url,
          name:"files",
          formData:{
            ...formDatas[index]
          },
          success: (ret=>{
            if(ret.statusCode != 200) {
              reject(ret);
            } else {
              resolve(ret);
            }
          }),
          fail:(err)=>{  
            if(isUploadErrorOccur) {
              isUploadErrorOccur = true;
              wx.hideLoading()
              wx.showToast({
                title :"上传失败",
                icon  : "error" ,
                duration:3000
              })
            }
            reject(err)
          }
        })
       }))

    })
    
    // 执行promise.all()进行上传 
    const ret = await Promise.all(uploadPromises)
    .then(res=>{
      return res;
    }).catch(err=>{
      setTimeout(()=>{
        wx.showToast({
          title:"上传失败",
          icon:"error",
          duration:3000
        })
      },500);
      return err;
    });
    
    // 如果返回值是数组，说明上传成功，获取到的是结果数组
    if(ret.length) {
      setTimeout(()=>{
        wx.showToast({
          title:"上传成功" ,
          icon:"success"  ,
          duration:3000
        })
      },500)
    }    

    return ret;
}
