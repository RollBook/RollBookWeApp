import { State } from "./state";
import SellerStateInfo from "./concretestate/statesellerinfo";

/**
* 卖家页面状态机
*/
export default class SellerStateMachine {

  /**
  * 状态
  */
  private state:State;

  constructor(){
    this.state = new SellerStateInfo();
  }

  /*
  * @Description: 设定当前状态
  * @Param: state 具体状态
  * @Author: FAll
  * @Date: 2023-03-03 15:29:03
  */
  setState(state:State) {
    this.state=state;
  }

  /*
  * @Description: 获取当前状态
  * @Author: FAll
  * @Date: 2023-03-03 15:52:04
  */
  getState():State {
    return this.state;
  }
}
