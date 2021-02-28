// function a() {
//   let grandpa = 'grandpa';
//   return function b() {
//     let father = 'father';
//     return function c() {
//       let son = 'son';
//       return `${grandpa} > ${father} > ${son}`;
//     };
//   };
// }

// const boo = (string) => (name) => (name2) =>
//   console.log(`${string} ${name} ${name2}`);

// const booString = boo('hi');
// // 5 years
// const booStringName = booString();

// ----------------------------

function callMeMaybe() {
  const callMe = 'Hi! i am now here!';
  setTimeout(() => console.log(callMe), 3000);
}

callMeMaybe();

// ⭐⭐💖함수가 실행되고 나서도 스코프체인이 남아있어 변수에 접근할수있다!
