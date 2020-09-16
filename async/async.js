// async & await
// clear style of using promise :)

// Promise
// function fetchUser() {
//   return new Promise((resolve, reject) => {
//     // do network request in 10 secs....
//     resolve("eliie");
//   });
// }

// const user = fetchUser();
// console.log(user);

// 1. async
async function fetchUser() {
  // do network request in 10 secs....
  return "ellie";
}

const user = fetchUser();
user.then(console.log);

// 2. await 👍
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  return "🍓";
}

async function getBanana() {
  await delay(1000);
  return "🍌";
}

// function getBanana() {
//   return delay(1000)
//   .then(() => '🍌');
// }

// function pickFruits() {
//   return getApple().then((apple) => {
//     return getBanana().then((banana) => `${apple} + ${banana}`);
//   });
// }

async function pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`;
}

async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);

// 3. useful APIs 👍
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}

pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);
