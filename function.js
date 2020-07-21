"use strict";

// 1. Function decalaration
function printHello() {
  console.log("hello");
}
printHello();

function log(message) {
  console.log(message);
}
log("hello@");

// 2.Parameters
// primitive parameters: passed by value -> value 전달
// object(메모리에 reference가 저장됨) parameters: passed by reference -> reference 전달
function changeName(obj) {
  obj.name = "coder";
}
const ellie = { name: "ellie" };
changeName(ellie);
console.log(ellie);

// 3. Default parameters (added in ES6)
function showMessage(message, from = "unknown") {
  console.log(`${message} by ${from}`);
}
showMessage("hi!");

// 4. Rest patameters (added in ES6)
function printAll(...args) {
  // 배열 전달
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }

  for (const arg of args) {
    console.log(arg);
  }

  args.forEach((arg) => console.log(arg));
}
printAll("dream", "conding", "ellie");

// 5. Local scope 안에서만 밖을 볼 수 있다.
let globalMessage = "global"; // global variable
function printMessage() {
  let message = "hello";
  console.log(message); // local variable
  console.log(globalMessage);
}
printMessage();

// 6. Return a value
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2); // 3
console.log(`sum: ${sum(1, 2)}`);

// 7. Early return, early exit()
// bad
function upgradeUser(user) {
  if (user.point > 10) {
    // long upgrade logic...
  }
}

// good
function upgradeUser(user) {
  if (user.point <= 10) {
    return;
  }
  // long upgrade logic...
}

// First-class function
// functions are treated like any other variable 함수는 다른변수와 마찬가지로
// can be assigned as a value to variable 변수에 할당
// can be passed as an argument to other functions. 함수에 인자로 전달
// can be returned by another function 리턴값으로도 리턴 가능.

// 1. Function expression
// a function declaration can be called earlier than it is defined. (hoisted)
// a function expression is created when the execution reaches it.
const print = function () {
  // anonymous function
  console.log("print");
};
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// 2. Callback function using function expression
function randomQuiz(answer, printYes, printNo) {
  if (answer === "love you") {
    printYes();
  } else {
    printNo();
  }
}
// anonymous function
const printYes = function () {
  console.log("yes!");
};

// named function
// better debugging in debugger's stack trace
// recursions
const printNo = function print() {
  console.log(`no!`);
};
randomQuiz("wrong", printYes, printNo);
randomQuiz("love you", printYes, printNo);

// Arrow function
// always anonymous
// const simplePrint = function () {
//   console.log("simplePrint!");
// };

const simplePrint = () => console.log("simplePrint!");
const add = (a, b) => a + b;
// const add = functions (a, b) {
// return a + b;
// };''
const simpleMultiply = (a, b) => {
  // do something more
  return a * b;
};

// Quiz
// function calculate(command, a, b)
// command: add, substract, divide, multiply, remainder
