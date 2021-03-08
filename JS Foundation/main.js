var d = {
  name: 'jay',
  say() {
    return () => console.log(this);
  },
};

d.say()();
