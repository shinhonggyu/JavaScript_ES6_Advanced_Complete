function dataList(array) {
  array.hits.map((item) => console.log(item.title));
}

async function fetchData() {
  const response = await fetch(
    'https://hn.algolia.com/api/v1/search?query=redux'
  );
  const result = await response.json();
  dataList(result);
}

fetchData();
