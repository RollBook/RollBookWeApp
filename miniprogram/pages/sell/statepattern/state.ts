

/**
* 抽象状态
*/
export interface State {
  
  /*
  * @Description: 是否可以进入下一步
  * @Author: FAll
  * @Date: 2023-03-03 15:23:02
  */
  canIContinue():boolean;

  /*
  * @Description: 进入下一步之的后续处理
  * @Author: FAll
  * @Date: 2023-03-03 15:24:41
  */
  handleContinue():Promise<void>;

  /*
  * @Description: 回到上一步的后续处理
  * @Author: FAll
  * @Date: 2023-03-03 15:26:06
  */
  handleBackwards():void;

}