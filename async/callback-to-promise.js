// A callback function is a function passed into another function as an argument,
// which is then invoked inside the outer function to complete some kind of routine or action.
// 콜백은 다른 함수에 인수로 전달되는 함수⭐❗
class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === 'ellie' && password === 'dream') ||
          (id === 'coder' && password === 'academy')
        ) {
          resolve(id);
        } else {
          reject(new Error('not found'));
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === 'ellie') {
          resolve({ name: 'ellie', role: 'admin' });
        } else {
          reject(new Error('no access'));
        }
      }, 1000);
    });
  }

  // async getUserWithRole() {
  //   const user = await this.loginUser(id, password);
  //   const role = await this.getRoles(user);
  //   return role;
  // }
}

// 콜백은 다른 함수에 인수로 전달되는 함수⭐❗
const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
// userStorage
//   .loginUser(id, password)
//   .then(userStorage.getRoles)
//   .then((user) => alert(`Hello ${user.name}, you have a ${user.role} role`))
//   .catch(console.log);

// userStorage
//   .getUserWithRole() //
//   .catch(console.log)
//   .then(console.log);

async function getUserWithRole(id, password) {
  const logintUser = await userStorage.loginUser(id, password);
  const result = await userStorage.getRoles(logintUser);
  return result;
}

getUserWithRole(id, password) //
  .then((result) => console.log(result));
