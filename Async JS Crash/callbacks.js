// const posts = [
//   { title: 'Post One', body: 'This is post one' },
//   { title: 'Post Two', body: 'This is post two' },
// ];

// function getPosts() {
//   setTimeout(() => {
//     let output = '';
//     posts.forEach((post) => {
//       output += `<li>${post.title}</li>`;
//     });
//     document.body.innerHTML = output;
//   }, 1000);
// }

// function createPost(post, callback) {
//   setTimeout(() => {
//     posts.push(post);
//     callback();
//   }, 2000);
// }

// createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);

// A callback function is a function passed into another function as an argument,
// which is then invoked inside the outer function to complete some kind of routine or action.
const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' },
];

function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}

createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);
