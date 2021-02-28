// 힘수를 반환하는 함수
// 커링함수의 인자로 함수를 전달하면 새함수를 반환
// 객체지향의 상속기능을 구현

function multiply(a, b) {
  return a * b;
}

function multiplyTwo(a) {
  return multiply(a, 2)
}

// function multiplyTwo = (x) => multiply(x, 2)

function multiplyX(x) {
  return function (a) {
    return multiply(a, x)
  }
}

function add(a, b) {
  return a + b;
}

function addX(x) {
  return function(a) {
    return add(x, a)
  }
}

const multiplyTwo = multiplyX(2);
const multiplyThree = multiplyX(3);