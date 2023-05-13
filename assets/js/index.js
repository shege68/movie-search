// CRUD...

// https://jsonplaceholder.typicode.com/

// http://www.omdbapi.com/?apikey=[yourkey]&

const getData = (url) => fetch(url)
  .then((res) => res.json()
    .then((data) => data.Search));

let search = 'superman';

getData(`http://www.omdbapi.com/?apikey=18b8609f&s=${search}`)
  .then((movies) => movies.forEach((movie) => console.log(movie)))
  .catch(console.log); // ловимо помилку

// const superman = getData(`http://www.omdbapi.com/?apikey=18b8609f&s=superman`);
// const ironman = getData(`http://www.omdbapi.com/?apikey=18b8609f&s=ironman`);
// const batman = getData(`http://www.omdbapi.com/?apikey=18b8609f&s=batman`);

// superman.then((movies) => movies.forEach((movie) => console.log(movie)));
// ironman.then((movies) => movies.forEach((movie) => console.log(movie)));
// batman.then((movies) => movies.forEach((movie) => console.log(movie)));

// Promise.all([superman, ironman, batman])
//   .then((res) => res.forEach((movies) => movies.forEach((movie) => console.log(movie))));

// Promise.race([superman, ironman, batman])
//   .then((res) => console.log(res));