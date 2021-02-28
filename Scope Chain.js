// const x = 'x';

// function findName() {
//   const b = 'b';
//   return printName();
// }

// function printName() {
//   const c = 'c';
//   return 'Shin';
// }

// function sayMyName() {
//   const a = 'a';
//   return findName();
// }

// console.log(sayMyName());

// ------------------------

function sayMyName() {
  const a = 'a';
  return function findName() {
    const b = 'b';
    return function printName() {
      const c = 'c';
      return 'Shin';
    };
  };
}

console.log(sayMyName()());
