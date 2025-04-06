const API_KEY = 'ccb73448281e7c34fd6b8eef24ede3c1';
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const moviesContainer = document.getElementById('movies');

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    moviesContainer.innerHTML = ''; // clear loading text
    data.results.forEach(movie => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" />
        <p>${movie.title}</p>
      `;
      moviesContainer.appendChild(movieEl);
    });
  })
  .catch(err => {
    moviesContainer.innerHTML = 'Failed to load movies 😢';
    console.error(err);
  });
