// forEach
const array = [1, 2, 10, 16];

const newArray = array.forEach((num) => {
  num * 2;
});

// undefined
// we are not chainging array

const array = [1, 2, 10, 16];

const double = [];
const newArray = array.forEach((num) => {
  double.push(num * 2);
});

// newArray = 리턴 undefined
// double = [2, 4, 20, 32]
// side effects

// map, filter, reduce

// map은 항상 리턴해주어야한다. ⭐
// each element each number retrun a new array.
// 작업이 element를 반환 할 것으로 예상합니다.
// never mutating the data.
const mapArray = array.map((num) => num * 2);

// filter ⭐
// returns a new array so have to return
const filterArray = array.filter((num) => num > 5);
// filterArray [10, 16]

const filterArray = array.filter((num) => num === 5);
// filterArray []

// reduce ⭐
// return a new array.
// accumulator is something where we can store the information
// that happens in the body of the function.
const reduceArray = array.reduce((accumulator, num) => {
  return accumulator + num; // return array so have to return value.
}, 0);

// Question❗
const array = [
  {
    username: 'john',
    team: 'red',
    score: 5,
    items: ['ball', 'book', 'pen'],
  },
  {
    username: 'becky',
    team: 'blue',
    score: 10,
    items: ['tape', 'backpack', 'pen'],
  },
  {
    username: 'susy',
    team: 'red',
    score: 55,
    items: ['ball', 'eraser', 'pen'],
  },
  {
    username: 'tyson',
    team: 'green',
    score: 1,
    items: ['book', 'pen'],
  },
];

// forEach
//Create an array using forEach that has all the usernames with a "!" to each of the usernames
let newArray = [];
array.forEach((user) => {
  let { username } = user;
  username = username + '!';
  newArray.push(username);
});
console.log(newArray); // ["john!", "becky!", "susy!", "tyson!"]

// map
//Create an array using map that has all the usernames with a "?" at the end of usernames
const mapArray = array.map((user) => {
  return user.username + '?';
});

// filter
//Filter the array to only include users who are on team: red
const filterArray = array.filter((user) => {
  return user.team === 'red';
});

//Find out the total score of all users using reduce
const total = array.reduce((accumulator, user) => {
  return accumulator + user.score;
}, 0);

// (1), what is the value of i? INDEX of the array.
// (2), Make this map function pure:
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
  return num * 2;
});

//BONUS: create a new list with all user information, but add "!" to the end of each items they own.
const answer = array.map((user) => {
  user.items = user.items.map((item) => {
    return item + '!';
  });
  return user;
});
console.log(answer);
