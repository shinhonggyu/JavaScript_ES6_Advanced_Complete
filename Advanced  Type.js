// Pass By Value vs Pass By Reference
var a = 5;
var b = a;
b++;
// primitive type(immutable) passed by value

let obj = {
  a: 'a',
  b: 'b',
  c: {
    deep: 'try and copy me',
  },
};

// This Is Shallow Clone⭐
let clone = Object.assign({}, obj);
let clone2 = { ...obj };
// This Is Deep Clone
let superClone = JSON.parse(JSON.stringify(obj));

obj.c.deep = 'hahaha';
console.log('obj', obj); // {a: "a", b: "b", c: { deep: 'hahaha' }}
console.log('clone', clone); // {a: "a", b: "b", c: { deep: 'hahaha' }}
console.log('clone2', clone2); // {a: "a", b: "b", c: { deep: 'hahaha' }}
console.log('clone2', superClone); // {a: "a", b: "b", c: { deep: 'try and copy me' }}
