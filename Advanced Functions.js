// Closure
const first = () => {
  const greet = 'Hi';
  const second = () => {
    alert(greet);
  }
  return second;
}

const newFunc = first();
newFunc()
// even though first() is never going to be run again 
// second함수가 greet을 참조하기때문에 the web browser remember greet


// 커링
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b;
// curriedMultiply()()
const multiplyBy5 = curriedMultiply(5);


// Compose
const compose = (f, g) => (a) => f(g(a));

const sum = (num) => num + 1;

compose(sum, sum)(5)


// Avoiding Side Effects, funtional purity.
// always want to return
var a = 1;
function b() {
  a = 2;
}
// By avoiding side effects And always returning, 
// we create deterministic
// it means that no matter what if my inputs,
// the return value will be always the same.
// avoiding bugs



//Solve these problems:

//#1 Create a one line function that adds adds two parameters
const sum = (a, b) => a + b

//Closure: What does the last line return?
const addTo = x => y => x + y
var addToTen = addTo(10)
addToTen(3) // returns 13

//Currying: What does the last line return?
const sum = (a, b) => a + b
const curriedSum = (a) => (b) => a + b
curriedSum(30)(1) // 31


//Currying: What does the last line return?
const sum = (a, b) => a + b
const curriedSum = (a) => (b) => a + b
const add5 = curriedSum(5)
add5(12) // 17

//Composing: What does the last line return?
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;
compose(add1, add5)(10) // 16

//What are the two elements of a pure function?
1. Deterministic --> always produces the same results given the same inputs
2. No Side Effects -->  It does not depend on any state, or data, change during a program’s execution. It must only depend on its input elements.