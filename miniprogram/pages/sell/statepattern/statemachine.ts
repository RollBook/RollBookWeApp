import { State } from "./state";
import StateSellerInfo from "./concretestate/statesellerinfo";
import StateBookImg from "./concretestate/statebookimg";
import StateBookInfo from "./concretestate/statebookinfo";
import StateBookCommit from "./concretestate/statebookcommit";

/**
* 卖家页面状态机
*/
export default class SellerStateMachine {

  /**
  * 状态
  */
  private state:State;

  constructor(){
    this.state = new StateSellerInfo();
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

  /*
  * @Description: 获取下一个状态
  * @Param: currentState 当前状态
  * @Author: FAll
  * @Date: 2023-03-20 17:14:37
  */
  getNextState(currentState:State):State {
    if(currentState instanceof StateSellerInfo) {
      return new StateBookImg();
    } else if(currentState instanceof StateBookImg) {   
      return new StateBookInfo();
    } else if(currentState instanceof StateBookInfo){
      return new StateBookCommit();
    } else {
      return new StateSellerInfo();
    }
  }

  /*
  * @Description: 获取上一个状态
  * @Param: currentState 当前状态
  * @Author: FAll
  * @Date: 2023-03-20 17:18:02
  */
  getLastState(currentState:State):State {
    if(currentState instanceof StateBookInfo) {
      return new StateBookImg();
    } else if(currentState instanceof StateBookImg) {
      return new StateSellerInfo();
    } else if(currentState instanceof StateBookCommit) {
      return new StateBookInfo();
    } else{
      return new StateSellerInfo();
    }
  }

}
