const API_KEY = "ccb73448281e7c34fd6b8eef24ede3c1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

async function fetchMovies() {
    try {
        console.log("Fetching movies from:", API_URL);
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("API Response:", data);
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies) {
    console.log("Movies received:", movies);
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = "";

    if (!movies || movies.length === 0) {
        moviesContainer.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${IMG_PATH}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

fetchMovies();
