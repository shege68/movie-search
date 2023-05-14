// CRUD...

// https://jsonplaceholder.typicode.com/

// http://www.omdbapi.com/?apikey=[yourkey]&

let moviesList = null;
let inputSearch = null;

function createElement({ type, attrs, container = null, evt = null, handler = null, position = 'append' }) {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);

  return el;
}

function createStyle() {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `* {
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
      }
      .search {
        margin-bottom: 40px;
      }
      .search__label-input {
        display: block;
        margin-bottom: 0.5em;
      }
      .search__input {
        display: block;
        padding: 0.75em 1em;
        max-width: 400px;
        width: 100%;
        border-radius: 7px;
        border: 1px solid lightblue;
        margin-bottom: 0.75em;
      }
      .search__label-checkbox {
        font-size: 0.75rem;
        display: inline-block;
        transform: translate(4px, -2px);
      }`
    },
    container: document.head
  });
}

function createMarkUp() {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend'
  });

  createElement({
    type: 'h1',
    attrs: {
      innerHTML: 'Додаток для пошуку фільмів'
    },
    container
  });

  const searchBox = createElement({
    type: 'div',
    attrs: {
      class: 'search'
    },
    container
  });

  const inputBox = createElement({
    type: 'div',
    attrs: {
      class: 'search__group search__group--input'
    },
    container: searchBox
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'search',
      class: 'search__label-input',
      innerHTML: 'Пошук фільмів'
    },
    container: inputBox
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      id: 'search',
      type: "seatch",
      class: 'search__input',
      placeholder: 'Почніть вводити текст...'
    },
    container: inputBox
  });

  const checkBox = createElement({
    type: 'div',
    attrs: {
      class: 'search__group search__group--checkbox'
    },
    container: searchBox
  });

  createElement({
    type: 'input',
    attrs: {
      id: 'checkbox',
      type: "checkbox",
      class: 'search__checkbox'
    },
    container: checkBox
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'checkbox',
      class: 'search__label-checkbox',
      innerHTML: 'Додати фільми до існуючих списків'
    },
    container: checkBox
  });

  moviesList = createElement({
    type: 'div',
    attrs: { class: 'movies' },
    container
  });
}

function addMovieToList(movie) {
  const item = document.createElement('div');
  const img = document.createElement('img');

  item.setAttribute('class', 'movie');

  img.setAttribute('src', /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no-image.png');
  img.setAttribute('alt', `${movie.Title} ${movie.Year}`);
  img.setAttribute('title', `${movie.Title} ${movie.Year}`);
  img.setAttribute('class', 'movie__image');

  item.append(img);

  moviesList.appendChild(item);
}

const getData = (url) => fetch(url)
  .then((res) => res.json()
    .then((data) => data.Search));

const apiUrl = 'http://www.omdbapi.com';
let searchLast = null;

createMarkUp();
createStyle();

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

const inputSearchHandler = (e) => {
  debounceTime(() => {
    const searchString = e.target.value.trim();

    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      getData(`${apiUrl}/?apikey=18b8609f&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.log(err)); // ловимо помилку
      console.log(searchString);
    }
    searchLast = searchString;
  }, 2000);
};

inputSearch.addEventListener('input', inputSearchHandler);