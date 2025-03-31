const API_KEY = "ccb73448281e7c34fd6b8eef24ede3c1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data.results); // Check if movies are being fetched
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

fetchMovies();
