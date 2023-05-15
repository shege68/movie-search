import {
  addMovieToList,
  clearMoviesMarkup,
  createMarkUp,
  createStyle,
  inputSearch,
  moviesList,
  triggerMode
} from "./dom.js";

let apiUrl = 'http://www.omdbapi.com';
let searchLast = null;

const debounceTime = (() => {
  let timer = null;

  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(cb, ms);
  };
})();

const getData = (url) => fetch(url)
  .then((res) => res.json()
    .then((data) => data.Search));

const inputSearchHandler = (e) => {
  debounceTime(() => {
    const searchString = e.target.value.trim();

    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMoviesMarkup(moviesList);

      getData(`${apiUrl}/?apikey=18b8609f&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.log(err)); // ловимо помилку
      console.log(searchString);
    }
    searchLast = searchString;
  }, 2000);
};

export const appInit = () => {
  createMarkUp();
  createStyle();
  inputSearch.addEventListener('input', inputSearchHandler);
};