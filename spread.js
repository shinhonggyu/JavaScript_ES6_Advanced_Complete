{
  const obj1 = { key: 'key1' };
  const obj2 = { ...obj1, title: 'yo!' };
  // console.log(obj2);
}

{
  const obj1 = { key: 'key1' };
  const obj2 = { key: 'key2' };
  const array = [obj1, obj2];

  // array copy
  const arrayCopy = [...array, { key: 'key3' }];
  obj1.key = 'newKey';
  // console.log(arrayCopy); [{key: "newKey"}, {key: "key2"}, {key: "key3"}]
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

{
  const habit = { id: 1, name: 'Reading', count: 0 };
  const habit2 = { id: 2, name: 'Coding', count: 0 };
  const array = [habit, habit2];

  const arrayCopy = [...array];
  habit.name = 'Eating';

  // console.log(arrayCopy)
}

{
  const habit = { id: 1, name: 'Reading', count: 0 };
  const habit2 = { id: 2, name: 'coding', count: 0 };
  const array = [habit, habit2];

  const arrayCopy = [...array];

  habit.name = 'Eating';

  // console.log(arrayCopy); [{ id: 1, name: 'Reading', count: 0 },
  //                          { id: 2, name: 'coding', count: 0 }]
}

// card-maker
{
  const card = { name: 'shin', age: 30 };
  const card2 = { ...card, ['name']: 'ggyu', ['sex']: 'male' };
  // console.log(card2); {name: "ggyu", age: 30, sex: "male"}
}

{
  const a = { id: '1', count: 0 }; // x123
  const b = { id: '2', count: 0 }; // x234
  const c = b; // 234
  const d = { ...b }; // x456
  b.count = 1;
  // console.log(c); {id: "2", count: 1}
  //  console.log(d); {id: "2", count: 0}
}
