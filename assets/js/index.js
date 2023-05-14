// CRUD...

// https://jsonplaceholder.typicode.com/

// http://www.omdbapi.com/?apikey=[yourkey]&

let moviesList = null;

function createStyle() {
  const style = document.createElement('style');
  style.innerHTML = `* {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container {
    padding: 20px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .movie {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .movie__image {
    width: 100%;
    object-fit: cover;
  }`;
  document.head.append(style);
}

function createMarkUp() {
  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  const movies = document.createElement('div');
  movies.setAttribute('class', 'movies');

  container.append(movies);
  document.body.append(container);

  moviesList = document.querySelector('.movies');
}

function addMovieToList(movie) {
  const item = document.createElement('div');
  const img = document.createElement('img');

  item.setAttribute('class', 'movie');
  console.log(/^(http|https):\/\//i.test(movie.Poster));

  img.setAttribute('src', /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no-image.png');
  img.setAttribute('alt', `${movie.Title} ${movie.Year}`);
  img.setAttribute('title', `${movie.Title} ${movie.Year}`);
  img.setAttribute('class', 'movie__image');

  item.append(img);

  moviesList.appendChild(item);
  /*
    Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
    Title: "Iron Man"
    Type: "movie"
    Year: "2008"
    imdbID: "tt0371746"
  */

}

const getData = (url) => fetch(url)
  .then((res) => res.json()
    .then((data) => data.Search));

let searchStr = 'sup';

createMarkUp();
createStyle();

getData(`http://www.omdbapi.com/?apikey=18b8609f&s=${searchStr}`)
  .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
  .catch((err) => console.log(err)); // ловимо помилку

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