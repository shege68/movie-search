export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

function createElement({ type, attrs, container = null, event = null, handler = null, position = 'append' }) {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);
  if (event && handler && typeof handler === 'function') el.addEventListener(event, handler);

  return el;
}

export function createStyle() {
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

export function createMarkUp() {
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
    container: checkBox,
    event: 'click',
    handler: () => triggerMode = !triggerMode
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

export function addMovieToList(m) {
  const item = createElement({
    type: 'div',
    attrs: { class: 'movie' },
    container: moviesList
  });

  createElement({
    type: 'img',
    attrs: {
      src: /^(http|https):\/\//i.test(m.Poster) ? m.Poster : 'assets/img/no-image.png',
      alt: `${m.Title} ${m.Year}`,
      title: `${m.Title} ${m.Year}`,
      class: 'movie__image'
    },
    container: item
  });
}

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');