// reference type ❗
// non primitive type are not defined by the programming languahe
// created by the programmer.
const object1 = { value: 10 };
const object2 = object1;
const object3 = { value: 10 };

------------------------------------------------------------------

// context vs scope ❗
// 'context' tells you, where we are within the object.
this.alert('hello');
// 'this' means, 우리가 지금 속해있는 오브젝트환경..
// what is to the left of the .(dot)

function a() {
  console.log(this);
}

a(); // window
window.a(); // window

const object4 = {
  a: function () {
    console.log(this);
  },
};

object4.a(); // object4

--------------------------------------------------------------------

// instantiation
// instantiation is when you make a copy of ab object
// reuse the code.

class Player {
  // Every time i'm making a copy of a 'Player' the first thing that
  // gets run is the 'constructor' function.
  //'costructor'function is gonna create these properties on the 'Player' object.
  constructor(name, type) {
    console.log(this); // Wizard {}
    this.name = name;
    this.type = type;
  }

  introduce() {
    console.log(`Hi I am ${this.name}, I'm a ${this.type}`);
  }
}

class Wizard extends Player {
  constructor(name, type) {
    console.log('wizard', this); // error
    super(name, type); // run the Player constructor function
    console.log('wizard', this); // { name: 'Shelly', type: 'Healer' }
  }

  play() {
    console.log(`WEEEEE I'm ${this.type}`);
  }
}

// when i do the 'new' keyword, make instance of 'Wizard'
const wizard1 = new Wizard('Shelly', 'Healer');
const wizard2 = new Wizard('Shawn', 'Dark Magic');

wizard1.play();
wizard1.introduce();

----------------------------------------------------------------

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

obj.c.deep = 'hahaha';
console.log('obj', obj); // {a: "a", b: "b", c: { deep: 'hahaha' }}
console.log('clone', clone); // {a: "a", b: "b", c: { deep: 'hahaha' }}
console.log('clone2', clone2); // {a: "a", b: "b", c: { deep: 'hahaha' }}

------------------------------------------------------------------------

Quiz❗
//Evaluate these:
//#1
[2] === [2] // false
{} === {} // false

//#2 what is the value of property a for each object.
const object1 = { a: 5 }; // 4
const object2 = object1; // 4
const object3 = object2; // 4
const object4 = { a: 5}; // 5
object1.a = 4;


//#3 create two classes: an Animal class and a Mamal class. 
// create a cow that accepts a name, type and color and has a sound method that moo's her name, type and color. 
class Animal {
	constructor(name, type, color) {
		this.name = name;
		this.color = color;
		this.type = type;
	}
}

class Mamal extends Animal {
	constructor(name, type, color) {
		super(name, type, color)
	}
	sound() {
		console.log(`Moooo I'm ${this.name} and I'm a ${this.color} ${this.type}`);
	}
}

const cow = new Mamal('Shelly', 'cow', 'brown');
