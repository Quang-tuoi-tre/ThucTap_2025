import { makeAutoObservable } from "mobx";

 class MobxClass {
  count = 0;
  i=20;
  a=30;

  constructor() {
   
    makeAutoObservable(this)

  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
 

  get status() {
    if (this.count > 0) {
      return "Positive";
    } else if (this.count < 0) {
      return "Negative";
    } else {
      return "Zero";
    }
  }
  get sum() {
    return this.i + this.a;
  }

}

export const mobxClass = new MobxClass();