const API_KEY = "ccb73448281e7c34fd6b8eef24ede3c1";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const movieContainer = document.getElementById("moviesContainer");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genreFilter");

async function getGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  data.genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
}

async function getMovies(query = "", genre = "") {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}${genre ? `&with_genres=${genre}` : ""}`;

  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${IMAGE_PATH + movie.poster_path}" alt="${movie.title}" />
      <h4>${movie.title}</h4>
      <div class="synopsis"><strong>Overview:</strong> ${movie.overview || "No overview available."}</div>
    `;
    movieEl.addEventListener("click", () => {
      const synopsis = movieEl.querySelector(".synopsis");
      synopsis.style.display = synopsis.style.display === "block" ? "none" : "block";
    });
    movieContainer.appendChild(movieEl);
  });
}

// Event listeners
searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  const genre = genreSelect.value;
  getMovies(query, genre);
});

genreSelect.addEventListener("change", () => {
  const query = searchInput.value;
  const genre = genreSelect.value;
  getMovies(query, genre);
});

// Initial Load
getGenres();
getMovies();
