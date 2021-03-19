function addTo80(n) {
  console.log('long time..');
  return console.log(n + 80);
}

// let cache = {};
// we don't want to fill the cache in global scope❗
function memoizedAddTo80() {
  let cache = {};
  // problem is now that everytime we run this cache gets reset❗
  return function (n) {
    // closure 생성해서 avoid global scope⭐
    if (n in cache) {
      return console.log(cache[n]);
    } else {
      console.log('long time..');
      cache[n] = n + 80;
      return console.log(cache[n]);
    }
  };
}

const memoized = memoizedAddTo80();
memoized(5);
memoized(5);
memoized(6);
memoized(5);
// console.log('3', memoized(6));
