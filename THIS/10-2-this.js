console.log(this);

function simpleFunc() {
  console.log(this);
}
window.simpleFunc();
console.clear();

class Counter {
  // 멤버변수
  count = 0;
  increase = function () {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase();
// const caller = counter.increase; :undefined
const caller = counter.increase.bind(counter);
caller();

class Bob {}
const bob = new Bob();
bob.run = counter.increase;
bob.run();
