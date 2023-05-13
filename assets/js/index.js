// CRUD...

// https://jsonplaceholder.typicode.com/

// http://www.omdbapi.com/?apikey=[yourkey]&

const getData = (url) => fetch(url)
  .then((res) => res.json()
    .then((data) => data.Search));

getData(`http://www.omdbapi.com/?apikey=18b8609f&s=superman`)
  .then((movies) => movies.forEach((movie) => console.log(movie)))
  .catch(console.log); // ловимо помилку

