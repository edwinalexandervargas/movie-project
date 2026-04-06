let movies;

async function renderMovies(searchTerm, filter) {
  const moviesWrapper = document.querySelector(".movies");
  const loadingWrapper = document.querySelector(".movies__loading");


loadingWrapper.classList.add("movies__loading--visible");
  
if (!movies) {
    const results = await searchMovies(searchTerm);
    movies = await Promise.all (
        results.map(movie => getMovieDetails(movie.imdbID))
    );
  }

loadingWrapper.classList.remove("movies__loading--visible");

if (filter === "RATING") {
    movies.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
} else if (filter === "RUNTIME") {
    movies.sort((a, b) => parseInt(b.Runtime) - parseInt(a.Runtime))
}

  const moviesHTML = movies
    .map((movie) => {
      return `<div class="movie">
                <figure class="movie__img--wrapper">
                    <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}" />
                </figure>
                <div class="movie__title">
                    ${movie.Title}
                </div>
                <div class="movie__rating">
                    ${movie.imdbRating}/10
                </div>
                <div class="movie__runtime">
                    ${movie.Runtime}
                </div>
            </div>`;
    })
    .join("");

  moviesWrapper.innerHTML = moviesHTML;
}

async function searchMovies(movies) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=72de7e1b&s=${movies}`);
  const data = await response.json();
  return data.Search;
}

async function getMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=72de7e1b&i=${imdbID}`)
    const data = await response.json();
    return data;
}

function filterMovies(event) {
    renderMovies(searchInput.value, event.target.value);
}

const searchInput = document.querySelector(".header__search");
const searchIcon = document.querySelector(".header__icon");

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        movies = null;
        renderMovies(searchInput.value);
    }
});

searchIcon.addEventListener("click", function() {
    movies = null;
    renderMovies(searchInput.value);
})

renderMovies("fast");