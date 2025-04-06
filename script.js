const API_KEY = "ccb73448281e7c34fd6b8eef24ede3c1";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const container = document.getElementById("movie-container");

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <div class="info">
          <h3>${movie.title}</h3>
        </div>
      `;
      card.addEventListener("click", () => showModal(movie));
      container.appendChild(card);
    });
  });

function showModal(movie) {
  document.getElementById("modal-title").textContent = movie.title;
  document.getElementById("modal-overview").textContent = movie.overview;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
