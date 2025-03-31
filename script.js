const apiKey = "ccb73448281e7c34fd6b8eef24ede3c1"; // Your API Key
const baseURL = "https://api.themoviedb.org/3";
const movieList = document.getElementById('movie-list');

// Fetch trending movies
async function fetchMovies() {
    try {
        const response = await fetch(`${baseURL}/trending/movie/week?api_key=${apiKey}`);
        const data = await response.json();
        
        displayMovies(data.results); // Call function to display the movies
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to display movies
function displayMovies(movies) {
    movies.forEach(movie => {
        // Create a div for each movie
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        // Create an img element for the poster
        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        poster.alt = movie.title;
        poster.classList.add('movie-poster');
        
        // Add an event listener to handle clicks
        poster.addEventListener('click', () => {
            alert(`You clicked on ${movie.title}`);  // This is where you can add more actions (e.g., show details)
        });

        // Append poster to the movie div
        movieDiv.appendChild(poster);

        // Add movie div to the movie list container
        movieList.appendChild(movieDiv);
    });
}

// Call fetchMovies when the page loads
fetchMovies();
