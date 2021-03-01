// •inline caching
// function findUser(user) {
//   return `found ${user.firstName} ${user.lastName}`
// }

// const userData = {
//   firstName: 'johnson'
//   lastName: 'junior'
// }

// •hidden classes
// function Animal(x, y) {
//   this.x = x;
//   this.y = y;
// }

// const obj1 = new Animal(1, 2);
// obj1.a = 3;
// console.log(obj1);

// ⭐callstack
function subtractTwo(num) {
  return num - 2;
}

function calculate() {
  const sumTotal = 4 + 5;
  return subtractTwo(sumTotal);
}

calculate();
