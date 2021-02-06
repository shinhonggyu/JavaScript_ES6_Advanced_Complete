const Fetch = fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => {
    const firstUser = users[0];
    console.log(firstUser);
    return fetch(
      'https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id
    );
  })
  .then((response) => response.json())
  .then((posts) => console.log(posts));

// const myAsyncFunction = async () => {

// }

const mostPopular = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await response.json();
  return console.log(result);
  // return result.items
};

mostPopular(); // Result: 5 -> 20 => 11
