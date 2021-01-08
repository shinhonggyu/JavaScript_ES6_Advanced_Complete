"use strict";

// Array

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. index position
const fruits = ["🍎", "🍒"];
const result = fruits.join();
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[fruits.length - 1]);

// 3. Looping over an array
// print all fruits

// 3-1
fruits.forEach((fruit) => console.log(fruit));
// 3-2
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// 3-3
for (let fruit of fruits) {
  console.log(fruit);
}

// 4. Addtion, deletion, copy
// push: ann an item to the end
fruits.push("🍋", "🍑");
console.log(fruits);

// pop: remove an item from the end
fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the beginning
fruits.unshift("🍓", "🍅");
console.log(fruits);

// shift: remove an item from the beginning
fruits.shift();
console.log(fruits);

// note!! shift, unshift are slower than pop, push

// splice: remove an item by index position

fruits.push("🍉", "🍇");
console.log(fruits);
fruits.splice(1, 1);
console.log(fruits);
fruits.splice(1, 1, "🥝");
console.log(fruits);

// combine two arrays
const fruits2 = ["🥥", "🍌"];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);

// 5. Searching
// indexOf: find the index

console.log(fruits);
console.log(fruits.indexOf("🥝"));
console.log(fruits.indexOf("🍌"));

// includes
console.log(fruits.includes("🍉"));
console.log(fruits.includes("🍌"));

// lastindexOf
fruits.push("🍅");
console.log(fruits);
console.log(fruits.indexOf("🍅"));
console.log(fruits.lastIndexOf("🍅"));
