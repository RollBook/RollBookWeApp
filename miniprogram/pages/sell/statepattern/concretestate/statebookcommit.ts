import { State } from "../state";

export default class StateBookCommit implements State {

  constructor() {

  }

  canIContinue(): boolean {
    return true;
  }

  handleContinue(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  handleBackwards(): void {
   
  }
  
}