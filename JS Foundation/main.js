class Counter {
  count = 0; // 멤버변수
  increase = function () {
    console.log(this);
  };
  decrease = () => {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase();
counter.decrease();

class Bob {}
const bob = new Bob();
bob.run = counter.decrease;
bob.run();
