const apiKey = "ccb73448281e7c34fd6b8eef24ede3c1";
const baseURL = "https://api.themoviedb.org/3";
const imageURL = "https://image.tmdb.org/t/p/w500";

const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const moviesContainer = document.getElementById("moviesContainer");

let allMovies = [];
let genres = {};

async function fetchGenres() {
  const res = await fetch(`${baseURL}/genre/movie/list?api_key=${apiKey}`);
  const data = await res.json();
  genres = data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  for (let id in genres) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = genres[id];
    genreSelect.appendChild(option);
  }
}

async function fetchMovies() {
  const res = await fetch(`${baseURL}/movie/popular?api_key=${apiKey}`);
  const data = await res.json();
  allMovies = data.results;
  displayMovies(allMovies);
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.style.margin = "20px";
    movieDiv.style.display = "inline-block";
    movieDiv.style.width = "200px";
    movieDiv.innerHTML = `
      <img src="${imageURL + movie.poster_path}" style="width: 100%; border-radius: 8px;" />
      <h3>${movie.title}</h3>
      <p>${movie.overview.substring(0, 100)}...</p>
    `;
    moviesContainer.appendChild(movieDiv);
  });
}

function filterMovies() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedGenre = genreSelect.value;
  
  const filtered = allMovies.filter(movie => {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm);
    const matchesGenre = selectedGenre === "" || movie.genre_ids.includes(parseInt(selectedGenre));
    return matchesTitle && matchesGenre;
  });

  displayMovies(filtered);
}

searchInput.addEventListener("input", filterMovies);
genreSelect.addEventListener("change", filterMovies);

fetchGenres();
fetchMovies();
