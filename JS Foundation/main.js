const person4 = {
  name: 'person4',
  age: 40,
  hi: () => {
    console.log(this);
  },
};

person4.hi();
