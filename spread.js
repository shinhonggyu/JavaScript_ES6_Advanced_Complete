{
  const obj1 = { key: 'key1' };
  const obj2 = { ...obj1, title: 'yo!' };
  // console.log(obj3) => {key: "key1", title: "yo!"}
}

{
  const obj1 = { key: 'key1' };
  const obj2 = { key: 'key2' };
  const array = [obj1, obj2];

  // array copy
  const arrayCopy = [...array, { key: 'key3' }];
  obj1.key = 'newKey';
  // console.log(arrayCopy);
}

{
  const obj1 = { key: 'key1' };
  const obj2 = { ...obj1, ['key']: 'key2' };
  // console.log(obj2);
}

{
  // array concatenation
  const fruits1 = ['🍇', '🍅'];
  const fruits2 = ['🍉', '🥝'];
  const fruits3 = [...fruits1, ...fruits2];
  // console.log(fruits3);
}

{
  // object merge
  const pizza = { pizza: '🍕' };
  const bugger = { bugger: '🍔' };
  const food = { ...pizza, ...bugger };
  // console.log(food);
}
