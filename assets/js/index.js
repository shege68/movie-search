// CRUD...

// https://jsonplaceholder.typicode.com/

// http://www.omdbapi.com/?apikey=[yourkey]&

// const getData = (url) => fetch(url)
//   .then((res) => res.json())
//   .then((data) => data.Seatch);

// const searchStr = 'Iron man';

// getData(`http://www.omdbapi.com/?apikey=[18b8609f]&s=${searchStr}`)

const getData = (url) => new Promise((resolve, reject) => {
  console.log("🚀 ~ file: index.js:16 ~ getData ~ url:", url)
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  // on success
  xhr.onload = () => {
    if (xhr.status !== 200) {
      reject(xhr.status);

      return;
    }

    const json = JSON.parse(xhr.response);

    // console.log("🚀 ~ file: index.js:29 ~ getData ~ xhr:", json.Search);
    resolve(json.Search);
  };

  // on error
  xhr.onerror = (err) => reject(err);
});

getData(`http://www.omdbapi.com/?apikey=18b8609f&s=superman`)
  .then((movies) => movies.forEach((movie) => console.log(movie)))
  .catch(console.log); // ловимо помилку

