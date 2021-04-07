const database = [
  {
    username: 'andrei',
    password: 'supersecret',
  },
  {
    username: 'sally',
    password: '123',
  },
  {
    username: 'ingrid',
    password: '777',
  },
];

const newsfeed = [
  {
    username: 'Bobby',
    timeline: 'So tired from all that learning!',
  },
  {
    username: 'Sally',
    timeline: 'Javascript is sooooo cool!',
  },
  {
    username: 'Mitch',
    timeline: 'Javascript is preeetyy cool!',
  },
];

var userNamePrompt = prompt("What's your username?");
var passwordPrompt = prompt("What's your password?");

function isValidUser(user, pass) {
  for (let i = 0; i < database.length; i++) {
    if (database[i].username === user && database[i].password === pass) {
      return true;
    }
  }
  return false;
}

function signIn(user, pass) {
  if (isValidUser(user, pass)) {
    console.log(newsfeed);
  } else {
    alert('Sorry, wrong username and password');
  }

  // for (let i = 0; i < database.length; i++) {
  //   if (database[i].username === user && database[i].password === pass) {
  //     console.log(newsfeed);
  //   } else {
  //     alert('Sorry, wrong username and password');
  //   }
  // }

  // if (user === database[0].username && pass === database[0].password) {
  //   console.log(newsfeed);
  // } else {
  //   alert('Sorry, wrong username and password');
  // }
}

signIn(userNamePrompt, passwordPrompt);
