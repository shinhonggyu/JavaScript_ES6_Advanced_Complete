'use strict';

// JavaScript is synchronous.
// Execute the code block in order after hoisting.
// hoisting: var, function declaration 변수, 함수의선언은 호이스팅이됨
console.log('1');
setTimeout(() => console.log('2'), 1000);
console.log('3');

// Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));

// Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);

// Callback Hell example
// A callback function is a function passed into another function as an argument,
// which is then invoked inside the outer function to complete some kind of routine or action.
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin' });
      } else onError(new Error('no access'));
    }, 1000);
  }
}

// 콜백은 다른 함수에 인수로 전달되는 함수⭐❗
const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id,
  password,
  (user) => {
    console.log(user); // ellie or coder
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.name} role`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
