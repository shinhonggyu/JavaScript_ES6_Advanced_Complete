//Create a function that reverses a string:
//'Hi My name is Andrei' should be:
//'ierdnA si emdn yM iH'

function reverse(str) {
  // check input
  if (!str || str.length < 2 || typeof str !== 'string') {
    return 'that is not good';
  }

  const backwards = [];
  const totalItems = str.length - 1;
  for (let i = totalItems; i >= 0; i--) {
    backwards.push(str[i]);
  }
  console.log(backwards);

  return backwards.join('');
}

reverse('Hi My name is Andrei');
