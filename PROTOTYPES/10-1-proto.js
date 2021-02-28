const x = {};
const y = {};
console.log(x);
console.log(y);
console.log(x.__proto__ === y.__proto__);

const array = [];
console.log(array);

console.clear();

// Constructor function
function CoffeMachine(beans) {
  this.beans = beans;
  // 만들어지는 인스턴드 오브젝트마다 포함이되는 Instance member level
  // this.makeCoffee = (shots) => {
  //   console.log('making...☕');
  // };
}
// Prototype member level
CoffeMachine.prototype.makeCoffee = (shots) => {
  console.log('making...☕');
};

const machine1 = new CoffeMachine(10);
const machine2 = new CoffeMachine(20);
console.log(machine1);
console.log(machine2);

function LatteMachine(milk) {
  this.milk = milk;
}
LatteMachine.prototype = Object.create(CoffeMachine.prototype);

const latteMachine = new LatteMachine(123);
console.log(latteMachine);
latteMachine.makeCoffee();
